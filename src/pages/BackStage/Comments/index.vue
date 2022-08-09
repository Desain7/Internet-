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
        </el-row>
        <el-table :data="records" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="comments" label="评论内容" width="300px">
          </el-table-column>
          <el-table-column
            prop="email"
            label="作者"
            width="200px"
          >
          </el-table-column>
          <el-table-column
            prop="opusId"
            label="作品id"
            width="95px"
          >
          </el-table-column>
          <el-table-column prop="support" label="点赞数" width="80px">
          </el-table-column>
          <el-table-column label="创建时间" width="200px" prop="createTime">
          </el-table-column>
          <el-table-column label="操作" width="130px">
            <template>
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
  name: "commentsManage",
  data() {
    return {
      records: [
        {
          id: 4,
          comments: "垃圾，什么狗屎东西",
          email: "2369303335@qq.com",
          opusId: 2,
          support: 5,
          createTime: "2022-07-13 17:31:55",
        },
        {
          id: 2,
          comments: "看起来真不错",
          email: "1902317191@qq.com",
          opusId: 2,
          support: 1,
          createTime: "2022-07-13 17:12:28",
        },
        {
          id: 3,
          comments: "垃圾，什么狗屎东西",
          email: "2369303335@qq.com",
          opusId: 2,
          support: 0,
          createTime: "2022-07-13 17:31:52",
        },
      ],
    };
  },
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