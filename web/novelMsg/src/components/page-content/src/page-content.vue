<template>
  <div class="mockup-window border bg-base-300">
    <!-- 顶部Path展示 -->
    <div class="ml-5">
      <PagePath></PagePath>
    </div>
    <div class="flex flex-col bg-base-200">
      <!-- Item  展示 ，使用 grid 布局-->
      <div class="grid grid-cols-2 md:grid-cols-2 p-10 gap-4 overflow-hidden">
        <PageItem class="overflow-hidden"></PageItem>
        <PageItem class="overflow-hidden"></PageItem>

        <PageItem></PageItem>
        <PageItem></PageItem>
      </div>
      <!-- 分页 暂时不做-->
      <div>
        <Pagination
          @change-page="changePage"
          :pagesize="6"
          :total="totalCount"
          :page="1"
        ></Pagination>
      </div>
      <!-- Footer 展示 -->
      <PageFooter></PageFooter>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageItem from "@/components/page-item";
import PageFooter from "@/components/page-footer";
import PagePath from "@/components/page-path";
//分页功能
import Pagination from "@/components/pagination";
// 获取数据
const props = defineProps(["data"]);
const { currentPage, totalCount, pageData } = props.data;

const total = ref(0);
const pageSize = ref(6);
// 控制页码的变化
const changePage = (page: number) => {
  // 修改分页参数，重新调用接口即可
  console.log(page);
  // 重新调用接口，渲染数据
};
</script>

<style scoped></style>
