<template>
    <el-dialog class="register" :visible="isShow" width="600px" :show-close="false">
        <div class="register-title" slot="title">用户注册</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" :action="uploadUrl" name="image" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="图形码" prop="code">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="form.code"></el-input>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <img class="register-code" @click="codeClick" :src="codeImg" alt="">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="验证码" prop="rcode">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="form.rcode"></el-input>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-button @click="getRcode" :disabled="totalTime<5">获取验证码<span
                                v-if="totalTime!=5">({{totalTime+1}})</span>
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div class="register-footer" slot="footer">
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getRcode, registerUser } from "@/api/login.js";
export default {
    watch: {
        isShow(newval) {
            if (newval == false) {
                this.$refs.form.resetFields();
                this.imageUrl = "";
            }
        }
    },
    data() {
        return {
            isShow: false,
            uploadUrl: process.env.VUE_APP_URL + "/uploads",
            codeImg: process.env.VUE_APP_URL + "/captcha?type",
            imageUrl: "",
            totalTime: 5,
            form: {
                username: "", //	是	string	用户名
                phone: "", //	是	string	手机号
                email: "", //	是	string	邮箱
                avatar: "", //	是	string	头像地址
                password: "", //	是	string	密码
                rcode: "", //	是	string	验证码
                code: "" //图形码
            },
            rules: {
                avatar: [
                    {
                        required: true,
                        message: "填你的头像",
                        trigger: "change"
                    }
                ],
                username: [
                    {
                        required: true,
                        message: "填你的昵称",
                        trigger: "change"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "填你的电话",
                        trigger: "change"
                    },
                    {
                        validator: (rule, value, callback) => {
                            let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                            if (_reg.test(value)) {
                                callback();
                            } else {
                                callback(new Error("不行不行，手机不行"));
                            }
                        },
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "填你的邮箱",
                        trigger: "change"
                    },
                    {
                        validator: (rule, value, callback) => {
                            let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                            if (_reg.test(value)) {
                                callback();
                            } else {
                                callback(new Error("不行不行，邮箱不行"));
                            }
                        },
                        trigger: "change"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "填你的密码",
                        trigger: "change"
                    }
                ],
                rcode: [
                    {
                        required: true,
                        message: "填你的",
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "填你的code",
                        trigger: "change"
                    },
                    {
                        min: 4,
                        max: 4,
                        message: "44444",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        codeClick() {
            this.codeImg =
                process.env.VUE_APP_URL +
                "/captcha?type=sendsms&t=" +
                Date.now();
        },
        handleAvatarSuccess(res) {
            this.form.avatar = res.data.file_path;
            this.$refs.form.validateField(["avatar"]);
            this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
        },
        beforeAvatarUpload(file) {
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            // console.log(file);

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },

        getRcode() {
            let num = 0;
            this.$refs.form.validateField(["phone", "code"], err => {
                if (err == "") {
                    num++;
                }
                console.log(err);
            });
            if (num == 2) {
                this.totalTime--;
                let countDown = setInterval(() => {
                    this.totalTime--;
                    if (this.totalTime <= -1) {
                        clearInterval(countDown);
                        this.totalTime = 5;
                    }
                }, 1000);
                getRcode({
                    code: this.form.code,
                    phone: this.form.phone
                })
                    .then(res => {
                        console.log(res);
                        this.$message.success(res.data.captcha + "");
                    })
                    .catch(err => {
                        console.log("获取验证码错误信息", err);
                    });
            } else {
                this.$message.error("验证不通过");
            }
        },
        submit() {
            this.$refs.form.validate(result => {
                if (result) {
                    registerUser(this.form).then(res => {
                        if (res.code == 200) {
                            this.$message.success("注册成功");
                            this.isShow = false;
                        }
                    });
                } else {
                    this.$message({
                        message: "菜鸡",
                        type: "error"
                    });
                }
            });
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
    .register-footer {
        text-align: center;
    }
    .avatar-uploader .el-upload {
        margin: 0, auto;
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
    .register-code {
        width: 100%;
        height: 40px;
    }
}
</style>