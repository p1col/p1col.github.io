<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineOptions({ name: 'CardGame' });

/**
 * 卡片信息
 * @property index 卡片下标
 * @property val 卡片值
 * @property open 卡片打开状态
 */
type Card = {
  index: number;
  val: string;
  open: boolean;
};

// 题面
let question: string[] = [];
// 记录当前题面是否已添加过
let questionSet = new Set<string>();
// 生成用于渲染的卡片信息集合
let cardMaps = ref(new Array<Card>());
// 当前已打开的卡片
let openedCard = ref<Card | null>();
// 剩余未翻开的卡对
let remainCount = ref(0);

/**
 * 生成随机下标[min=0, max-1]
 * @param max 生成数范围最大值
 * @param min 生成数范围最小值
 */
const getRandomIndex = (max: number, min: number = 0): number =>
  Math.ceil(Math.random() * (max - (min > 0 && min <= max ? min : 0)));

function getRandomGame(max: number) {
  while (max > 0) {
    question.push(String.fromCharCode('A'.charCodeAt(0) + getRandomIndex(26)));
    max--;
  }
  cardMaps.value.length = 0;
  generateGame();
}

/**
 * 初始化游戏
 */
function generateGame() {
  // 记录初始应有的卡对数量
  remainCount.value = question.length;
  while (question.length > 0) {
    // 获取随机项
    const index = getRandomIndex(question.length);
    cardMaps.value.push({
      index: cardMaps.value.length,
      val: question[index],
      open: false,
    });
    // 判断当前卡片是否已添加过一次
    if (questionSet.has(question[index])) {
      // 当前为二次添加，可以从数据源中删除此项
      questionSet.delete(question[index]);
      // 将当前项与末项值调换，后 pop 掉
      if (question.length > 1) {
        question[index] = question[question.length - 1];
      }
      question.pop();
    } else {
      // 当前卡片未添加过，加入 set 等待添加第二张
      questionSet.add(question[index]);
    }
  }
}

/**
 * 打开卡片
 * @param card 当前点击的卡片信息
 */
function openCard(card: Card) {
  card.open = true;

  // 判断当前是否已有打开状态的卡片
  if (openedCard.value) {
    // 判断当前选中的两张卡片的值是否匹配
    if (openedCard.value.val === card.val) {
      // 匹配成功，剩余数量减 1
      remainCount.value--;
    } else {
      // 记录下标用于后续翻转状态
      const index = openedCard.value.index;
      let timer = setTimeout(() => {
        // 清除定时器
        clearTimeout(timer);
        // 将匹配失败的两张卡片盖回去
        cardMaps.value[index].open = false;
        card.open = false;
      }, 500);
    }
    // 同步清除当前项，避免后续的卡牌误入盖牌流程
    openedCard.value = null;
  } else {
    // 记录当前打开的第一张卡牌信息
    openedCard.value = { ...card };
  }
}

function start() {
  getRandomGame(getRandomIndex(10));
}

onMounted(() => {
  start();
});
</script>

<template>
  <div class="card-wrapper">
    <div
      v-for="card in cardMaps"
      class="card"
      :key="card.index"
      :class="{ 'card--open': card.open }"
    >
      <div class="card-front">{{ card.val }}</div>
      <div class="card-back" @click="openCard(card)"></div>
    </div>
  </div>
  <div class="game-again" v-show="!remainCount">
    <div>:::tada:::</div>
    <button @click="start()">Try again?</button>
  </div>
</template>

<style lang="scss">
$flipDeg: 180deg;

@keyframes flip {
  100% {
    transform: rotateY($flipDeg);
  }
}

@keyframes close {
  0%,
  50% {
    transform: rotateY($flipDeg);
  }
  100% {
    transform: rotateY(0);
  }
}

.card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 20px;
  gap: 5px;
  perspective: 1000px;
}
.card {
  position: relative;
  width: 80px;
  height: 100px;
  transform-style: preserve-3d;
  animation: close 1.5s both;

  .card-front {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-weight: bolder;
    border: 3px double $fontColor;
    backface-visibility: hidden;
    transform: rotateY($flipDeg);
  }
  .card-back {
    position: absolute;
    inset: 0;
    background: url(../assets/sprigatito.png) 11% / 333% no-repeat;
    backface-visibility: hidden;
  }
  &.card--open {
    animation: flip 0.5s both;
  }
}
.game-again {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
</style>
