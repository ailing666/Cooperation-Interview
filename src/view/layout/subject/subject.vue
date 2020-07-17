<template>
  <div class="subject">
    <el-card>
      <!-- el-form
           model:数据绑定   label-width:标题宽度   rules规则绑定
           inline:true行内模式，false块级模式
     el-form-item   label:标题  prop="对应值的key" label-width:就近原则

      -->
      <el-form :model="form" inline ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="w100" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="w100" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="w100" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- select
            el-select v-model
              el-option  label 文本  value值
          -->
          <el-select class="w100" v-model="form.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">
            {{
            (pagination.currentPage - 1) * pagination.pageSize +
            scope.$index +
            1
            }}
          </template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid" width="100px"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="学科简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" width="100px" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" prop="status" width="80px">
          <template v-slot="scope">{{ scope.row.status == 0 ? '禁用' : '启用' }}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!--scope.$index 序号   scope.row当前行数据  -->
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- pagination
      size-change:页容量改变
      current-change:页码改变
      current-page:默认在哪一页
      page-sizes:页容量选项
      page-size：默认页容量 一定要页容量选项中存在该值
      layout:功能布局
      total:总数
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <subjectAdd ref="subjectAdd"></subjectAdd>
  </div>
</template>
<script>
import { getSubjectList, setSubjectStatus } from "@/api/subject.js";
// 组件套用组件：1：导入  2：注册  3：使用
import subjectAdd from "./subjectAdd";
export default {
  components: {
    subjectAdd
  },
  data() {
    return {
      pagination: {
        currentPage: 1, //页码
        pageSize: 1, //页容量
        total: 100
      },
      form: {
        rid: "", //否	string	学科编号
        name: "", //否	string	学科名称
        page: "", //否	string	页码 默认为1
        limit: "", //否	string	页尺寸 默认为10
        username: "", //否	string	创建者用户名
        status: "" //否	string	状态 0(禁用) 1(启用)
      },
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //   调用接口获取数据
      let _query = {
        ...this.form,
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      };
      window.console.log("_query:", _query);
      getSubjectList(_query).then(res => {
        window.console.log("学科列表:", res);
        this.pagination.total = res.data.pagination.total;
        this.list = res.data.items;
      });
    },
    reset() {
      //   调用el-form里面的resetFields方法 1：在el-form上来一个ref  2:this.$refs.值.resetFields()
      //   需要重置的表单项加上prop绑定
      //表单验证  1：el-form  model  rules 2:需要验证的项加 prop  3:写规则
      this.$refs.form.resetFields();
      // 调用接口
      this.search();
    },
    //页容量改变
    handleSizeChange(size) {
      //size:当前页容量
      window.console.log("页容量:", size);
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      window.console.log("页码:", page);
      this.pagination.currentPage = page;
      // 接口请求
      this.getData();
    },
    //搜索功能
    search() {
      //接口请求getData
      this.pagination.currentPage = 1;
      this.getData();
    },
    //状态设置
    setStatus(id) {
      setSubjectStatus({ id }).then(() => {
        // 提示一下，设置状态成功，
        this.$message.success("设置状态成功");
        // 刷新数据
        this.getData();
      });
    },
    //u新增
    add() {
      //调用子组件内的一个属性(isShow)改为true
      // 父调用子  1：在子组件标签上定义一个ref  ref=值  2:访问子组件this===this.$refs.值.isShow=true
      this.$refs.subjectAdd.isShow = true;
    },
    //编辑
    edit(row) {
      this.$refs.subjectAdd.isShow = true;
      this.$refs.subjectAdd.form = JSON.parse(JSON.stringify(row));
      /*
堆与栈的存储  
字符串：原始值 
 对象：引用值
      var a={xxx:1}
      var b=a
      b.xxx=2
      a.xxx=?
    深拷贝：

*/
    }
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
    padding-top: 20px;
  }
}
</style>
