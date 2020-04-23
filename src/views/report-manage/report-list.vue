<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
         
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="reporter_nickname" label="举报者昵称" width="150" />
        <el-table-column prop="reporter_openid" label="举报者ID" width="220" />
        <el-table-column prop="release_datetime" label="举报日期" width="150"  />
        <el-table-column prop="reason" label="举报原因" width="220" />
        <el-table-column prop="trip_id" label="被举行程ID"  />
        
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
      getAdminReports({ ...this.pageInfo }).then(
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
      this.getReport();
    },
    search() {
      this.pageInfo.page = 1;
      this.getReport();
    }
  }
};
</script>
<style lang="scss">
</style>
