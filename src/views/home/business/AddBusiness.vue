<template >
    <el-dialog class="AddBusiness" :visible.sync="dialogVisible" width="600px">
        <div class="title" slot="title">{{mode=="add"?"新增企业":"编辑企业"}}</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="企业编号">
                <el-input v-model="form.eid" prop="eid"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
                <el-input v-model="form.name" prop="name"></el-input>
            </el-form-item>
            <el-form-item label="简称">
                <el-input v-model="form.short_name" prop="short_name"></el-input>
            </el-form-item>
            <el-form-item label="企业简介">
                <el-input v-model="form.intro" prop="intro"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { addBusiness, editBusiness } from "@/api/business.js";
export default {
    props: ["mode"],
    data() {
        return {
            form: {
                eid: "", //	是	string	企业编号
                name: "", //	是	string	企业名称
                short_name: "", //	是	string	简称
                intro: "", //	是	string	企业简介
                remark: "" //	否	string	备注
            },
            dialogVisible: false,
            rules: {
                eid: [
                    {
                        required: true,
                        message: "请输入企业编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    }
                ],
                short_name: [
                    {
                        required: true,
                        message: "请输入企业简称",
                        trigger: "blur"
                    }
                ],
                intro: [
                    {
                        required: true,
                        message: "请输入企业简介",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(result => {
                console.log(result);
                if (result) {
                    if (this.mode == "add") {
                        addBusiness(this.form).then(() => {
                            this.$message.success("新增成功");
                            this.dialogVisible = false;
                            this.$parent.search();
                        });
                    } else {
                        editBusiness(this.form).then(() => {
                            this.$message.success("编辑成功");
                            this.dialogVisible = false;
                            this.$parent.search();
                        });
                    }
                }
            });
        },
        cancel() {
            console.log(this.mode);
            this.dialogVisible = false;
        }
    }
};
</script>

<style>
</style>