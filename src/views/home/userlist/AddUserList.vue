<template>
  <div class="addUserList">
    <el-dialog title="提示" :visible.sync="isShow" width="35%">
      <div slot="title">新增用户</div>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role">
            <el-option
              v-for="(key,value,index) in $store.state.roleObj"
              :key="index"
              :label="+key"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editUserInfo, addUserInfo } from "@/api/userList.js";
export default {
  props: ["type"],
  data() {
    return {
      isShow: false,
      form: {
        id: "", //是	int	用户标识
        username: "", //否	string	昵称
        phone: "", //否	string	手机号
        email: "", //否	string	邮箱
        avatar: "", //否	string	头像
        password: "", //否	string	密码
        remark: "", //否	string	备注
        status: "", //否	string	状态：1启用0禁用
        role_id: "" //否
      },
      rules: {
        username: [{ required: true, message: "必填项", trigger: "blur" }],
        email: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱号！");
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号！");
              }
            },
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    sumbit() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.type == "edit") {
            editUserInfo(this.form).then(() => {
              this.$message.success("编辑成功");
              this.$emit("search");
              this.isShow = false;
            });
          } else {
            addUserInfo(this.form).then(() => {
              this.$message.success("新增成功");
              this.$emit("search");
              this.isShow = false;
            });
          }
        } else {
          this.$message.error("验证失败");
        }
      });
    }
  }
};
</script>

<style lang="less">
.addUserList {
  .el-dialog__header {
    padding: 0;
    background: linear-gradient(-225deg, #01c3fa, #1395fa);
    height: 54px;
    font-size: 18px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    letter-spacing: 0px;
    text-align: center;
    line-height: 54px;
  }
}
</style>