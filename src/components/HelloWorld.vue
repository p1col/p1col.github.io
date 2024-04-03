<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { isWxWork, isDingTalk, isFeishu } from '../assets/js/utils/index';
import { feishuApi } from '../assets/js/utils/loadSdk';

const curEnv = computed(() =>
  isFeishu() ? '飞书' : isWxWork() ? '企业微信' : isDingTalk() ? '钉钉' : '其他'
);

const result = ref<string>('');
const errMsg = ref<string>('');

onMounted(async () => {
  if (isFeishu()) {
    try {
      const res: any = (await feishuApi()) || {};
      console.log('页面扫码结果', res);
      result.value = res.result;
    } catch (err: any) {
      console.log('页面错误结果', err);
      errMsg.value = err;
    }
  } else if (isDingTalk()) {
  } else if (isWxWork()) {
  }
});
</script>

<template>
  <div class="scan-test-page flex-col">
    <div>当前环境：{{ curEnv }}</div>
    <div v-if="result">扫码结果：{{ result }}</div>
    <div v-if="errMsg">错误原因：{{ errMsg }}</div>
  </div>
</template>

<style scoped>
.scan-test-page {
  padding: 32px;
  background-color: rgba(218, 138, 139, 0.1);
  /* box-shadow: rgba(218, 138, 139, 1) 0px 0px 0px 8.94553px; */
  box-shadow: -5px 5px 0 rgba(218, 138, 139, 0.4), -10px 10px 0 rgba(218, 138, 139, 0.3),
    -15px 15px 0 rgba(218, 138, 139, 0.2), -20px 20px 0 rgba(218, 138, 139, 0.1),
    -25px 25px 0 rgba(218, 138, 139, 0.05), 0 0 0 currentColor;
}
</style>
