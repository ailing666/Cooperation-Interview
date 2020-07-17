<template>
    <el-container class="layout">
        <el-header class="header">
            <ul class="header-ul">
                <li class="el-icon-s-fold f20" @click="collapse=!collapse"></li>
                <li>
                    <img src="@/assets/img/layout-logo.png" alt="">
                </li>
                <li class="t1">黑马面面</li>
                <li class="nouse"></li>
                <li>
                    <img v-if="$store.state.userInfo!=''" class="avatar" :src="baseUrl+'/'+$store.state.userInfo.avatar"
                        alt="" />
                </li>
                <li class="t2">{{$store.state.userInfo.username}}</li>
                <li>
                    <el-button type="primary" @click="exit">退出</el-button>
                </li>
            </ul>
        </el-header>
        <el-container>
            <el-aside class="aside" width="auto">
                <el-menu route class="el-menu-vertical-demo" :default-active="$route.path" :collapse="collapse" router>
                    <el-menu-item index="/layout/chart">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title">数据概览</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/userlist">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/question">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">题库列表</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/business">
                        <i class="el-icon-office-building"></i>
                        <span slot="title">企业列表</span>
                    </el-menu-item>
                    <el-menu-item index="/layout/subject">
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
import { removeToken } from "@/utils/local.js";
export default {
    data() {
        return {
            baseUrl: process.env.VUE_APP_URL,
            collapse: false
        };
    },
    created() {
        // console.log(this.$router);
        getUserInfo()
            .then(res => {
                this.$store.state.userInfo = res.data;
                // console.log("用户信息" + res);
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        exit() {
            this.$confirm("hey we go？？？", "attention", {
                confirmButtonText: "yeah~~~",
                cancelButtonText: "oh~no~~",
                type: "warning"
            }).then(() =>
                logout().then(() => {
                    this.$message.success("退出成功");
                    removeToken();
                    this.$router.push("/login");
                })
            );
        }
    }
};
</script>

<style lang="less">
.layout {
    height: 100%;
    .header {
        .header-ul {
            display: flex;
            align-items: center;
            padding-top: 7px;
        }
        .nouse {
            flex: 1;
        }
        .avatar {
            width: 43px;
            height: 43px;
            margin-right: 20px;
            border-radius: 50%;
        }
        .f20 {
            font-size: 20px;
            margin-right: 15px;
        }
        .ti {
            font-size: 22px;
            font-family: Microsoft YaHei Regular,
                Microsoft YaHei Regular-Regular;
            font-weight: bold;
            text-align: left;
            color: #49a1ff;
            letter-spacing: 1px;
            margin-left: 15px;
        }
        .t2 {
            font-size: 14px;
            font-family: Microsoft YaHei Regular,
                Microsoft YaHei Regular-Regular;
            font-weight: bold;
            text-align: left;
            color: #636363;
            letter-spacing: 0px;
            margin-right: 20px;
        }
    }
    .aside {
        background-color: #00f;
    }
    .main {
        background-color: #e8e9ec;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>