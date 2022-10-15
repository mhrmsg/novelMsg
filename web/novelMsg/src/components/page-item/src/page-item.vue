<template>
  <!-- <div class="collapse">
    <input type="checkbox" class="peer" />
    <div class="collapse-title btn">
      {{ novelData.title }}
    </div>
    <div class="collapse-content mt-2">
      <PageCard :novelData="novelData"></PageCard>
    </div>
  </div> -->

  <div tabindex="0" class="collapse group">
    <div class="flex justify-center align-middle">
      <div class="flex-initial mt-3">
        <kbd class="kbd bg-info"> <a href="javascript:void">◀︎</a></kbd>
      </div>
      <div class="collapse-title btn flex-initial">
        <span>{{ novelData.title }}</span>
      </div>
      <div class="flex-initial mt-3">
        <kbd class="kbd bg-info">
          <a :href="'https://' + novelData.book_url" target="_blank">▶︎</a></kbd
        >
      </div>
    </div>

    <div class="collapse-content mt-2">
      <PageCard :novelData="novelData"></PageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageCard from "@/components/page-card";
const props = defineProps(["data"]);
const novelData = props.data;
</script>

<style scoped></style>
