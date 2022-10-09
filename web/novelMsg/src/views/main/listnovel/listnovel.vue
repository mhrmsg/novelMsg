<template>
  <div
    class="flex flex-col w-8/12 m-auto min-h-screen min-w-max max-w-full align-center justify-center"
  >
    <PageContent class="w-full" :data="data"></PageContent>
  </div>
</template>

<script setup lang="ts">
import { useMainContentStore } from "@/store/main/index";
import PageContent from "@/components/page-content";
import { useRoute } from "vue-router";
const store = useMainContentStore();
// 获取路由信息
const route = useRoute();
// 数据初始化
const currentPage: number = Number.parseInt(route.params.page.toString()) | 0;
store.getPageNovelCountAction();
store.getPageNoveDataAction(currentPage, 6);
const data = {
  currentPage: currentPage,
  totalCount: store.totalCount,
  pageData: store.currentPageData,
};
</script>

<style scoped></style>
