<script setup lang="ts">
import { ref } from 'vue';
import SimpleDemoVue from './components/SimpleDemo.vue';
import ApiTestVue from './components/ApiTest.vue';
import HelloWorldVue from './components/HelloWorld.vue';

const currentPage = ref('ApiTest');

</script>

<template>
  <div class="nav">
    <button
      :class="{active: currentPage === 'HelloWorld'}"
      @click="currentPage = 'HelloWorld'"
    >
      HelloWorld
    </button>
    <button
      :class="{active: currentPage === 'SimpleDemo'}"
      @click="currentPage = 'SimpleDemo'"
    >
      SimpleDemo
    </button>
    <button
      :class="{active: currentPage === 'ApiTest'}"
      @click="currentPage = 'ApiTest'"
    >
      ApiTest
    </button>
  </div>
  <SimpleDemoVue v-if="currentPage==='SimpleDemo'" />
  <ApiTestVue v-if="currentPage==='ApiTest'" />
  <HelloWorldVue
    v-if="currentPage==='HelloWorld'"
    msg="Hello World"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav button + button {
  margin-left: 10px;
}

.nav button.active {
  background-color: aqua;
}
</style>
