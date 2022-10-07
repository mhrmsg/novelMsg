<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div v-if="showPic">
      <img alt="Shoes" src="https://placeimg.com/400/225/arch" />
    </div>
    <div class="card-body">
      <h2 class="card-title">
        Shoes!
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICard } from "../types/index";
import { PropType } from "vue";
const showPic: boolean = false;
const props = defineProps({
  card: {
    type: Object as PropType<ICard>,
  },
});
</script>
