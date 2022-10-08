import { defineStore } from "pinia";
import { getAllNovelData, getRandomNovelData } from "@/service/main";
//定义容器
export const useMainContentStore = defineStore("main", {
  state: () => {
    return {
      pageDataList: null,
      pageDataRandom: null,
    };
  },
  getters: {},
  actions: {
    async getAllNovelAction() {
      const pageUrl = "/all";
      const pageRes = await getAllNovelData(pageUrl);
      this.pageDataList = pageRes.data.data;
    },
    async getRandomNovelAction() {
      const pageUrl = "/random";
      const pageRes = await getRandomNovelData(pageUrl);
      this.pageDataRandom = pageRes.data.data;
    },
  },
});
