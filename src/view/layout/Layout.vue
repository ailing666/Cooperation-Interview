<template>
  <el-container class="layout">
    <el-header class="header">
      <ul class="header_ul">
        <!-- 点击切换折叠 -->
        <li class="el-icon-s-fold" @click="collapse=!collapse"></li>
        <li>
          <img src="@/assets/img/layout-logo.png" alt />
        </li>
        <li class="t1">后台页面</li>
        <li class="empty"></li>
        <li>
          <!-- 
            当userInfo不为空时才渲染
            基地址拼接,加上/
          -->
          <img
            class="user_avatar"
            v-if="$store.state.userInfo != ''"
            :src="baseUrl + '/' + $store.state.userInfo.avatar"
            alt
          />
        </li>
        <li class="t2">{{$store.state.userInfo.username}},您好</li>
        <li>
          <el-button class="btn" @click="exit">退出</el-button>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <el-menu :default-active="$route.path" class="menuTransition" :collapse="collapse" router>
          <el-menu-item index="/Layout/Chart">
            <i class="el-icon-time"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/Layout/UserList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/Layout/Question">
            <i class="el-icon-setting"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/Layout/Business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/Layout/Subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, logout } from "@/api/layout.js";
import { removeLocal } from "@/utils/local.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      userInfo: "",
      collapse: false //是否折叠菜单
    };
  },
  created() {
    getUserInfo().then(res => {
      // 获取用户的信息
      this.$store.state.userInfo = res.data;
    });
  },
  methods: {
    exit() {
      // 选择框
      this.$confirm("您确定要退出该账户吗", "提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消",
        type: "waring"
      })
        .then(() => {
          logout().then(() => {
            this.$message.success("退出成功");
            // 删除token,跳转至登陆页
            removeLocal();
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .header {
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
    .header_ul {
      display: flex;
      justify-content: center;
      align-items: center;
      .t1 {
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
      }
      .el-icon-s-fold {
        margin: 0 10px;
      }
      .t2 {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #636363;
        letter-spacing: 0px;
      }
      .empty {
        flex: 1;
      }
      .user_avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
      .btn {
        width: 57px;
        height: 28px;
        background: #409eff;
        border: 1px solid #369cff;
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        letter-spacing: 0px;
      }
    }
  }
  .aside {
    background: #ffffff;
    // 动画类
    .menuTransition:not(.el-menu--collapse) {
      // 初始宽度
      width: 160px;
    }
  }
  .main {
    height: 100%;
    background: #e8e9ec;
  }
}
</style>