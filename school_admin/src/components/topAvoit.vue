<template>
    <div>
        <div v-show="!hasUser">
            <el-button class="rigibt" @click="gonext('regist')">注册</el-button>
            <el-button class="loginbt" @click="gonext('login')">登录</el-button>
        </div>
        <div v-show="hasUser">
            <el-dropdown trigger="click" @visible-change="visibleChange">
                <span class="el-dropdown-link">
                    <el-avatar style="vertical-align: middle;" shape="circle" :size="48"
                        :src="userInfo?userInfo.avatar:''"></el-avatar>
                    <!-- <span style="vertical-align: middle;" v-if="!visible" class="userName">{{userInfo.name}}</span> -->
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-custom">{{userInfo.name}}</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close" @click.native="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>
<script>
    export default {
        data: function () {
            return {
                hasLogin: this.hasLogin,
                visible: false,
                userInfo: {},
                hasUser: false
            }
        },
        methods: {
            visibleChange(val) {
                this.visible = val
            },
            loginout() {
                sessionStorage.setItem('Authorization', '');
                sessionStorage.setItem('userInfo', '');
                this.getUserInfo();
                this.$router.push("/login");
                this.hasUser = false;
            },
            gonext(name) {
                this.$router.push({ name: name });
            },
            getUserInfo() {


            },
        },
        mounted: function () {
            var userInfo = sessionStorage.getItem('userInfo');
            if (userInfo && JSON.stringify(userInfo) != '{}') {
                this.userInfo = JSON.parse(userInfo);
                this.hasUser = true;
            }
            console.log(this.$router.currentRoute.fullPath, 'this.router');

        },


    }
</script>
<style scoped>
    .avator[data-v-fae5bece] {
        /* width: 32px; */
        height: 32px;
        border-radius: 50%;
        background: url(/img/logo.82b9c7a5.png) no-repeat center center;
        position: absolute;
        top: -3px;
        right: 44px;
    }

    .rigibt {
        width: 88px;
        height: 40px;
        padding: 0 0;
        line-height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(3, 70, 146, 1);
        color: #034692;
    }

    .loginbt {
        width: 88px;
        height: 40px;
        padding: 0 0;
        line-height: 40px;
        background: #034692;
        border-radius: 4px;
        border: 1px solid rgba(3, 70, 146, 1);
        color: #fff;
    }
</style>