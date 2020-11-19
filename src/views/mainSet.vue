<template>
  <div>
    <div class="setHeader">
      <van-nav-bar title="设置" />
    </div>
    <div class="mainContent">
      <van-cell
        is-link
        title="账号管理"
        style="padding:20px"
        @click="loginDialog"
      />

      <van-cell
        is-link
        title="通用"
        style="padding:20px"
        @click="settingDialog()"
      />

      <van-cell
        is-link
        title="关于应用"
        style="padding:20px"
        @click="appDialog"
      />
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import tabbar from "../components/tabbar";
export default {
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      model: {
        menberId: "",
      },
    };
  },
  components: {
    tabbar,
  },
  methods: {
    settingDialog() {
      Dialog.confirm({
        title: "你好",
        message: "是否切换图片模式",
        beforeClose,
      })
        .then(() => {
          //console.log(this.$store.state.isPicture);
          this.$store.state.isPicture = !this.$store.state.isPicture;
          //console.log(this.$store.state.isPicture);
        })
        .catch(() => {});
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    },
    appDialog() {
      Dialog.confirm({
        title: "基于Vue+express开发的Web移动端",
        message: "是否跳转至后台管理界面",
        beforeClose,
      })
        .then(() => {
          window.open("http://localhost:8081/");
        })
        .catch(() => {});
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    },
    loginDialog() {
      Dialog.confirm({
        title: "是否退出登录",

        beforeClose,
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {});
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    },
  },
  async created() {
    this.model.menberId = localStorage.getItem("id");
    //console.log(this.model.menberId);
  },
};
</script>
<style lang="less" scoped>
.setHeader {
  margin-bottom: 20px;
}

.content {
  padding: 1rem 1rem 10rem;
}
.quit {
  margin-top: 50px;
  text-align: center;
  cursor: pointer;
}
#isPicture {
  display: flex;
  span:nth-child(1) {
    margin: 0 25%;
  }
}
</style>
