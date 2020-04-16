<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="账号">
                <el-input placeholder="账号" size="medium" v-model="searchName" />
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
        <el-table-column prop="reporter_openid" label="举报者ID" width="220" />
        <el-table-column prop="reason" label="举报原因" width="220" />
        <el-table-column prop="trip_id" label="被举行程ID" width="220" />
        <el-table-column prop="release_datetime" label="举报日期" />
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
import { getAdminReports } from "@/api/api";
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
    this.getReport();
  },
  methods: {
    getReport() {
      this.listLoading = true;
      getAdminReports({ ...this.pageInfo, searchName: this.searchName }).then(
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
