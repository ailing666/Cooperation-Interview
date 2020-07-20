<template>
    <div class="business">
        <el-card>
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
                <el-form-item label="企业编号" prop="eid">
                    <el-input v-model="form.eid" placeholder="企业编号"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="form.name" placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="username">
                    <el-input v-model="form.username" placeholder="创建者"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.role_id" placeholder="请选择状态">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="clear">清除</el-button>
                    <el-button type="primary" @click="add" class="el-icon-plus">新增企业</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="tableCard">
            <el-table :data="businessList" border style="width: 100%">
                <el-table-column label="序号" width="80">
                    <template v-slot="scope">
                        {{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="eid" label="企业编号">
                </el-table-column>
                <el-table-column prop="name" label="企业名称">
                </el-table-column>
                <el-table-column prop="username" label="创建者">
                </el-table-column>
                <el-table-column prop="create_time" label="创建日期">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template v-slot="scope">
                        <!-- {{ scope.row.status == 0 ? '禁用' : '启用' }} -->
                        <el-switch @change="setStatus(scope.row.id)" v-model="scope.row.status" active-color="#13ce66"
                            inactive-color="#ccc" :active-value="1" :inactive-value="0" :validate-event="false">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="primary" class="el-icon-edit setting" @click="edit(scope.row)"></el-button>
                        <!-- <el-button @click="setStatus(scope.row.id)">禁用</el-button> -->
                        <el-button type="danger" class="el-icon-delete setting" @click="del(scope.row.id)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage" :page-sizes="pagination.pageSizes"
                    :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" background
                    :total="pagination.total">
                </el-pagination>
            </div>
        </el-card>
        <Add-business ref="addBusiness" :mode="modeFather">
        </Add-business>
    </div>
</template>

<script>
import {
    getBusinessList,
    delBusiness,
    setBusinessStatus
} from "@/api/business.js";
import AddBusiness from "./AddBusiness.vue";
export default {
    components: {
        AddBusiness
    },
    data() {
        return {
            form: {
                eid: "", //	是	string	企业编号
                name: "", //	是	string	企业名称
                create_id: "",
                status: ""
            },
            businessList: [],
            pagination: {
                currentPage: 1,
                pageSizes: [1, 2, 4, 8],
                pageSize: 4,
                total: 10
            },
            modeFather: "add"
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let query = {
                ...this.form,
                page: this.pagination.currentPage,
                limit: this.pagination.pageSize
            };
            getBusinessList(query).then(res => {
                // console.log(res.data);
                this.businessList = res.data.items;
                this.pagination.total = res.data.pagination.total;
            });
        },
        search() {
            this.pagination.currentPage = 1;
            // alert(123);
            this.getData();
        },
        clear() {
            this.$refs.form.resetFields();
        },
        add() {
            this.modeFather = "add";
            this.$refs.addBusiness.form = {
                eid: "", //企业编号
                name: "", //企业名称
                short_name: "", //企业简称
                intro: "", //企业简介
                remark: "" //备注
            };
            this.$refs.addBusiness.dialogVisible = true;
        },
        edit(row) {
            this.modeFather = "edit";
            this.$refs.addBusiness.dialogVisible = true;
            this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
        },
        setStatus(id) {
            setBusinessStatus({ id }).then(() => {
                this.$message.success("修改成功");
                this.getData();
            });
        },
        del(id) {
            this.$confirm("此操作将删除该文件,是否继续", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "确认",
                type: "warning"
            }).then(() => {
                delBusiness({ id }).then(() => {
                    this.$message.success("删除成功");
                    this.getData();
                });
            });
        },
        handleSizeChange(size) {
            this.pagination.pageSize = size;
            this.getData();
        },
        handleCurrentChange(page) {
            this.pagination.currentPage = page;
            this.getData();
        }
    }
};
</script>

<style>
.pagination {
    text-align: center;
}
.tableCard {
    margin-top: 25px;
}
</style>