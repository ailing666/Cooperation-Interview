<template>
  <el-dialog :visible.sync="isShow" :rules="rules" width="600px" class="subjectAdd">
    <div slot="title" class="title">新增学科</div>
    <el-form :model="form" :rules="rules" label-width="120px" ref="form">
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: ["modeSon"],
  watch: {
    isShow(newVal) {
      if (newVal === false) {
        //清理表单
        this.form = {
          rid: "", //string	学科编号
          name: "", //string	学科名称
          short_name: "", //string	学科简称
          intro: "", //string	学科简介
          remark: "" //string	备注
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
        // this.$refs.form.resetFields()
      }
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        rid: "", //string	学科编号
        name: "", //string	学科名称
        short_name: "", //string	学科简称
        intro: "", //string	学科简介
        remark: "" //string	备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.modeSon == "edit") {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功");
              //关闭弹窗口
              this.isShow = false;
              //   子触发父方法   1：在子组件标签定义一个方法  @子组件方法名="父组件方法名" 2:触发，子组件 this.$emit("子组件方法名")
              this.$emit("sonSearch");
            });
          } else {
            addSubject(this.form).then(() => {
              this.$message.success("添加成功");
              //关闭弹窗口
              this.isShow = false;
              //子调用父的search方法
              // this.$parent===父级this
              this.$parent.search();
            });
          }
          //确定一下是处于编辑还是处于新增
        } else {
          this.$message.error("验证失败");
        }
      });
    }
  }
};
</script>
<style lang="less">
.subjectAdd {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    text-align: center;
    line-height: 53px;
    color: #fff;
    background: linear-gradient(to right, #01c5fa, #1394fa);
  }
  .footer {
    text-align: center;
  }
}
</style>
