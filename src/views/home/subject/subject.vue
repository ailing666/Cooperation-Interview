<template>
    <div>
        <div class="subject">
            <el-card>
                <el-form :model='form' label-width="100px" inline>
                    <el-form-item label="学科编号" prop="rid">
                        <el-input v-model="form.rid"></el-input>
                    </el-form-item>
                    <el-form-item label="学科名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建者" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select class="w100" placeholder="请选择状态" v-model="form.status">
                            <!-- <el-option label="默认" value=''></el-option> -->
                            <el-option label="启用" value=1></el-option>
                            <el-option label="禁用" value=0></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button @click="reset">清除</el-button>
                        <el-button type="primary" @click="add" v-if="$store.state.role!='学生'">新增学科</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card>
                <el-table :data="list">
                    <el-table-column label="序号" width="50px">
                        <template v-slot="scope">
                            {{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="rid" label="学科编号">
                    </el-table-column>
                    <el-table-column prop="name" label="学科名称">
                    </el-table-column>
                    <el-table-column prop="short_name" label="简称">
                    </el-table-column>
                    <el-table-column prop="username" label="创建者" width="180px">
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建日期">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width=100px>

                        <template v-slot="scope">
                            <!-- {{ scope.row.status == 0 ? '禁用' : '启用' }} -->
                            <el-switch @click.prevent.native="setStatus(scope.row.id)" v-model="scope.row.status"
                                active-color="#13ce66" inactive-color="#ccc" :active-value="1" :inactive-value="0"
                                :validate-event="false">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="270px">
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
                        :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                    </el-pagination>
                </div>
            </el-card>
            <subjectAdd ref="subjectAdd" :modeSon="modeFather" @sonSearch="search"></subjectAdd>
        </div>
    </div>
</template>

<script>
import { getSubjectList, setSubjectStatus, subjectDel } from "@/api/subject.js";
import subjectAdd from "./subjectAdd.vue";
export default {
    data() {
        return {
            form: {
                rid: "", //	是	string	学科编号
                name: "", //	是	string	学科名称
                short_name: "", //	否	string	学科简称
                intro: "", //	否	string	学科简介
                remark: "", //	否	string	备注
                username: "",
                status: ""
            },
            modeFather: "add",
            list: [],
            pagination: {
                currentPage: 1,
                pageSizes: [1, 2, 4, 8],
                pageSize: 4,
                total: 40
            }
        };
    },
    components: {
        subjectAdd
    },
    methods: {
        getData() {
            let _query = {
                ...this.form,
                page: this.pagination.currentPage,
                limit: this.pagination.pageSize
            };
            getSubjectList(_query).then(res => {
                this.list = res.data.items;
                this.pagination.total = res.data.pagination.total;
                // console.log(res.data.items);
            });
        },
        reset() {
            this.$refs.form.resetFields();
        },
        search() {
            this.pagination.currentPage = 1;
            this.getData();
        },
        add() {
            this.modeFather = "add";
            this.$refs.subjectAdd.isShow = true;
        }, //other way
        edit(row) {
            this.$refs.subjectAdd.isShow = true;
            this.modeFather = "edit";
            this.$refs.subjectAdd.form = JSON.parse(JSON.stringify(row));
        },
        setStatus(id) {
            setSubjectStatus({ id }).then(() => {
                this.$message.success("设置状态成功");
                this.getData();
            });
        },
        del(id) {
            this.$confirm("确定删除吗崽种", "FBI warning", {
                confirmButtonText: "凎",
                cancelButtonText: "不了",
                type: "danger"
            }).then(() =>
                subjectDel({ id }).then(() => {
                    this.$message.success("删除成功");
                    this.getData();
                })
            );
        },
        handleSizeChange(size) {
            // console.log(size);
            this.pagination.pageSize = size;
            this.pagination.currentPage = 1;
            this.getData();
        },
        handleCurrentChange(page) {
            // console.log(page);
            this.pagination.currentPage = page;
            this.getData();
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style lang="less">
.subject {
    .w100 {
        width: 120px;
    }
    .pagination {
        text-align: center;
        margin-top: 20px;
    }
    .setting {
        width: 70px;
    }
}
</style>