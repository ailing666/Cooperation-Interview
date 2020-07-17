<template>
    <el-dialog :visible="isShow" width="600px" class="subjectAdd">
        <div class="title" slot="title">{{modeSon=='add'?"新增学科":"编辑学科"}}</div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
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
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { subjectAdd, subjectEdit } from "@/api/subject.js";
export default {
    props: ["modeSon"],
    watch: {
        isShow(newVal) {
            if (newVal == false) {
                this.form = {
                    rid: "", //string	学科编号
                    name: "", //string	学科名称
                    short_name: "", //string	学科简称
                    intro: "", //string	学科简介
                    remark: "" //string	备注
                };
                // this.$refs.form.clearValidate();
            } else {
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                });
            }
        }
    },
    data() {
        return {
            isShow: false,
            form: {
                rid: "", //	是	string	学科编号
                name: "", //	是	string	学科名称
                short_name: "", //	否	string	学科简称
                intro: "", //	否	string	学科简介
                remark: "" //	否	string	备注
            },
            rules: {
                rid: [{ required: true, message: "必填", trigger: "change" }],
                name: [{ required: true, message: "必填", trigger: "change" }]
            }
        };
    },

    methods: {
        submit() {
            this.$refs.form.validate(resule => {
                if (resule) {
                    if (this.modeSon == "add") {
                        subjectAdd(this.form).then(() => {
                            this.$message.success("添加成功");
                            this.isShow = false;
                            this.$emit("sonSearch");
                            // this.$parent.search();
                        });
                    } else {
                        subjectEdit(this.form).then(() => {
                            this.$message.success("编辑成功");
                            this.isShow = false;
                            this.$parent.search();
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
.subjectAdd {
    .el-dailog__header {
        padding: 0;
    }
    .el-dailog__headerbtn,
    .el-dailog__close {
        color: #fff;
    }
    .title {
        height: 53px;
        text-align: center;
        line-height: 53px;
        color: #fff;
        background: linear-gradient(to right, lightblue, #1394fa ;);
    }
}
</style>