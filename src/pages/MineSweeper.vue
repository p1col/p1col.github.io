<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

/**
 * @type Position 坐标信息
 * @property x 横坐标
 * @property y 纵坐标
 */
type Position = {
  x: number;
  y: number;
};

/**
 * @type Mine 单元格信息
 * @property x 横坐标
 * @property y 纵坐标
 * @property isMine 当前是地雷格
 * @property isFlag 当前已标记为地雷格
 * @property isOpen 当前格已打开
 * @property mines 周围的雷的数量
 * @property isExplode 当前格为触发的地雷格
 * @property isVisit 空白格拓展时标记当前格已被访问过
 */
type Mine = Position & {
  isMine: boolean;
  isFlag: boolean;
  isOpen: boolean;
  mines: number;
  isExplode?: boolean;
  isVisit?: boolean;
};

let gameOver = ref(false);
let config = ref({ x: 16, y: 16, mines: 40 });
let maxMines = computed(() => config.value.x * config.value.y);
let minePosMap = new Set<string>();
let mineMaps = ref<Mine[][]>([]);
// 剩余的标记数
let remainFlags = ref(config.value.mines);
let unOpenCells = ref(config.value.x * config.value.y);
// 不是 gameOver 状态，剩余的标记数为 0，或者未打开的格子数量与雷数相等
let complete = computed(() => !gameOver.value && unOpenCells.value === config.value.mines);

/**
 * 获取随机数 [0, max-1]
 * @param max 随机数最大值
 */
const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

/**
 * 计算当前行或者列下标所在九宫格对应的的最小的行下标或者列下标
 * @param index 当前行或列下标
 * @returns 九宫格对应的的最小的行下标或者列下标
 */
const getMinEdge = (index: number) => (index - 1 < 0 ? index : index - 1);

/**
 * 计算当前行或者列下标所在九宫格对应的的最大的行下标或者列下标
 * @param index 当前行或列下标
 * @returns 九宫格对应的的最大的行下标或者列下标
 */
const getMaxEdge = (index: number, max: number) => (index + 1 === max ? index : index + 1);

/**
 * 随机生成指定数量的雷的下标
 * @param remain 剩余待生成的雷的数量
 */
function getRandomMine(remain: number) {
  if (remain <= 0) {
    return;
  }
  const posX = getRandomIndex(config.value.x);
  const posY = getRandomIndex(config.value.y);
  if (minePosMap.has(`${posX}-${posY}`)) {
    getRandomMine(remain);
  } else {
    minePosMap.add(`${posX}-${posY}`);
    getRandomMine(remain - 1);
  }
}

/**
 * 获取并更新周围已知的雷的数量
 * @param x 横坐标
 * @param y 纵坐标
 * @returns 当前已知的周围雷的数量
 */
function updateMineCount(x: number, y: number, isMine: boolean): number {
  if (x === 0 && y === 0) {
    return 0;
  }
  let minX = getMinEdge(x);
  let minY = getMinEdge(y);
  let maxY = getMaxEdge(y, config.value.y);
  let count = 0;
  while (minX <= x) {
    let j = minY;
    while ((minX < x && j <= maxY) || j < y) {
      // 非地雷格统计周围已知雷的数量
      if (!isMine && mineMaps.value[minX][j].isMine) {
        count++;
      }
      // 当前格为地雷，更新周围格记录的雷的数量
      if (isMine && !mineMaps.value[minX][j].isMine) {
        mineMaps.value[minX][j].mines++;
      }
      j++;
    }
    minX++;
  }
  return count;
}

/**
 * 设置地图信息
 */
function setMineMap() {
  for (let i = 0; i < config.value.x; i++) {
    for (let j = 0; j < config.value.y; j++) {
      const isMine = minePosMap.has(`${i}-${j}`);
      if (!mineMaps.value[i]) {
        mineMaps.value[i] = [];
      }
      mineMaps.value[i][j] = {
        x: i,
        y: j,
        isMine,
        isFlag: false,
        isOpen: false,
        mines: updateMineCount(i, j, isMine),
      };
    }
  }
}

/**
 * 初始化游戏
 */
function initGame() {
  // 清空 map
  if (mineMaps.value) {
    mineMaps.value.length = 0;
    mineMaps.value = new Array(config.value.x);
  }
  if (minePosMap.size > 0) {
    minePosMap.clear();
  }
  remainFlags.value = config.value.mines;
  unOpenCells.value = config.value.x * config.value.y;
  getRandomMine(config.value.mines);
  setMineMap();
  gameOver.value = false;
}

// 游戏结束，打开全图
function onGameOver() {
  mineMaps.value.forEach((row) => row.forEach((cell) => (cell.isOpen = true)));
}

// 通关时标记剩余的格子
watch(
  () => complete.value,
  (newVal) => {
    // 通关时如果剩余标记数不为 0, 自动标记地雷位置
    if (newVal && remainFlags.value > 0) {
      for (const position of minePosMap) {
        const [x, y] = position.split('-');
        mineMaps.value[+x][+y].isFlag = true;
      }
    }
  }
);

// 搜查队列
let queue: Position[] = [];
// 搜查方向：上，右上，右，右下，下，左下，左，左上
const dirs = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

/**
 * 检查当前坐标是否在二维数组范围内
 * @param x 横坐标
 * @param y 纵坐标
 */
const isInRange = (x: number, y: number) =>
  x >= 0 && x < config.value.x && y >= 0 && y < config.value.y;

/**
 * 打开相邻的空白格及邻接的数字格
 * @param x 当前格横坐标
 * @param y 当前格纵坐标
 */
function expandBlank(x: number, y: number) {
  // 初始化队列
  queue.push({ x, y });
  while (queue.length > 0) {
    // 获取队列第一个元素的坐标
    const { x: fx, y: fy } = queue[0];
    // 修改当前格子状态，并出队
    mineMaps.value[fx][fy].isOpen = true;
    // 未打开格子数减 1
    unOpenCells.value--;
    mineMaps.value[fx][fy].isVisit = true;
    queue.shift();

    // 判断当前格是否是空白格
    if (mineMaps.value[fx][fy].mines === 0) {
      // 是空白格就往四周探索
      // 遍历方向，顺序为上，右上，右，右下，下，左下，左，左上
      for (const dir of dirs) {
        // 计算当前探索的格子坐标
        let curX = fx + dir[0];
        let curY = fy + dir[1];
        // 判断当前坐标是否越界，是否可访问
        const inRange = isInRange(curX, curY);
        // 判断当前格子是否可访问
        const isVisitable = inRange
          ? !(
              mineMaps.value[curX][curY].isOpen ||
              mineMaps.value[curX][curY].isVisit ||
              mineMaps.value[curX][curY].isFlag
            )
          : false;
        if (isVisitable) {
          // 将可访问的格子入队，并且标记为已访问
          mineMaps.value[curX][curY].isVisit = true;
          queue.push({ x: curX, y: curY });
        }
      }
    }
  }
}

/**
 * 打开当前单元格
 * @param cell 当前单元格信息
 */
function openCell(cell: Mine) {
  if (cell.isFlag || (cell.isOpen && cell.mines === 0) || gameOver.value || complete.value) {
    return;
  }
  if (cell.isOpen) {
    // 点击数字格时判断是否可以快速开格
    quickOpen(cell);
  } else {
    cell.isOpen = true;
    if (cell.isMine) {
      // 当打开的格子是地雷格时游戏结束
      gameOver.value = true;
      cell.isExplode = true;
      onGameOver();
    } else if (cell.mines === 0) {
      // 当打开的是空白格是拓展空白区域
      expandBlank(cell.x, cell.y);
    } else {
      // 数字格，剩余格子数减 1
      unOpenCells.value--;
    }
  }
}

function quickOpen(cell: Mine) {
  const quickQueue: Position[] = [];
  let flag = 0;
  for (const dir of dirs) {
    // 计算当前探索的格子坐标
    let curX = cell.x + dir[0];
    let curY = cell.y + dir[1];
    // 判断当前坐标是否越界，是否已标记
    const inRange = isInRange(curX, curY);
    if (inRange) {
      if (mineMaps.value[curX][curY].isFlag) {
        flag++;
      } else if (!mineMaps.value[curX][curY].isOpen) {
        quickQueue.push({ x: curX, y: curY });
      }
    }
  }
  // 当前范围内标记数与当前格的数字相同时打开周围的格子
  if (flag === cell.mines) {
    while (quickQueue.length > 0) {
      const { x, y } = quickQueue.shift() || ({} as Position);
      openCell(mineMaps.value[x][y]);
    }
  }
}

/**
 * 标记当前格为地雷
 * @param cell 当前单元格信息
 */
function setFlag(cell: Mine) {
  if (gameOver.value || complete.value) {
    return;
  }
  cell.isFlag = !cell.isFlag;
  // 旗帜状态变更后需要同步剩余数量
  remainFlags.value += cell.isFlag ? -1 : 1;
  return false;
}

onMounted(() => {
  initGame();
});
</script>
<template>
  <div class="mine-config">
    <label for="row" class="mine-config__label">行：</label>
    <input id="row" class="mine-config__input" type="number" v-model="config.x" />
    <label for="col" class="mine-config__label">列：</label>
    <input id="col" class="mine-config__input" type="number" v-model="config.y" />
    <label for="count" class="mine-config__label">雷数量：</label>
    <input
      id="count"
      type="number"
      class="mine-config__input"
      v-model="config.mines"
      :max="maxMines"
    />
    <button class="mine-config__btn" @click="initGame">Play</button>
  </div>
  <div class="game-status">
    {{ complete ? 'ψ(｀∇´)ψ 通关！' : `ψ(._. )> 剩余标记数：${remainFlags}` }}
  </div>
  <div class="mine-map">
    <div class="mine-row" v-for="(rows, rowIndex) in mineMaps" :key="`row-${rowIndex}`">
      <div
        v-for="(cell, colIndex) in rows"
        class="mine-cell"
        :class="[
          `color-${cell.mines}`,
          {
            'is-mine': cell.isMine,
            'mine-cell--flag': cell.isFlag,
            'mine-cell--open': cell.isOpen,
            'mine-cell--explode': cell.isExplode,
          },
        ]"
        :key="`cell-${rowIndex}-${colIndex}`"
        @click.left="openCell(cell)"
        @contextmenu.prevent="setFlag(cell)"
      >
        {{ cell.mines || '' }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$colorSet: #0301fa, #077d0c, #fb0500, #060980, #790000, #2a8080, #000000, #808080;
@each $color in $colorSet {
  $i: index($colorSet, $color);
  .color-#{$i} {
    color: $color;
  }
}
.mine-config {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  .mine-config__label {
    padding-left: 10px;
  }
  .mine-config__input {
    width: 50px;
  }
  .mine-config__btn {
    margin-top: 10px;
  }
}
.game-status {
  text-align: center;
}
.mine-map {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  .mine-row {
    display: flex;
    flex-direction: row;

    border-bottom: 1px solid #7f7f7f;
    &:first-of-type {
      border-top: 1px solid #7f7f7f;
    }
  }
  .mine-cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background: #bebebe;
    border-right: 1px solid #7f7f7f;
    &:first-of-type {
      border-left: 1px solid #7f7f7f;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: #c2c0c2;
      border: 3px solid;
      border-color: #fbfbfb #7f7f7f #7f7f7f #fbfbfb;
    }
  }
  .mine-cell--open::after {
    visibility: hidden;
  }
  .mine-cell--flag::after {
    background: url(../assets/flag.svg) center / 80% no-repeat, #bebebe;
  }
  .mine-cell--explode::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent 49%, red 49%, red 51%, transparent 51%),
      linear-gradient(135deg, transparent 49%, red 49%, red 51%, transparent 51%);
  }
  .is-mine {
    background: radial-gradient(#000 40%, #bebebe 42%, #bebebe);
  }
}
</style>
