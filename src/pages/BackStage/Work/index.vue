<template>
  <div class="work">
    <div class="workManage">
      <el-card v-if="!isAdd">
        <!-- gutter设置行内列之间的距离 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" clearable v-model="searchInput">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleSearch"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="goAdd">添加作品</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="selectDelete">批量删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="worksList" style="width: 100%" ref="worksTable">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="opusName" label="作品名称" width="100px">
          </el-table-column>
          <el-table-column
            prop="id"
            label="作品ID"
            width="90px"
            :sortable="true"
          >
          </el-table-column>
          <el-table-column
            prop="opusIntroduce"
            label="作品简介"
            width="350px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="history"
            label="历史"
            width="200px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="origin"
            label="起源"
            width="200px"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="opusType" label="作品分类" width="100px">
          </el-table-column>

          <el-table-column prop="opusTitle" label="标题" width="100px">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150px"
            prop="createTime"
            :sortable="true"
          >
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
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
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-card>
      <el-card v-if="isAdd">
        <!-- 提示区 -->
        <el-alert
          title="添加作品信息"
          type="info"
          center
          show-icon
          :closable="false"
        >
        </el-alert>
        <!-- 进度条 为让steps和tab-pane实现一一对应联动，都绑定上了activeIndex，但steps这里要的是数字类型，所以最简单来-0处理-->
        <el-steps
          :space="200"
          :active="activeIndex - 0"
          finish-status="success"
          align-center
        >
          <el-step title="基本信息"></el-step>
          <el-step title="作品描述"></el-step>
          <el-step title="作者信息"></el-step>
          <el-step title="作品图片"></el-step>
          <el-step title="作品视频"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- label-position-top让标签在输入框上面 -->
        <el-form
          :model="addWorksForm"
          status-icon
          ref="addWorksFormRef"
          label-width="100px"
          label-position="top"
        >
          <!-- v-model绑定的是被激活的tab-pane的name属性 tab-pane被激活的name更新给activeIndex,activeIndex又更新给steps,实现联动-->
          <!-- 只不过tab-pane的name值期望是字符串类型，但el-steps的active想要的是数值类型，所以el-steps在取值时要转换下类型 -->
          <el-tabs
            tab-position="left"
            style="height: auto"
            v-model="activeIndex"
            @tab-click="tabClick"
          >
            <!-- el-tab-pane只允许做el-tabs的子节点,所以form表单得在外面-->
            <el-tab-pane label="基本信息" name="0" :disabled="activeIndex > 1">
              <el-form-item label="作品名称" prop="opusName" :required="true">
                <el-input v-model="addWorksForm.opusName"></el-input>
              </el-form-item>
              <el-form-item label="作品标题" prop="opusTitle" :required="true">
                <el-input v-model="addWorksForm.opusTitle"></el-input>
              </el-form-item>
              <el-form-item label="作品类型" prop="opusType" :required="true">
                <el-select v-model="addWorksForm.opusType">
                  <el-option label="手工艺" value="手工艺"></el-option>
                  <el-option label="戏曲文化" value="戏曲文化"></el-option>
                  <el-option label="民间文化" value="民间文化"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-button style="float: right" @click="closeAdd">取消</el-button>
              <el-button style="float: right" type="primary" @click="nextIndex"
                >下一步</el-button
              >
            </el-tab-pane>
            <el-tab-pane
              label="作品描述"
              name="1"
              :disabled="activeIndex > 1 || activeIndex != 1"
            >
              <el-form-item label="作品介绍" :required="true">
                <el-input
                  type="textarea"
                  autosize
                  v-model="addWorksForm.opusIntroduce"
                ></el-input>
              </el-form-item>
              <el-form-item label="历史" :required="true">
                <el-input
                  type="textarea"
                  autosize
                  v-model="addWorksForm.history"
                ></el-input>
              </el-form-item>
              <el-form-item label="制作">
                <el-input
                  type="textarea"
                  autosize
                  v-model="addWorksForm.make"
                ></el-input>
              </el-form-item>
              <el-form-item label="起源">
                <el-input
                  type="textarea"
                  autosize
                  v-model="addWorksForm.origin"
                ></el-input>
              </el-form-item>
              <el-button style="float: right" @click="closeAdd">取消</el-button>
              <el-button style="float: right" type="primary" @click="nextIndex"
                >下一步</el-button
              >
            </el-tab-pane>
            <el-tab-pane label="作者信息" name="2" :disabled="activeIndex != 2">
              <el-form-item label="作者" prop="name">
                <el-input v-model="addAuthorForm.name"></el-input>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
                <div class="avatar">
                  <div class="avatarCover">
                    <el-upload
                      action="/api/user/uploadHead"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <span> 更换头像 </span>
                    </el-upload>
                  </div>

                  <img class="avatarImg" :src="addAuthorForm.photos" alt="" />
                </div>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="addAuthorForm.sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="年龄"
                prop="age"
                :rules="[{ type: 'number', message: '年龄必须为数字值' }]"
              >
                <el-input v-model.number="addAuthorForm.age"></el-input>
              </el-form-item>
              <el-button style="float: right" @click="closeAdd">取消</el-button>
              <el-button style="float: right" type="primary" @click="nextIndex"
                >下一步</el-button
              >
            </el-tab-pane>
            <el-tab-pane label="作品图片" name="3" :disabled="activeIndex != 3">
              <el-form-item label="图片">
                <img
                  class="pictureLi"
                  v-for="(item, index) in addWorksForm.photos"
                  :key="index"
                  :src="item.url"
                />
                <el-upload
                  ref="photoUpload"
                  action="/api/opusPhoto/upload"
                  list-type="picture-card"
                  :auto-upload="false"
                  :data="{ opusId: workId }"
                  style="display: inline-block"
                  :on-success="uploadFirstPictureSuccess"
                  :before-upload="beforePictureUpload"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
              <el-button style="float: right" @click="closeAdd">取消</el-button>
              <el-button style="float: right" type="primary" @click="nextIndex"
                >下一步</el-button
              >
            </el-tab-pane>
            <el-tab-pane label="作品视频" name="4" :disabled="activeIndex != 4">
              <el-button type="primary" @click="completeAdd" class="saveWork"
                >保存作品</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
      <el-dialog
        title="编辑作品"
        :visible.sync="editWorkVisible"
        width="50%"
        @close="editWorkClosed"
        :fullscreen="true"
      >
        <el-form :model="editWorkInform" label-width="100px">
          <el-form-item label="作品id">
            <el-input v-model="editWorkInform.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="作品名称">
            <el-input v-model="editWorkInform.opusName"></el-input>
          </el-form-item>
          <el-form-item label="作品介绍">
            <el-input
              type="textarea"
              autosize
              v-model="editWorkInform.opusIntroduce"
            ></el-input>
          </el-form-item>
          <el-form-item label="作品类型">
            <el-select v-model="editWorkInform.opusType">
              <el-option label="手工艺" value="手工艺"></el-option>
              <el-option label="戏曲文化" value="戏曲文化"></el-option>
              <el-option label="民间文化" value="民间文化"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作品标题">
            <el-input v-model="editWorkInform.opusTitle"></el-input>
          </el-form-item>
          <el-form-item label="作品主图">
            <el-image class="pictureLi" :src="editWorkInform.photo" :preview-src-list="[editWorkInform.photo]"/>
          </el-form-item>
          <el-form-item label="图片">
            <div
              class="picture"
              v-for="(item, index) in editWorkInform.photos"
              :key="index"
            >
              <el-image class="pictureLi" :src="item.url"/>
              <div class="handle">
                <span @click="editWorkInform.photo = item.url"
                  ><i class="el-icon-check"></i>设为主图</span
                >
                <span @click="deletePhoto(item.id)"
                  ><i class="el-icon-delete"></i>删除</span
                >
              </div>
            </div>
            <el-upload
              ref="photoUpload"
              action="/api/opusPhoto/upload"
              list-type="picture-card"
              :auto-upload="false"
              :data="{ opusId: editWorkInform.id }"
              style="display: inline-block"
              :on-success="uploadPictureSuccess"
              :before-upload="beforePictureUpload"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频资源">
            <el-upload
              class="upload-video"
              action="/api/vod/uploadVideo"
              :on-success="uploadVideoSuccess"
              :before-upload="beforeVideoUpload"
              multiple
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="editWorkInform.createTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="历史">
            <el-input
              type="textarea"
              autosize
              v-model="editWorkInform.history"
            ></el-input>
          </el-form-item>
          <el-form-item label="制作">
            <el-input
              type="textarea"
              autosize
              v-model="editWorkInform.make"
            ></el-input>
          </el-form-item>
          <el-form-item label="起源">
            <el-input
              type="textarea"
              autosize
              v-model="editWorkInform.origin"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="editWorkVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "workManage",
  data() {
    return {
      activeIndex: "0",
      isAdd: false,
      searchInput: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      editWorkInform: {},
      addWorksForm: {},
      addAuthorForm: {},
      editWorkVisible: false,
      queryInfo: {
        //请求参数
        query: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 10, //数据总数
    };
  },
  computed: {
    ...mapState({
      worksList: (state) => state.works.worksList,
      workId: (state) => state.works.workId,
    }),
  },
  methods: {
    closeAdd() {
      this.isAdd = false;
    },
    goAdd() {
      this.isAdd = true;
    },
    selectDelete() {
      let worksId = [];
      this.$refs.worksTable.selection.forEach((element) => {
        worksId.push(element.id);
      });
      this.$store.dispatch("deleteWorks", worksId);
      location.reload();
    },
    handleEdit(e) {
      this.editWorkInform = e;
      this.editWorkVisible = true;
    },
    handleSearch() {
      this.$store.dispatch("worksList", {
        opusType: "",
        opusName: this.searchInput,
      });
    },
    tabClick() {},
    async deletePhoto(id) {
      const result = await this.$confirm("确定删除这张图片吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result !== "confirm") {
        return this.$message.info("已取消删除操作！");
      } else {
        this.editWorkInform.photos.forEach((item, index) => {
          if (item.id == id) {
            this.editWorkInform.photos.splice(index, 1);
          }
        });
        this.$store.dispatch("deletePhoto", {id:id + ""});
      }
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleDelete(e) {
      const result = await this.$confirm("确定删除这个作品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result !== "confirm") {
        return this.$message.info("已取消删除操作！");
      } else {
        let deleteId = [e.id];
        this.$store.dispatch("deleteWorks", deleteId);
        location.reload();
      }
    },
    uploadPictureSuccess(res) {
      this.editWorkInform.photos.push({
        id: "",
        opusId: "",
        url: res.data,
      });
    },
    uploadFirstPictureSuccess(res) {
      console.log(res.data);
      this.addWorksForm.photos.push({
        id: "",
        opusId: "",
        url: res.data,
      });
    },
    beforePictureUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      return isLt2M && (isJPG || isPNG);
    },
    beforeVideoUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isMP4 = file.type === "video/mp4";
      if (!isLt100M) {
        this.$message.error("上传视频大小不能超过 100MB!");
      }
      if (!isMP4) {
        this.$message.error("上传图片只能是 MP4 格式!");
      }
      return isLt100M && isMP4;
    },
    uploadVideoSuccess(res) {
      delete this.addWorksForm.photos;
      this.addWorksForm.video = res.data;
      this.$store.dispatch("commitWorkEdit", this.addWorksForm);
    },
    confirmEdit() {
      delete this.editWorkInform.photos;
      this.$refs.photoUpload.submit();
      this.$store.dispatch("commitWorkEdit", this.editWorkInform);
      location.reload();
    },
    submitAdd() {
      this.$store.dispatch("submitAddWork", this.addWorksForm);
    },
    completeAdd() {
      this.activeIndex = "5";
      location.reload();
    },
    submitAuthor() {
      let authorForm = this.addAuthorForm;
      authorForm.opus_id = this.workId + "";
      authorForm.age = authorForm.age + "";
      this.$store.dispatch("submitAuthor", authorForm);
    },
    nextIndex() {
      if (this.activeIndex == "0") {
        if (
          this.addWorksForm.opusName &&
          this.addWorksForm.opusTitle &&
          this.addWorksForm.opusType
        ) {
          this.activeIndex = "1";
        } else {
          this.$message.error("请将必要的信息填写完整！");
        }
      } else if (this.activeIndex == "1") {
        if (this.addWorksForm.opusIntroduce && this.addWorksForm.history) {
          this.submitAdd();
          this.activeIndex = "2";
        } else {
          this.$message.error("请将必要的信息填写完整！");
        }
      } else if (this.activeIndex == "2") {
        if (
          this.addAuthorForm.name &&
          this.addAuthorForm.age &&
          this.addAuthorForm.photos
        ) {
          this.submitAuthor();
          this.activeIndex = "3";
        } else if (!this.addAuthorForm.photos) {
          this.$message.error("请上传作者头像");
        } else {
          this.$message.error("请将必要的信息填写完整！");
        }
      } else if (this.activeIndex == "3") {
        if (this.addAuthorForm.photos) {
          this.activeIndex = "4";
        } else {
          this.$message.error("请上传作品图片！");
        }
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      return isLt2M && (isJPG || isPNG);
    },
    handleAvatarSuccess(res) {
      this.addAuthorForm.photos = res.data;
    },
    editWorkClosed() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  },
  mounted() {
    this.$store.dispatch("worksList", { opusType: "", opusName: "" });
  },
};
</script>

<style lang="scss" scoped>
.work {
  overflow: hidden;

  .workManage {
    background-color: rgb(35, 42, 69);
    min-height: 100vh;
    width: 90%;
    position: absolute;
    right: 0;
    .el-card {
      width: 90%;
      margin: auto;
      margin-top: 2%;
    }
  }
  .pictureLi {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    display: inline-block;
  }
  .picture {
    display: inline-block;
    position: relative;
    .pictureLi {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      cursor: pointer;
      line-height: 146px;
      vertical-align: top;
      display: inline-block;
    }
    .handle {
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      width: 148px;
      height: 148px;
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: 0.5s;
      span {
        color: #fff;
        cursor: pointer;
        margin: auto;
      }
    }
    &:hover {
      .handle {
        opacity: 1;
      }
    }
  }
}
.el-steps {
  align-items: center;
  justify-content: center;
}
.saveWork {
  float: right;
}
.avatar {
  height: 3rem;
  width: 3rem;
  margin: auto 0;
  margin-left: 5%;
  display: flex;
  border-radius: 50%;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .avatarCover {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    text-align: center;
    opacity: 0;
    transition: 0.5s;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      font-size: 0.5rem;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    .avatarCover {
      opacity: 1;
    }
  }
  .avatarImg {
    margin: auto;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}
</style>