<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="用户ID">
                <el-input placeholder="用户ID" size="medium" v-model="openid" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="nickname" label="昵称" width="150" />
        <el-table-column prop="openid" label="用户ID" width="250" />
        <el-table-column prop="createdate" label="注册日期" width="200" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handle(scope.row)" type="danger" size="mini" v-if="scope.row.isUse">禁用</el-button>
            <el-button @click="handle(scope.row)" type="success" size="mini" v-else>启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="pageInfo.page"
        :page-size="pageInfo.page_size"
        :total="pageInfo.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAdminUsers, isUseUser } from "@/api/api";
export default {
  filters: {},
  data() {
    return {
      list: [],
      listLoading: null,
      openid: null, //用户id
      pageInfo: {
        page: 1,
        page_size: 10,
        total: null
      }
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.listLoading = true;
      getAdminUsers({ ...this.pageInfo, openid: this.openid }).then(
        res => {
          let { code, msg, data } = res;
          this.list = data.list;
          this.pageInfo.total = data.total;
          this.listLoading = false;
        }
      );
    },
    changePage(val) {
      this.pageInfo.page = val;
      this.getUser();
    },
    search() {
      this.pageInfo.page = 1;
      this.getUser();
    },
    handle(row){
      this.$confirm(`确定要${row.isUse ? '禁用' : '启用'}此用户吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        isUseUser({openid:row.openid, isUse: !row.isUse}).then(res=>{
            let { code, msg, data } = res;
            this.$message({
                message: msg,
                type: 'success'
              });
              this.getUser();
          })
      });
     
    }
  }
};
</script>
<style lang="scss">
</style>
