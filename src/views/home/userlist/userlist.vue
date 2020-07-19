<template>
  <div class="userList">
    <!-- 上面卡片区 -->
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-input v-model="form.role_id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面卡片区 -->
    <el-card>
      <el-table :data="userList" border>
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名字" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="备注" prop="remask"></el-table-column>
        <el-table-column label="状态" prop="status" width="80px">
          <template v-slot="scope">{{ scope.row.status == 0 ? '禁用' : '启用' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope" class="caozuo">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
            <el-link
              type="primary"
              class="user-status"
              @click="changeStatus(scope.row.id)"
            >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-link>
            <el-link type="primary" @click="del(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[1,5,10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </el-card>
    <!-- 向父组件传type属性,触发父组件的search方法 -->
    <AddUserList ref="addUserList" :type="type" @search="search"></AddUserList>
  </div>
</template>

<script>
import { getUserList, setUserStatus, delUserInfo } from "@/api/userList.js";
import AddUserList from "./AddUserList";
export default {
  components: { AddUserList },
  data() {
    return {
      // 默认是add
      type: "add",
      form: {
        username: "", //否	string	昵称
        email: "", //否	string	邮箱
        role_id: "" //否	string	角色数字 2管理员、3老师、 4学生
      },
      userList: [],
      pagination: {
        currentPage: 1, //当前页
        total: 1, //总数
        pageSize: 1 //选择页码数
      }
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
      getUserList(query).then(res => {
        this.userList = res.data.items;
        // 将获取到的总条数赋值给分页器的total
        this.pagination.total = res.data.pagination.total;
        window.console.log(res);
      });
    },
    // 搜索
    search() {
      // 让页码回归1
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 清楚按钮
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 状态
    changeStatus(id) {
      setUserStatus({ id }).then(() => {
        // 提示一下，设置状态成功，
        this.$message.success("设置状态成功");
        // 刷新数据
        this.getData();
      });
    },
    // 删除
    del(id) {
      this.$confirm("你确定永久删除吗？", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUserInfo({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    // 新增
    add() {
      this.type = "add";
      this.$refs.addUserList.isShow = true;
    },
    edit(row) {
      this.type = "edit";
      this.$refs.addUserList.isShow = true;
      // 双重json深克隆对象
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(row));
      window.console.log(this.$refs.addUserList.form);
    },
    // 每页条数改变函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.search();
      console.log(`每页 ${val} 条`);
    },
    // 当前页码改变函数
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.user-status {
  margin: 0 5px;
}
</style>