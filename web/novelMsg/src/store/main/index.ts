import { defineStore } from "pinia";
import {
  getAllNovelData,
  getNovelCount,
  getRandomNovelData,
  getNovelDataByParams,
} from "@/service/main";

//定义容器
export const useMainContentStore = defineStore("main", {
  state: () => {
    return {
      pageDataList: [] as any[],
      pageDataRandom: [] as any[],
      currentPageData: [] as any[],
      totalCount: 0,
    };
  },
  getters: {},

  actions: {
    async getAllNovelAction() {
      const pageUrl = "/all";
      const pageRes = await getAllNovelData(pageUrl);
      this.pageDataList = pageRes.data.data;
    },
    // novellist Action
    async getPageNoveDataAction(page: number, pagesize: number) {
      const pageUrl = "/all";
      const pageRes = await getNovelDataByParams(pageUrl, page, pagesize);
      this.currentPageData = pageRes.data.data;
    },
    // novellist 分页 action
    async getPageNovelCountAction() {
      const countRes = await getNovelCount("/info");
      const totalCount = countRes.data.data;
      this.totalCount = totalCount;
    },
    async getRandomNovelAction() {
      const pageUrl = "/random";
      const pageRes = await getRandomNovelData(pageUrl);
      this.pageDataRandom = pageRes.data.data;
    },
  },

  persist: true,
});
