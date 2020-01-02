<template>
    <div class="login" :style="divstyle">
        <img src="./../../assets/images/lgbackground.png" style="visibility: hidden;max-width: 100%;max-height: 100%;">

        <div class="loginContent">
            <p class="tx_center">账号密码登录</p>
            <el-input v-model="mobile" placeholder="请输入手机号" style="margin-bottom: 20px;"></el-input>
                <el-input v-model="password" type="password" label="密码" placeholder="请输入密码" required />
         
            
            <el-button type="primary" class="submitLogin" @click="login"  >登录</el-button>
           

        </div>
    </div>
</template>
<style scoped>
     .login::after{content:'';display:block;clear:both;}
    .btMessage {
        font-size: 22px;
        text-align: center;
        margin-top: 30px;
    }
    .btMessage .btlink{
        cursor: pointer;
        color:  rgb(0, 0, 204);
    }
    .loginContent {
        width: 50%;
        height: 550px;
        /* background: #fff; */
        border-radius: 12px;
        position: absolute;
        left: 50%;
        top: 50%;
        padding: 42px 42px 42px 42px;
        box-sizing: border-box;
        padding-top: 42px;
        transform: translate(-50%, -50%);
    }
    .forgetPwd{
        padding: 5px 0;
        text-align: right;
        font-size: 14px;
        cursor:pointer;
    }
    .forgetPwd:hover{
        color:rgb(0, 0, 204);
    }
    .submitLogin{
        width: 100%;
        margin-top: 100px;
        background: #034692;
        color: #fff;
    }
    .tx_center{
        text-align: center;
        font-size:28px;
        margin-bottom: 100px;
    }

    @media screen and (max-width: 600px) {
        .loginContent {
            width: 95%;
        }
    }

    .login {
        background:  no-repeat center center;
        height: 100%;
        width: 100%;
        background-size: 100% 100%;
    }
</style>
<script>
    import request from '@/api/request.js';
    export default {
        data:()=>({
            mobile:'',
            password:'',
            divstyle:{
                backgroundImage:"url("+require('./../../assets/images/lgbackground.png')+")",
            }
        }),
        methods: {
            //验证手机号输入
            checkPhone(){
                if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
                    alert('手机号输入有误')
                    return false
                }else{
                    return true
                }
            },
            gotoRegist(){
                this.$router.push('/login/regist')
            },
            forgetPass(){
                this.$router.push('/login/forgotPWD')
            },
            login(){
                var self=this;
                if(this.mobile==''||this.mobile==undefined){
                    alert('请输入手机号');
                    return;
                }
                if(!self.checkPhone()){
                    return
                }
                if(this.password==''){
                    alert('请输入密码');
                    return;
                }
                var data={
                    mobile:this.mobile,
                    LoginPWD:this.password
                }
                request.post('/roomapi/Login/Loginpwd',data,function(res){
                        if(res.code==0){
                            sessionStorage.setItem('Authorization',res.data.token);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.user));
                            self.$router.push('/')
                    }else{
                        alert(res.message);
                    }
                })
            }
        }
    }

</script>
