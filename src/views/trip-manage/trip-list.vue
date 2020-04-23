<template>
  <div id="film">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="70px" class="demo-form-inline">
              <el-form-item label="类型">
                <el-select v-model="searchCond.type" placeholder="请选择" style="width:120px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input placeholder="姓名" size="medium" v-model="searchCond.name"  style="width:120px;"></el-input>
              </el-form-item>
              <el-form-item label="行程ID">
                <el-input placeholder="行程ID" size="medium" v-model="searchCond._id"></el-input>
              </el-form-item>
              <el-form-item label="发布日期">
                <el-date-picker
                  v-model="searchCond.release_datetime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  size="medium"
                ></el-date-picker>
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
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        element-loading-text="Loading"
        v-loading="listLoading"
      >
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150"></el-table-column>
        <el-table-column prop="open_id" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="wechat" label="微信号" width="150"></el-table-column>
        <el-table-column prop="_start_city" label="出发城市" width="180"></el-table-column>
        <el-table-column prop="start_address" label="出发地址" width="180"></el-table-column>
        <el-table-column prop="_end_city" label="目的城市" width="180"></el-table-column>
        <el-table-column prop="end_address" label="目的地址" width="180"></el-table-column>
        <el-table-column prop="via" label="途径地点" width="150"></el-table-column>
        <el-table-column prop="start_datetime" label="出发日期" width="180"></el-table-column>
        <el-table-column prop="release_datetime" label="发布日期" width="180"></el-table-column>
        <el-table-column prop="total" label="空余/乘车人数" width="120"></el-table-column>
        <el-table-column prop="car_type" label="车型" width="100"></el-table-column>
        <el-table-column prop="attention" label="备注" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" fixed="right" >
          <template slot-scope="scope">
            <span :class="'a' + ['已关闭','发布','已屏蔽'].indexOf(scope.row.status)">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope" width="100">
            <el-button @click="del(scope.row)" type="danger" size="mini" v-if="scope.row.status !== '已屏蔽'">屏蔽</el-button>
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
import { getAdminTrips, setFrozenTrip } from "@/api/api";
import { stampToTime } from "@/utils/index";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      options:[
        {
          value: '',
          label: '全部'
        },{
        value: '0',
        label: '人找车'
      },{
        value: '1',
        label: '车找人'
      }],
      searchCond: {
        name: "",
        release_datetime: [],
        type:'',
        _id:''
      },
      //分页信息
      pageInfo: {
        total: 0,
        page_size: 10,
        page: 1
      }
    };
  },
  mounted() {
    this.getTrips();
  },
  methods: {
   
    getTrips() {
      this.listLoading = true;
      let date = this.searchCond.release_datetime;
      if(date.length !== 0){
        this.searchCond.release_datetime[0] = date[0] + ' ' + '00:00';
        this.searchCond.release_datetime[1] = date[1] + ' ' + '23:59';
      }
      getAdminTrips({...this.pageInfo, ...this.searchCond }).then(res => {
        let { msg, data, code } = res;
        if(code === 0){
          data.list.forEach(v=>{
            v.type = v.type === 0 ? '人找车' : '车找人';
            v._start_city = v.start_province + ',' + v.start_city + ',' + v.start_district;
            v._end_city = `${v.end_province},${v.end_province},${v.end_province}`;

            v.status = {'-1':'已屏蔽', '0':'已关闭', '1':"发布"}[v.status];
            v.car_type = v.car_type || '-';
            v.wechat = v.wechat || '-';
            v.via = v.via || '-';
            v.attention = v.attention || '-';
          })
          this.list = data.list;
          this.pageInfo.total = data.total;
        }
        this.listLoading = false;
      });
    },
    //搜索
    search() {
      this.pageInfo.page = 1;
      this.getTrips(this.searchCond);
    },
    //屏蔽
    del(row) {
      this.$confirm(`此操作会把行程从前台列表中删除，确定操作吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        setFrozenTrip({ _id: row._id }).then(res => {
          let { data, msg } = res;
          this.$message({
            message: msg,
            type: "success"
          });
          this.getTrips();
        });
      });
    },
    //分页
    changePage(val) {
      this.pageInfo.page = val;
      this.getTrips();
    }
  }
};
</script>
<style lang="scss">
.a1{
  color: #67c23a;
}
.a2{
  color: #dd6161;
}
</style>
