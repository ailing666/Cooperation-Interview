<template>
  <div class="userList">
    <!-- 
      子传父
    -->
    <p>{{aaa}}</p>
    <button @click="btnClick">子按钮</button>
  </div>
</template>

<script>
export default {
  props: ["aaa"],
  methods: {
    btnClick() {
      this.$emit("fun");
    },
    fun() {
      alert("this.aaa");
    }
  }
};
</script>

<style>
</style>