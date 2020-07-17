<template>
    <div class="login">
        <div class="left">
            <div class="header">
                <img class="left-logo" src="@/assets/img/login_logo.png" alt="">
                <span class="t1">黑马面面</span>
                <div class="line"></div>
                <span class="t2">用户登录</span>
            </div>
            <el-form class="form" :model="form" :rules="rules" ref="form">
                <el-form-item prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                        :show-password="true">
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row>
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" v-model="form.code" prefix-icon="el-icon-key">
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <img class="code-img" @click="codeClick" :src="codeUrl" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="isPass">
                    <el-checkbox v-model="form.isPass">
                        我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link>
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="submit">登录</el-button>
                    <br />
                    <el-button class="btn" type="primary" @click="showRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <img src="@/assets/img/login_right.png" alt="">
        <register ref="register"></register>
    </div>
</template>

<script>
import register from "./register";
import { toLogin } from "@/api/login";
import { getLocal, saveLocal } from "@/utils/local";
export default {
    components: {
        register
    },
    created() {
        if (getLocal()) {
            this.$router.push("/layout");
        }
    },
    data() {
        return {
            codeUrl: process.env.VUE_APP_URL + "/captcha?type=login",
            form: {
                phone: "",
                password: "",
                code: "",
                isPass: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "位数不对",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "change"
                    },
                    { min: 6, max: 12, message: "长度不行", trigger: "change" }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "change"
                    },
                    { min: 4, max: 4, message: "瞎鸡儿输入" }
                ],
                isPass: [
                    { required: true, message: "钩你丫的", trigger: "change" }
                ]
            }
        };
    },
    methods: {
        codeClick() {
            this.codeUrl =
                process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
        },
        submit() {
            this.$refs.form.validate(result => {
                if (result) {
                    toLogin(this.form).then(res => {
                        this.$message.success("登录成功");
                        saveLocal(res.data.token);
                        this.$router.push("/layout");
                    });
                    //         this.$message({
                    //             message: "6666666",
                    //             type: "success"
                    //         });
                } else {
                    this.$message({
                        message: "菜鸡",
                        type: "error"
                    });
                }
            });
        },
        showRegister() {
            this.$refs.register.isShow = true;
        }
    }
};
</script>

<style lang="less">
.login {
    display: flex;
    justify-content: space-around; //!!!!!!!!!!
    align-items: center;
    height: 100%;
    background: linear-gradient(to right, #1494f1, #01c6fa);
    .left {
        width: 478px;
        height: 550px;
        background-color: #f5f5f5;
        padding: 48px;
        .header {
            display: flex;
            align-items: center;
        }
        .left-logo {
            width: 22px;
            height: 17px;
            margin-right: 20px;
        }
        .t1 {
            text-align: left;
            font-size: 22px;
            font-family: SourceHanSansCN Regular,
                SourceHanSansCN Regular-Regular;
            font-weight: 400;
            color: #0c0c0c;
        }
        .line {
            width: 1px;
            height: 28px;
            background-color: #c7c7c7;
            margin: 0 15px;
        }
        .t2 {
            font-size: 22px;
            font-family: PingFangSC Regular, PingFangSC Regular-Regular;
            font-weight: 400;
            color: #0c0c0c;
            text-align: left;
        }
        .form {
            margin-top: 20px;
            .code-img {
                width: 100%;
                height: 40px;
            }
            .btn {
                display: block;
                width: 100%;
            }
        }
    }
}
</style>