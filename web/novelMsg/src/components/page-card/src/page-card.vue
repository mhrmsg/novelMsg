<template>
  <div
    class="card max-w-sm md:w-96 sm:w-96 lg:w-96 shadow-xl h-full bg-neutral text-neutral-content"
  >
    <figure v-if="showPic">
      <img alt="img" class="md:h-40 lg:h-40 md:w-auto" :src="novelData.image" />
    </figure>
    <div class="card-body text-left flex flex-col justify-between">
      <h2 class="card-title">
        {{ novelData.title }}
        <div class="badge badge-secondary h-auto text-center">
          {{ novelData.author }}
        </div>
      </h2>
      <div :class="{ tuncate: showPic }">
        {{ novelData.intro }}
      </div>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">{{ novelData.type }}</div>
        <div class="badge badge-outline">{{ novelData.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICard } from "../types/index";
import { PropType } from "vue";
const showPic: boolean = false;
const { novelData } = defineProps(["novelData"]);
</script>
