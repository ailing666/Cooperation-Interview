<template>
  <!-- 对话框 -->
  <el-dialog :visible="isShow" width="600px" class="register" :show-close="false">
    <div slot="title" class="register-title">用户注册</div>
    <!-- 主体部分 -->

    <el-form :model="form" ref="form" :rules="rules" label-width="80px">
      <!-- 头像 -->
      <el-form-item prop="avatar" label="头像">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码" :show-password="true">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item prop="imgcode" label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="codeImg" @click="codeChange" class="codeimg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="rcode" label="验证码">
        <el-row>
          <el-col :span="15">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="8" :offset="1">
            <!-- 当time<31时,让按钮禁用且实时显示剩余秒数 -->
            <el-button @click="getRcode" :disabled="time<31">
              获取短信验证码
              <span v-if="time<31">({{time}})</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="register-foooter">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRcode, registerUser } from "@/api/login.js";
export default {
  data() {
    return {
      time: 31,
      isShow: false,
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      codeImg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      imageUrl: "",
      form: {
        avatar: "", //string	头像地址
        username: "", //string	用户名
        email: "",
        phone: "", //string	手机号
        password: "", //string	密码
        imgcode: "", //图
        rcode: "" //string	验证码
      },
      rules: {
        avatar: [{ required: true, message: "必填哦", tirgger: "blur" }],
        username: [
          { required: true, message: "必填哦", tirgger: "blur" },
          { min: 2, message: "最少要有两个字符哦", tirgger: "blur" }
        ],
        email: [
          { required: true, message: "必填哦", tirgger: "blur" },
          {
            // validator自定义表单验证
            validator: (rules, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正确邮箱地址"));
              }
            },
            tirgger: "change"
          }
        ],
        phone: [
          { required: true, message: "必填哦", tirgger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", tirgger: "blur" }
        ],
        password: [
          { required: true, message: "必填哦", tirgger: "blur" },
          { min: 6, max: 12, message: "密码长度6-12", tirgger: "blur" }
        ],
        imgcode: [
          { required: true, message: "必填哦", tirgger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", tirgger: "blur" }
        ],
        rcode: [
          { required: true, message: "必填哦", tirgger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", tirgger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击验证码切换验证码
    codeChange() {
      // 再请求接口后加一个随机数
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取短信验证码
    getRcode() {
      let num = 0;
      this.$refs.form.validateField(["phone", "imgcode"], errorMessage => {
        // 当验证通过时,就让num++
        if (errorMessage == "") {
          num++;
        }
      });
      // 当num==2的时候,说明两个都通过了
      if (num === 2) {
        // // 设置5s后才能再次点击,time--后开启定时器,每秒自减1,当等于-1时清楚定时器让time重新等于31
        this.time--;
        let timer = setInterval(() => {
          this.time--;
          if (this.time <= -1) {
            clearInterval(timer);
            this.time = 31;
          }
        }, 1000);

        getRcode({ code: this.form.imgcode, phone: this.form.phone }).then(
          res => {
            // message不能接受numbe类型数据,所以要转为字符串
            this.$message.success(res.data.captcha + "");
          }
        );
      } else {
        this.$message.error("验证失败");
      }
    },
    // 接口调用成功后的回调函数
    handleAvatarSuccess(res) {
      // 将头像的url赋值给avater
      this.form.avatar = res.data.file_path;
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
      //头像上传成功后再局部验证
      this.$refs.form.validateField(["avatar"]);
    },
    // 接口调用前的回调函数
    beforeAvatarUpload(file) {
      // 判断文件的格式是否为png或jpj
      const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success("提交成功");
          registerUser(this.form).then(res => {
            window.console.log(res);
            this.isShow = false;
          });
        } else {
          this.$message.error("提交失败");
        }
      });
    }
  },
  // 侦听isShow
  watch: {
    isShow(newVal) {
      // 当isShow为false时,重置表单
      if (newVal == false) {
        // form表单的方法都需要里面的值都有相应的prop绑定
        this.$refs.form.resetFields();
        // imageUrl没有绑定prop,无法用resetFields重置,需手动重置
        this.imageUrl = "";
      }
    }
  }
};
</script>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .register-title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, #01c5fa, #1395fa);
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .register-foooter {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .codeimg {
    height: 41px;
    width: 143px;
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-form-item {
    margin-bottom: 22px !important;
  }
}
</style>
