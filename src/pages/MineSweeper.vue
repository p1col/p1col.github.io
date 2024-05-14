<script setup lang="ts">
import { ref } from 'vue';
/**
 * 单元格信息
 * @property x 横坐标
 * @property y 纵坐标
 * @property isMine 当前是地雷格
 * @property isFlag 当前已标记为地雷格
 * @property mines 周围的雷的数量
 */
type Mine = {
  x: number;
  y: number;
  isMine: boolean;
  isFlag: boolean;
  mines: number;
};
let config = ref({ x: 16, y: 16, mines: 10 });
let minePosMap = new Set<string>();
let mineMaps = ref<Mine[][]>([]);

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
  getRandomMine(config.value.mines);
  setMineMap();
}

/**
 * 打开当前单元格
 * @param cell 当前单元格信息
 */
function openCell(cell: Mine) {
  console.log('点击', cell);
}

/**
 * 标记当前格为地雷
 * @param cell 当前单元格信息
 */
function setFlag(cell: Mine) {
  console.log('右键：', cell);
}

initGame();
</script>
<template>
  <div class="mine-config">
    <label for="row" class="mine-config__label">行：</label>
    <input id="row" class="mine-config__input" v-model="config.x" />
    <label for="col" class="mine-config__label">列：</label>
    <input id="col" class="mine-config__input" v-model="config.y" />
    <label for="count" class="mine-config__label">雷数量：</label>
    <input id="count" class="mine-config__input" v-model="config.mines" />
    <button class="mine-config__btn" @click="initGame">Play</button>
  </div>
  <div class="mine-map">
    <div v-for="(rows, rowIndex) in mineMaps" :key="`row-${rowIndex}`">
      <div
        v-for="(cell, colIndex) in rows"
        class="mine-cell"
        :class="{ 'is-mine': cell.isMine }"
        :key="`cell-${rowIndex}-${colIndex}`"
        @click="openCell(cell)"
        @contextmenu="setFlag(cell)"
      >
        {{ cell.mines || '' }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.mine-config {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
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
.mine-map {
  display: flex;
  justify-content: center;
  padding-right: 2px;
  .mine-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px 0 0 2px;
    width: 20px;
    height: 20px;
    border: 1px solid;
  }
  .is-mine {
    background: $focusColor;
  }
}
</style>
