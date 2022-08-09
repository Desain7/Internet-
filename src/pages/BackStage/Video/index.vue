<template>
  <div class="work">
    <div class="workManage">
      <el-card>
        <!-- gutter来设置行内列之间的距离 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="goAddPage">添加商品</el-button>
          </el-col>
        </el-row>
        <el-table :data="worksList" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格（元）"
            width="95px"
          >
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="80px">
          </el-table-column>
          <el-table-column label="创建时间" width="140px">
            <!-- 使用全局时间过滤器将时间戳转为日期格式 -->>
          </el-table-column>
          <el-table-column label="操作" width="130px">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 15, 25, 30]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoManage",
};
</script>

<style lang="scss" scoped>
.work {
  overflow: hidden;
  .workManage {
    background-color: rgb(35, 42, 69);
    height: 100vh;
    width: 90%;
    position: absolute;
    right: 0;
    .el-card {
      width: 90%;
      margin: auto;
      margin-top: 2%;
    }
  }
}
</style>