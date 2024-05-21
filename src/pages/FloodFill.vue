<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 计数器
let floodIndex = 0;
// 遍历队列
let queue = new Set<string>();
/**
 * 矩阵大小
 * @property {number} x 行
 * @property {number} y 列
 */
let edge = { x: 18, y: 14 };
let maxX = computed(() => edge.x);
let maxY = computed(() => edge.y);

/**
 * 生成示意矩阵
 * @param x 最大行数
 * @param y 最大列数
 */
const getMatrix = (x: number, y: number): number[][] => {
  const q: number[][] = [];
  let i = 0;
  while (i < x) {
    q.push([]);
    let j = 0;
    while (j < y) {
      q[i].push(0);
      j++;
    }
    i++;
  }
  return q;
};

const matrix = ref<number[][]>([]);

// 坐标差值，顺序为：上-右上-右-右下-下-左下-左-左上
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
 * 遍历矩阵（BFS）
 * @param sx 点击的行坐标
 * @param sy 点击的列坐标
 */
function floodFill(sx: number, sy: number) {
  queue.add(`${sx}-${sy}`);
  while (queue.size) {
    const [first] = queue;
    const [x, y] = first.split('-');
    matrix.value[+x][+y] = ++floodIndex;
    queue.delete(first);
    console.log('shift', x, y, queue);
    for (const dir of dirs) {
      let curX = +x + dir[0];
      let curY = +y + dir[1];
      if (
        curX >= 0 &&
        curX < edge.x &&
        curY >= 0 &&
        curY < edge.y &&
        matrix.value[curX][curY] === 0
      ) {
        queue.add(`${curX}-${curY}`);
        console.log('push', curX + '-' + curY);
      }
    }
  }
}

// 点击单元格触发遍历
function start(x: number, y: number) {
  // 判断当前格是否有值，有值需要重置矩阵及计数器
  if (matrix.value[x][y] > 0) {
    floodIndex = 0;
    matrix.value = getMatrix(edge.x, edge.y);
  }
  floodFill(x, y);
}

onMounted(() => {
  matrix.value = getMatrix(edge.x, edge.y);
});
</script>
<template>
  <div class="grid-title">点击任意格子查看遍历顺序</div>
  <div class="grid">
    <template v-for="(row, rowIndex) in matrix" :key="`row-${rowIndex}`">
      <div
        v-for="(cell, colIndex) in row"
        class="cell"
        :key="`cell-${rowIndex}-${colIndex}`"
        :class="{ 'number-start': cell === 1 }"
        @click="start(rowIndex, colIndex)"
      >
        {{ cell || '' }}
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
$maxRow: v-bind(maxX);
$maxCol: v-bind(maxY);

.grid-title {
  padding: 10px;
}
.grid {
  display: grid;
  grid: repeat($maxRow, 1fr) / repeat($maxCol, 1fr);
  margin-top: 6px;
  font-size: 12px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.cell {
  display: grid;
  justify-items: center;
  align-items: center;
  aspect-ratio: 1;
  padding: 2px;
  border-left: 1px solid;
  border-top: 1px solid;
  &.number-start {
    background: $focusColor;
  }
}
</style>
