<template>
  <!-- 这是首页 -->
  <div class="home">
    <el-container>
      <el-header>
        <div class="homehead">
          <img src="" alt=""> <span> 华悦蜀山区第一中学空间管理后台</span>
          <div class="avator">
            <!-- <img  src="@/assets/logo.png"> -->
          </div>
        </div>
      </el-header>
    </el-container>
    <el-container>
      <el-aside class="leftBar" width="140px">

        <el-menu :default-active="active" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#034692FF" text-color="#6FA5E3FF" active-text-color="#fff"
          :collapse="isCollapse">
          <el-menu-item index="index">
            <i class="el-icon-s-home"></i>
            <span slot="title">查询与统计</span>
          </el-menu-item>
          <el-menu-item index="usersManager">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="articleManager">
            <i class="el-icon-setting"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
         
          <el-menu-item index="revieweManager">
            <i class="el-icon-suitcase"></i>
            <span slot="title">文章审核</span>
          </el-menu-item>
          <el-menu-item index="classifyManager">
            <i class="el-icon-suitcase"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>

      </el-container>

    </el-container>


  </div>
</template>
<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      // HelloWorld
    },
    data() {
      return {
        isCollapse: false,
        active: 'index'
      }
    },
    methods: {
      selectMenu(key, value) {
        console.log(key, value)
        if (this.active != key) {
          this.$router.push({ name: key })
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

    }
  }
</script>
<style>
  /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
</style>
<style scoped>
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

  .avator {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: url(/img/logo.82b9c7a5.png) no-repeat center center;
    position: absolute;
    top: 36px;
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