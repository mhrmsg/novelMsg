<template>
  <div class="collapse">
    <input type="checkbox" />
    <div class="collapse-title btn">
      {{ novelData.title }}
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
