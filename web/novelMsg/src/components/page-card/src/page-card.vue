<template>
  <div
    class="card max-w-sm md:w-96 sm:w-96 lg:w-96 shadow-xl h-full bg-neutral text-neutral-content"
  >
    <figure v-if="showPic" class="mt-2">
      <img alt="img" class="h-60 md:w-auto" :src="novelData.image" />
    </figure>
    <div class="card-body text-left flex flex-col justify-between">
      <h2 class="card-title">
        <a v-bind:href="'http://' + novelData.book_url" target="_blank">
          {{ novelData.title }}
        </a>
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
import test from "node:test";
const showPic: boolean = true;
const { novelData } = defineProps(["novelData"]);
</script>
