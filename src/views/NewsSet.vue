<template>
  <div>
        <el-breadcrumb style="margin-bottom:15px" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      <el-form ref="form" style="background:#ddd"  label-width="40px">
        <el-form-item style="margin-left:10px" label="查询">
            <el-input
                placeholder="文章名"
                size="small"
                style="width: 140px"
                v-model="model.keyWords.secName"
                clearable>
            </el-input>
            <el-button style="margin-left:13px" @click="newsFind()" icon="el-icon-search" circle></el-button>
            <el-button style="margin-left:740px" @click="reload()"><i class="el-icon-refresh"></i></el-button>
        </el-form-item>
      </el-form>
        <el-form ref="form" style="background:#ddd"  label-width="10px">
        <el-form-item>
            <el-button type="danger">批量删除</el-button>
            <el-button @click="model.dialogFormVisible1 = true" type="primary">+新增</el-button>
            <span v-if="model.findList==''" style="margin-left:760px">共有数据:{{model.listLength}}条</span>
            <span v-else style="margin-left:760px">共有数据:{{model.findList.length}}条</span>
        </el-form-item>
      </el-form>
      <el-table
      v-show="model.findList == ''"
      :data="model.newsList"
      style="width: 100%"
      @row-click="getDetails"
      >
      <el-table-column
        prop="docid"
        label="文章ID"
        width="125">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="content"
        label="文章标题"
        width="125">
      </el-table-column>
      <el-table-column
        prop="comments"
        label="文章评论"
        width="125">
      </el-table-column>
      <el-table-column
        prop="nets"
        label="发布媒体"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="photo"
        label="图片"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="mainContent"
        label="文章内容"
        width="125">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发布时间"
        width="125">
      </el-table-column>
      <el-table-column label="操作">
        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="model.dialogFormVisible = true" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="model.dialogVisible   = true" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table> 
     <el-table
      v-show="model.findList != ''"
      :data="model.findList"
      style="width: 100%"
      @row-click="getDetails"
      >
      <el-table-column
        prop="docid"
        label="文章ID"
        width="125">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="content"
        label="文章标题"
        width="125">
      </el-table-column>
      <el-table-column
        prop="comments"
        label="文章评论"
        width="125">
      </el-table-column>
      <el-table-column
        prop="nets"
        label="发布媒体"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="photo"
        label="图片"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="mainContent"
        label="文章内容"
        width="125">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发布时间"
        width="125">
      </el-table-column>
      <el-table-column label="操作">
        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="model.dialogFormVisible = true" circle></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="model.dialogVisible   = true" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table> 
    <el-dialog title="修改用户信息" :visible.sync="model.dialogFormVisible">
    <el-form :model="model.form">
        <el-form-item label="文章标题" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章评论" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.comments" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布媒体" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.nets" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.mainContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章图片"  :label-width="model.formLabelWidth">
            <div class="uploadfile">
              <van-uploader class="uploadimg" preview-size="100vw"   result-type="file"   :after-read="afterRead"></van-uploader>
              <img  v-if="model.form.photo" style="width:100px" :src="model.form.photo" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="model.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newsUpdate()">确 定</el-button>
    </div>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="model.dialogFormVisible1">
    <el-form :model="model.form1">
        <el-form-item label="文章标题" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章评论" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.comments" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布媒体" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.nets" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.maincontent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="model.formLabelWidth">
            <el-date-picker
                v-model="model.form1.time"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="model.pickerOptions">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="文章图片"  :label-width="model.formLabelWidth">
            <div class="uploadfile">
              <van-uploader class="uploadimg" preview-size="100vw"   result-type="file"   :after-read="otherafterRead"></van-uploader>
              <img  v-if="model.form1.photo" style="width:100px" :src="model.form1.photo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="model.dialogFormVisible1 = false;model.form1.photo = ''">取 消</el-button>
        <el-button type="primary" @click="newsInsert()">确 定</el-button>
    </div>
    </el-dialog>
    <el-dialog
    title="提示"
    :visible.sync="model.dialogVisible"
    width="30%"
    >
    <span>确定删除此用户？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="model.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newsDelete()">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            model:{
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                findList:[],
                newsList:[],
                listLength:"",
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogVisible:false,
                form: {
                docid:'',
                content:'',
                comments:'',
                nets:'',
                photo:'',
                time:'',
                mainContent:''
                },
                form1: {
                docid:'',
                content:'',
                comments:'',
                nets:'',
                photo:'',
                time:'',
                mainContent:''
                },
                formLabelWidth: '120px',
                
                keyWords:{
                    secName:''
                }
            }
        }
    },
    methods:{
        async afterRead(file){
            console.log(file)
            const fromdata = new FormData()
            fromdata.append("file",file.file)
            console.log(fromdata)
            console.log(axios)
            const res = await axios.post("http://112.74.99.5:3000/web/api/upload",fromdata)
            console.log(res)
            this.model.form.photo  = res.data.url
        },
        async otherafterRead(file){
            console.log(file)
            const fromdata = new FormData()
            fromdata.append("file",file.file)
            console.log(fromdata)
            console.log(axios)
            const res = await axios.post("http://112.74.99.5:3000/web/api/upload",fromdata)
            console.log(res)
            this.model.form1.photo  = res.data.url
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
           
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        async newsUpdate(){
            let res = await this.$http.post('/newsUpdate',this.model.form)
            this.model.dialogFormVisible = false
        },
        async newsDelete(){
            let res = await this.$http.post('/newsDelete',this.model.form)
            this.model.dialogVisible = false
        },
        async newsInsert(){
            let res = await this.$http.post('/newsInsert',this.model.form1)
            this.model.dialogFormVisible1 = false
            location.reload()
        },
        async newsFind(){
            let res = await this.$http.post('/newsFind',this.model.keyWords)
            this.model.findList = res.data.data
            console.log(this.model.findList)
        },
        getDetails(row){
            this.model.form = row
        },
        reload(){
            location.reload()
        }
        
    },
    async created(){
        let res = await this.$http.get('/mainContent')
        this.model.newsList = res.data.data
        //console.log(this.model.newsList)
        this.model.listLength = this.model.newsList.length
        //this.model.tableList = res.data.data
        //this.model.listLength = this.model.tableList.length
        //console.log(this.model.tableList)
        //console.log(this.model.tableList.length)

    }
}

</script>
<style lang='less' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    margin:50px;
    margin-top:0;
    width: 100px;
    height: 100px;
    display: block;
  }
  .uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        position: absolute;
        opacity: 0;
        
    }
}
  
</style>