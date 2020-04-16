<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="昵称">
                <el-input placeholder="昵称" size="medium" v-model="searchName" />
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
        <el-table-column prop="nickname" label="昵称" width="200" />
        <el-table-column prop="openid" label="ID" width="250" />
        <el-table-column prop="createdate" label="注册日期" />
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
import { getAdminUsers } from "@/api/api";
export default {
  filters: {},
  data() {
    return {
      list: [],
      listLoading: null,
      searchName: null, //搜索名称
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
      getAdminUsers({ ...this.pageInfo, searchName: this.searchName }).then(
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
    }
  }
};
</script>
<style lang="scss">
</style>
