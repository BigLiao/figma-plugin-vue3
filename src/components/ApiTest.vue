<script setup lang="ts">
import { bindCallback } from 'rpct/browser';
import { onMounted, ref } from 'vue';
import { pluginApi } from '../api/connection';

console.log('ui code runs!');

async function createRectangle() {
  console.log('createRectangle before');
  const rsp = await pluginApi.createRectangle(100, 220);
  console.log('createRectangle after', rsp);
}

async function testLocalStorage() {
  await pluginApi.setItem('testLocalStorageValue', 'this is test from UI');
  await new Promise(x => setTimeout(x, 1000));
  const value = await pluginApi.getItem('testLocalStorageValue');
  console.log('testLocalStorage result', value);
}

const httpTestTitle = ref('');
const testIndex = ref(1);

async function testHttp() {
  httpTestTitle.value = await pluginApi.testHttp(testIndex.value);
  testIndex.value += 1;
}

const currentSelectId = ref<string | null>(null);

onMounted(() => {
  pluginApi.listenSelectionChange(bindCallback((nodeIds) => {
    console.log('currentSelect Change', nodeIds);
    currentSelectId.value = nodeIds?.[0];
  }));
});

</script>

<template>
  <h1>API Test</h1>
  <div class="row">
    <div class="col">
      <h4>Plugin API 测试</h4>
      <div class="content">
        <button
          @click="createRectangle"
        >
          createRectangle
        </button>
        <button
          @click="testLocalStorage"
        >
          localStorage
        </button>
        <div>
          当前选中节点id: {{ currentSelectId }}
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="col">
      <h4>UI API 测试</h4>
      <div class="content">
        <button
          @click="testHttp"
        >
          http in plugin{{ testIndex }}
        </button>
        <div>{{ httpTestTitle }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.row {
  display: flex;
  flex-direction: row;

  .divider {
    width: 1px;
    background-color: #888;
  }

}

.col {
  flex: 1;
}


.buttons {
  margin-top: 20px;
  text-align: center;
}

.content {
  padding: 10px 0;
}

</style>
