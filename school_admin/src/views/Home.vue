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
      <el-aside class="leftBar" width="90px">
        <ul>
          <li class="icons">
              <i class="el-icon-s-home"></i>
              <p>查询与统计</p>
          </li>
          <li class="icons">
              <i class="el-icon-setting"></i>
              <p>管理员管理</p>

          </li>
          <li class="icons">
              <i class="el-icon-s-custom"></i>
              <p>管理员管理</p>

          </li>
          <li class="icons">
              <i class="el-icon-suitcase"></i>
              <p>空间管理</p>
          </li>
        </ul>
      </el-aside>
      <el-container>
          <el-main>
              <router-view/>
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
    }
  }
</script>
<style>
  .icons{
    text-align: center;
    font-size: 30px;
  }
  .icons p{
    text-align: center;
    font-size: 10px;
    margin-top: 0;
  }
  .el-aside.leftBar{
    background: #034692FF;
    padding-top: 30px;
  }
  body{
    background:rgba(246,246,246,1);
      }
      .el-aside{
        padding: 0;
      }
      #app .el-header{
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