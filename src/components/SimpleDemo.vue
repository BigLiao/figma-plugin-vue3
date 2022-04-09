<script setup lang="ts">
import { ref } from 'vue';
import { pluginApi } from '../api/connection';

const num = ref(0);

console.log('ui code runs!');
let containerId: string | undefined;

async function addBlock() {
  console.log('add');
  num.value += 1;
  containerId = await pluginApi.addBlock(containerId);
}

async function subBlock() {
  console.log('substract');
  if (num.value === 0) return;
  num.value -= 1;
  if (containerId) {
    pluginApi.subBlock(containerId);
  }
}
</script>

<template>
  <h1>Simple Demo</h1>
  <div>实现热重载？是的</div>
  <p>当前色块数量：<span id="block-num">{{ num }}</span></p>
  <div class="buttons">
    <button
      id="btn-add"
      @click="addBlock"
    >
      +
    </button>
    <button
      id="btn-sub"
      @click="subBlock"
    >
      -
    </button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
p {
  color: red;
}

.buttons {
  margin-top: 20px;
  text-align: center;
}

.buttons button {
  width: 40px;
}

#block-num {
  font-size: 20px;
}
</style>
