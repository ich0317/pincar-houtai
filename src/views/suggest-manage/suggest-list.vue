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
        <el-table-column prop="suggester_nickname" label="留言人昵称" width="150" />
        <el-table-column prop="open_id" label="留言人ID" width="240" />
        <el-table-column prop="release_datetime" label="留言日期" width="150" />
        <el-table-column prop="suggest" label="留言" />
        
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
import { getAdminSuggests } from "@/api/api";
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
    this.getSuggests();
  },
  methods: {
    getSuggests() {
      this.listLoading = true;
      getAdminSuggests({ ...this.pageInfo }).then(
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
      this.getSuggests();
    },
    search() {
      this.pageInfo.page = 1;
      this.getSuggests();
    }
  }
};
</script>
<style lang="scss">
</style>
