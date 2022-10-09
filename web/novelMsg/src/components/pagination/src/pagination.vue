<!-- 抄的 来源: https://juejin.cn/post/7011489802822352927 -->

<template>
  <div class="pagination">
    <a @click="changePage(false)" href="javascript:;">上一页</a>
    <span v-if="currentPage > 3">...</span>
    <a
      @click="changePage(item)"
      href="javascript:;"
      :class="{ active: currentPage === item }"
      v-for="item in list"
      :key="item"
      >{{ item }}</a
    >
    <span v-if="currentPage < pages - 2">...</span>
    <a
      @click="changePage(true)"
      href="javascript:;"
      :class="{ disabled: currentPage === pages }"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, ref } from "vue";

export default {
  name: "Pagination",
  props: {
    //数据总条数
    total: {
      type: Number,
      default: 80,
    },
    //每页数据条数
    pagesize: {
      type: Number,
      default: 8,
    },
    // 默认初始页码
    // page: {
    //   type: Number,
    //   default: 1
    // }
  },
  setup(props, { emit, attrs }) {
    // attrs表示父组件传递的属性，但是props没有接收的属性，这种属性不是响应式的  attrs接收父组件传递的当前页

    // 总页数
    const pages = computed(() => Math.ceil(props.total / props.pagesize));
    // 当前页码
    // console.log(attrs.page)
    // 如果父组件没有传递档当前页码，默认是第一页
    const currentPage = ref(attrs.page || 1);
    // 动态计算页码列表
    const list = computed(() => {
      // 当父组件传递total的值发生变化时，计算属性会重新计算
      // pages = Math.ceil(props.total / props.pagesize)
      const result = [];
      // 总页码小于等于5；大于5
      if (pages.value <= 5) {
        // 总页码小于等于5的情况
        for (let i = 1; i <= pages.value; i++) {
          result.push(i);
        }
      } else {
        // 总页码大于5
        if (currentPage.value <= 2) {
          // 左侧临界值
          for (let i = 1; i <= 5; i++) {
            result.push(i);
          }
        } else if (currentPage.value >= pages.value - 1) {
          // 右侧临界值
          for (let i = pages.value - 4; i <= pages.value; i++) {
            result.push(i);
          }
        } else {
          // 中间的状态
          for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
            result.push(i);
          }
        }
      }
      return result;
    });
    // 控制上一页和下一页变化
    const changePage = (type) => {
      if (type === false) {
        // 上一页
        // 页面是第一页时，禁止点击操作
        if (currentPage.value === 1) return;
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      } else if (type === true) {
        // 下一页
        // 页面是最后页时，禁止点击操作
        if (currentPage.value === pages.value) return;
        if (currentPage.value < pages.value) {
          currentPage.value += 1;
        }
      } else {
        // 点击页码
        currentPage.value = type;
      }
      emit("change-page", currentPage.value);
    };
    return { list, currentPage, pages, changePage };
  },
};
</script>
<style scoped lang="less">
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #3d4451;
    }
    &.active {
      background: #3d4451;
      color: #fff;
      border-color: #3d4451;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
