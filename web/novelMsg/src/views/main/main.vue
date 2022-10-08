<template>
  <div
    class="flex flex-col w-8/12 space-y-4 m-auto min-h-screen min-w-max pt-10 items-center"
  >
    <NavHeader class="w-full max-h-12 flex-none h-14"></NavHeader>
    <div class="stack flex-auto pb-20">
      <!-- <Transition name="slide-fade">
        <PageCard v-if="show" :item=""></PageCard>
      </Transition>
      <PageCard></PageCard>
      <PageCard></PageCard> -->
      <div v-for="item in store.pageDataRandom">
        <PageCard :novelData="item"></PageCard>
      </div>
    </div>
    <div class="m-auto flex-1">
      <div class="btn-group grid grid-cols-2">
        <button class="btn btn-outline prev" @click="show = !show">
          Previous page
        </button>
        <button class="btn btn-outline next">Next</button>
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
store.getRandomNovelAction();
function prevClick() {}

function nextClick() {}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
