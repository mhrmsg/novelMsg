<template>
  <div
    class="flex flex-col w-8/12 space-y-4 m-auto min-h-screen min-w-max pt-10 items-center"
  >
    <NavHeader class="w-full max-h-12 flex-none h-14"></NavHeader>
    <div class="stack flex-auto md:p-20 lg:p-20">
      <TransitionGroup name="list">
        <template
          v-for="(item, index) in pageDataRandom"
          :key="item"
          :data-index="index"
        >
          <PageCard :novelData="item"></PageCard>
        </template>
      </TransitionGroup>
    </div>
    <div class="m-auto flex-1">
      <div class="btn-group grid grid-cols-2">
        <button class="btn btn-outline prev" @click="prevClick">Prev</button>
        <button class="btn btn-outline next" @click="nextClick">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import NavHeader from "@/components/nav-header";
import PageCard from "@/components/page-card";
import { useMainContentStore } from "@/store/main/index";
import { storeToRefs } from "pinia";
let show = ref(true);
const store = useMainContentStore();

const { pageDataList, pageDataRandom } = storeToRefs(store);

//记录本次的数据
let arr = pageDataRandom;
//记录修改的数据
let alterArr = [] as any[];
//点击计数
let index = 0;
onBeforeMount(() => {
  store.getRandomNovelAction();
});

// 1 2 3   1 、3的时候触发边界情况，加载上一页，下一页。2的时候触发本体功能
function prevClick() {
  if (index === 0) {
    store.getRandomNovelAction();
    alterArr = [];
  } else if (index === 1) {
    pageDataRandom.value.unshift(alterArr[0]);
    index--;
  } else if (index === 2) {
    pageDataRandom.value.unshift(alterArr[1]);
    index--;
  }
}
function nextClick() {
  if (index === 0) {
    const tmpdata = pageDataRandom.value.shift();
    alterArr.push(tmpdata);
    index++;
  } else if (index === 1) {
    const tmpdata = pageDataRandom.value.shift();
    alterArr.push(tmpdata);
    index++;
  } else if (index === 2) {
    alterArr = [];
    store.getRandomNovelAction();
    index = 0;
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 1;
  transform: translateX(30px);
}
</style>
