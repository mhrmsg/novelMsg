<template>
  <div class="mockup-window border bg-base-300 w-10/12 m-auto">
    <!-- 顶部Path展示 -->
    <div class="ml-5">
      <PagePath></PagePath>
    </div>
    <div class="bg-base-200">
      <!-- Item  展示 ，使用 grid 布局-->
      <div class="flex flex-wrap justify-center align-middle p-10">
        <template v-for="item in currentPageData" :key="item._id">
          <PageItem :data="item" class="m-2"></PageItem>
        </template>
      </div>
      <!-- 分页 暂时不做-->
      <div class="p-10">
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
import { useMainContentStore } from "@/store/main/index";
import { storeToRefs } from "pinia";
// 获取数据
const props = defineProps(["data"]);
const { currentPage, totalCount, pageData } = props.data;

const total = ref(0);
const pageSize = ref(6);
// 控制页码的变化
const store = useMainContentStore();
const { currentPageData } = storeToRefs(store);

const changePage = (page: number) => {
  // 修改分页参数，重新调用接口即可
  // 重新调用接口，渲染数据
  store.getPageNoveDataAction(page, 6);
};
</script>

<style scoped></style>
