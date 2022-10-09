<template>
  <!-- 分页 -->
  <div>
    <div class="btn-group">
      <a class="btn btn-outline" @click="changePage(false)" href="javascript:;"
        >上一页</a
      >

      <template v-for="item in pages" :key="item">
        <button
          class="btn btn-outline"
          @click="changePage(item)"
          :class="{ active: current == item }"
        >
          {{ item }}
        </button>
      </template>

      <a class="btn btn-outline" @click="changePage(true)" href="javascript:;"
        >下一页</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainContentStore } from "@/store/main/index";
import { storeToRefs } from "pinia";
import { reactive, ref, computed } from "vue";
const store = useMainContentStore();
const props = defineProps(["data"]);
const currentPage = props.data || 1;
let current = ref(currentPage);
let { totalCount } = storeToRefs(store);

const pages = computed(() => {
  // 当父组件传递total的值发生变化时，计算属性会重新计算
  // pages = Math.ceil(props.total / props.pagesize)
  const result = [];
  // 总页码小于等于5；大于5
  if (totalCount.value <= 5) {
    // 总页码小于等于5的情况
    for (let i = 1; i <= totalCount.value; i++) {
      result.push(i);
    }
  } else {
    // 总页码大于5
    if (current.value <= 2) {
      // 左侧临界值
      for (let i = 1; i <= 5; i++) {
        result.push(i);
      }
    } else if (current.value >= totalCount.value - 1) {
      // 右侧临界值
      for (let i = totalCount.value - 4; i <= totalCount.value; i++) {
        result.push(i);
      }
    } else {
      // 中间的状态
      for (let i = current.value - 2; i <= current.value + 2; i++) {
        result.push(i);
      }
    }
  }
  return result;
});

console.log(pages);

// let list = Math.ceil(totalCount.value / 6);
//  生成 current , current + 6 的数组
// function generateArr(list: number, current: number) {
//   let listItem: any[] = [];
//   if (current + 6 <= list) {
//     listItem = new Array(list)
//       .fill(1)
//       .map((v, i) => {
//         if (i >= current && i <= current + 5) {
//           return i;
//         }
//       })
//       .filter((v, i) => {
//         return v;
//       });
//   } else {
//     listItem = new Array(list)
//       .fill(1)
//       .map((v, i) => {
//         if (i >= current) {
//           return i;
//         }
//       })
//       .filter((v, i) => {
//         return v;
//       });
//   }
//   return listItem;
// }

// const listItem = generateArr(list, current);
// let items = reactive(listItem);
function changePage(type: any) {
  console.log(type);
  if (type === false) {
    // 上一页
    // 页面是第一页时，禁止点击操作
    if (current.value === 1) return;
    if (current.value > 1) {
      current.value -= 1;
    }
  } else if (type === true) {
    // 下一页
    // 页面是最后页时，禁止点击操作
    if (current.value === totalCount.value) return;
    if (current.value < totalCount.value) {
      current.value += 1;
    }
  } else {
    // 点击页码
    current = type;
  }
  // 刷新页面数据
  store.getPageNoveDataAction(current.value, 6);
  // if (current.value % 6 === 0 || current.value % 5 === 1) {
  //   const arr = generateArr(list, current.value);
  //   for (let i = 0; i < arr.length; i++) {
  //     items[i] = arr[i];
  //   }
  // }
}
</script>

<style scoped></style>
