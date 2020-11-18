<template>
  <div>
        <el-breadcrumb style="margin-bottom:15px" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/menber/set' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      <el-form ref="form" style="background:#ddd"  label-width="40px">
        <el-form-item style="margin-left:10px" label="查询">
            <el-input
                placeholder="用户名"
                size="small"
                style="width: 140px"
                v-model="model.keyWords.secName"
                clearable>
            </el-input>
            <el-button style="margin-left:13px" @click="userFind()" icon="el-icon-search" circle></el-button>
            <el-button style="margin-left:740px" @click="reload()"><i class="el-icon-refresh"></i></el-button>
        </el-form-item>
      </el-form>
        <el-form ref="form" style="background:#ddd"  label-width="10px">
        <el-form-item>
            <el-button type="danger">批量删除</el-button>
            <el-button @click="model.dialogFormVisible1 = true" type="primary">+新增</el-button>
            <span v-if="model.findList ==''" style="margin-left:760px">共有数据:{{model.listLength}}条</span>
            <span v-else style="margin-left:760px">共有数据:{{model.findList.length}}条</span>
        </el-form-item>
      </el-form>
      <el-table
      v-show="model.findList == '' "
      :data="model.tableList"
      style="width: 100%"
      @row-click="getDetails"
      
      >
      <el-table-column
        prop="id"
        label="用户id"
        width="125">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="账号"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="password"
        label="密码"
        width="125">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="125">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="125">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="img"
        label="头像"
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
      v-show="model.findList != '' "
      :data="model.findList"
      style="width: 100%"
      @row-click="getDetails"
      
      >
      <el-table-column
        prop="id"
        label="用户id"
        width="125">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="账号"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="password"
        label="密码"
        width="125">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="125">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="125">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="125">
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="img"
        label="头像"
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
        <el-form-item label="账号" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="model.formLabelWidth">
        <el-input v-model="model.form.age" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item style="margin-left:80px" label="性别">
            <el-radio-group v-model="model.form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="头像"  :label-width="model.formLabelWidth">
            <div class="uploadfile">
              <van-uploader class="uploadimg" preview-size="100vw"   result-type="file"   :after-read="afterRead"></van-uploader>
              <img  v-if="model.form.img" style="width:100px" :src="model.form.img">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="model.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userUpdate()">确 定</el-button>
    </div>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="model.dialogFormVisible1">
    <el-form :model="model.form1">
        <el-form-item label="账号" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="model.formLabelWidth">
        <el-input v-model="model.form1.age" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item style="margin-left:80px" label="性别">
            <el-radio-group v-model="model.form1.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="头像"  :label-width="model.formLabelWidth">
            <div class="uploadfile">
              <van-uploader class="uploadimg" preview-size="100vw"   result-type="file"   :after-read="otherafterRead"></van-uploader>
              <img  v-if="model.form1.img" style="width:100px" :src="model.form1.img">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="model.dialogFormVisible1 = false;model.form1.img = ''">取 消</el-button>
        <el-button type="primary" @click="userInsert()">确 定</el-button>
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
        <el-button type="primary" @click="userDelete()">确 定</el-button>
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
                tableList:[],
                findList:[],
                listLength:"",
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogVisible:false,
                form: {
                id:'',
                username: '',
                password:'',
                nickname: '',
                age:null,
                sex: '男',
                img:'',
                },
                form1: {
                id:'',
                username: '',
                password:'',
                nickname: '',
                age:null,
                sex: '男',
                img:'',
                },
                formLabelWidth: '120px',
                keyWords:{
                  secName:""
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
            this.model.form.img  = res.data.url
        },
        async otherafterRead(file){
            console.log(file)
            const fromdata = new FormData()
            fromdata.append("file",file.file)
            console.log(fromdata)
            console.log(axios)
            const res = await axios.post("http://112.74.99.5:3000/web/api/upload",fromdata)
            console.log(res)
            this.model.form1.img  = res.data.url
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
        async userUpdate(){
            let res = await this.$http.post('/users/userUpdate',this.model.form)
            this.model.dialogFormVisible = false
        },
        async userDelete(){
            let res = await this.$http.post('/users/userDelete',this.model.form)
            this.model.dialogVisible = false
        },
        async userInsert(){
            let res = await this.$http.post('/users/userInsert',this.model.form1)
            this.model.dialogFormVisible1 = false
            location.reload()
        },
        async userFind(){
            let res = await this.$http.post('/users/userFind',this.model.keyWords)
            //console.log(res)
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
        let res = await this.$http.get('/users/userTable')
        //console.log(res)
        this.model.tableList = res.data.data
        this.model.listLength = this.model.tableList.length
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