<template>
  <div class="login">
    <!-- 左侧登录区 -->
    <div class="left">
      <!-- 头部 -->
      <div class="top">
        <img class="left-logo" src="@/assets/img/login_logo.png" alt />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登陆</span>
      </div>
      <!-- 表单区 -->
      <el-form class="form" :model="form" :rules="rules" ref="form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 输入区 -->
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <!-- 图片区 -->
            <el-col :span="8">
              <img class="code_img" @click="changeImg" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 多选框区 -->
        <el-form-item prop="isPass">
          <el-checkbox v-model="form.isPass">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="showRegister">注册</el-button>
          <Register ref="register"></Register>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="@/assets/img/login_right.png" alt />
  </div>
</template>

<script>
import Register from "../login/Register";
import { toLogin } from "@/api/login.js";
import { saveLocal } from "@/utils/local.js";
export default {
  components: { Register },
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        isPass: false
      },
      // 验证规则
      rules: {
        phone: [
          { required: true, message: "必填哦", trigger: "blur" },
          { min: 11, max: 11, message: "手机号必须11位", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              _reg.test(value)
                ? callback()
                : callback(new Error("请正确输入手机号码"));
            }
          }
        ],
        password: [
          { required: true, message: "必填哦", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度6-12位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "必填哦", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ],
        isPass: [
          // 限制必勾选多选框
            {
              validator: (rule, value, callback) => {
                if (value === true) {
                  callback();
                } else {
                  callback(new Error("请勾选协议"));
                }
              },
              trigger: "change"
            }
        ]
      }
    };
  },
  methods: {
    changeImg() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    showRegister() {
      this.$refs.register.isShow = true;
    },

    submit() {
      // 提交时进行 全局校验
      this.$refs.form.validate(result => {
        if (result) {
          toLogin(this.form).then(res => {
            this.$message.success("提交成功");
            saveLocal(res.data.token);
            this.$router.push("/Layout");
          });
        } else {
          this.$message.error("提交失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(90deg, #1494fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;  
    .top {
      display: flex;
      align-items: center;
    }
    .left-logo {
      width: 22px;
      height: 17px;
      margin-right: 20px;
    }
    .t1 {
      font-size: 24px;
      font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #0c0c0c;
    }
    .line {
      width: 1px;
      height: 28px;
      background: #c7c7c7;
      margin: 0 15px;
    }
    .t2 {
      font-size: 22px;
      font-family: PingFangSC Regular, PingFangSC Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #0c0c0c;
    }
    .form {
      margin-top: 20px;
      .code_img {
        width: 100%;
        height: 40px;
        width: 100%;
      }
      .btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>