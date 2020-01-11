<template>
  <!-- 这是首页 -->
  <div class="home">
    <el-container>
      <el-header>
        <div class="homehead">
          <img src="../assets/images/logo.png" class="logo" alt="logo">
          <div class="avator">
            <topAvoit></topAvoit>
          </div>
        </div>
      </el-header>
    </el-container>
    <el-container>
      <el-aside class="leftBar" width="140px">

        <el-menu :default-active="active" router class="el-menu-vertical-demo" @select="selectKey" @open="handleOpen"
          @close="handleClose" background-color="#034692FF" text-color="#6FA5E3FF" active-text-color="#fff"
          :collapse="isCollapse">
          <el-menu-item index="index" v-show="userInfo.level!=3">
            <div style="text-align: center;line-height: 30px;height: 30px;">
              <i class="iconfont home_icon">&#xe607;</i>
            </div>
            <div style="height: 20px;line-height: 20px;text-align: center;font-size: 12px;">
              <span slot="title">查询与统计</span>
            </div>

          </el-menu-item>
          <el-menu-item index="usersManager" v-show="userInfo.level!=3">
            <div style="text-align: center;line-height: 30px;height: 30px;">
              <i class="iconfont home_icon">&#xe60f;</i>
            </div>
            <div style="height: 20px;line-height: 20px;text-align: center;font-size: 12px;">
              <span slot="title">用户管理</span>
            </div>


          </el-menu-item>
          <el-menu-item index="articleManager" v-show="userInfo.level!=3">
            <div style="text-align: center;line-height: 30px;height: 30px;">
              <i class="iconfont home_icon">&#xe624;</i>
            </div>
            <div style="height: 20px;line-height: 20px;text-align: center;font-size: 12px;">
              <span slot="title">文章管理</span>
            </div>


          </el-menu-item>

          <el-menu-item index="revieweManager">
            <div style="text-align: center;line-height: 30px;height: 30px;">
              <i class="iconfont home_icon">&#xe715;</i>
            </div>
            <div style="height: 20px;line-height: 20px;text-align: center;font-size: 12px;">
              <span slot="title">文章审核</span>
            </div>


          </el-menu-item>
          <el-menu-item index="classifyManager" v-show="userInfo.level!=3">
            <div style="text-align: center;line-height: 30px;height: 30px;">
              <i class="iconfont home_icon">&#xe612;</i>
            </div>
            <div style="height: 20px;line-height: 20px;text-align: center;font-size: 12px;">
              <span slot="title">分类管理</span>
            </div>


          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view @changeTab="selectKey" />
        </el-main>

      </el-container>

    </el-container>


  </div>
</template>
<script>
  // @ is an alias to /src
  import topAvoit from '@/components/topAvoit.vue';
  import request from '@/api/request.js';
  export default {
    name: 'home',
    components: {
      topAvoit
    },
    data() {
      return {
        userInfo: {},
        isCollapse: false,
        active: 'index'
      }
    },
    methods: {
      selectKey(key) {
        console.log('selectKey' + key);
        this.selectMenu(key);
      },
      changeTab(key) {
        this.selectMenu(key);
      },
      selectMenu(key, value) {
        console.log(key, value)
        if (this.active != key) {
          this.$router.push({ name: key })
          this.active = key;
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
      console.log(location.hash.split('/')[2], 'hash');
      this.active = location.hash.split('/')[2];
      this.userInfo = this.getUserInfo();
      // this.$getUserInfo().level;
      var data = { id: this.userInfo.id }
      request.post('/backapi/Users/Details', data, (res) => {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data));
        this.$userInfo = res.data;
        if (res.data.level != 3) {
          self.$router.push('/')
        } else {
          self.$router.push('/home/revieweManager')
        }
      })
    }
  }
</script>
<style>
  /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
</style>
<style>
  /* 阿里图标库 */
  @font-face {
    font-family: 'iconfont';
    /* project id 1607641 */
    src: url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.eot');
    src: url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.woff2') format('woff2'),
      url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.woff') format('woff'),
      url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_1607641_c9lfnvyiosk.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 8px;
    /* margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle; */
  }

  .el-menu-item i.home_icon {
    color: #6FA5E3;
    font-size: 25px;
    margin-right: 0;
  }

  .el-dialog__wrapper .el-dialog {
    border-radius: 8px 8px 0px 0px;
  }

  .el-dialog__header {
    background: #C8D8F1;
    border-radius: 8px 8px 0px 0px;
  }
</style>
<style scoped>
  .el-menu-item {
    margin-bottom: 20px;
  }

  .el-menu-item,
  .el-submenu__title {
    height: 50px;
  }

  .menuTitle {
    /* display: block;
    text-align: center; */
  }

  .el-menu {
    background: #034692FF;
  }

  .icons {
    text-align: center;
    font-size: 30px;
  }

  .icons p {
    text-align: center;
    font-size: 10px;
    margin-top: 0;
  }

  .el-aside.leftBar {
    background: #034692FF;
    padding-top: 30px;
  }

  body {
    background: rgba(246, 246, 246, 1);
  }

  .el-aside {
    padding: 0;
  }

  #app .el-header {
    padding: 0 0;
  }

  .homehead {
    background: #fff;
    line-height: 60px;
    color: #347BECFF;
    font-size: 22px;
  }

  .homehead span,
  .homehead img {
    vertical-align: middle;
  }

  .logo {
    height: 45px;
    margin-left: 70px;
  }

  .avator {

    border-radius: 50%;
    background: url(/img/logo.82b9c7a5.png) no-repeat center center;
    position: absolute;
    top: -3px;
    right: 44px;
  }

  .wrap {
    width: 1920px;
    margin: 0 auto;
    clear: both;
    overflow: hidden;
  }

  .aside {
    float: left;
    width: 90px;
    background: rgba(3, 70, 146, 1);
    margin-right: 24px;
  }

  .container {
    float: left;
  }
</style>