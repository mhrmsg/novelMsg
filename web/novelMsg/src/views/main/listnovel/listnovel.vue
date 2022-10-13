<template>
  <div
    class="flex flex-col m-auto sm:h-full min-h-screen w-fit align-center justify-center"
  >
    <PageContent class="w-full" :data="data"></PageContent>
  </div>
</template>

<script setup lang="ts">
import { useMainContentStore } from "@/store/main/index";
import PageContent from "@/components/page-content";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const store = useMainContentStore();
// 获取路由信息
const route = useRoute();
// 数据初始化
const currentPage: number = Number.parseInt(route.params.page.toString()) | 0;

store.getPageNovelCountAction();
store.getPageNoveDataAction(currentPage, 6);

const { totalCount } = storeToRefs(store);
let data = {
  currentPage: currentPage,
  totalCount: totalCount,
  pageData: store.currentPageData,
};

console.log(data);
</script>

<style scoped></style>
