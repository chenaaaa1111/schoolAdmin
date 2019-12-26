<!-- 編輯審核中還沒做 -->
<!-- 空間管理那裡好好問問 -->
<template>
    <div>
        <el-header>
            <el-breadcrumb separator="/" class="elbreadCrumb">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>

            </el-breadcrumb>
        </el-header>

        <el-button v-show="showCheck" @click="showEdit=true">编辑申核</el-button>

        <h3>{{info?info.title:''}}</h3>
        <div class="message">发布于 ：{{info.create_time}}<span></span></div>
        <div>
            <!-- <div  class="imgDiv" :style="{backgroundImage:url('"+info.avatar+"')}">
                 </div> -->
            <el-image class="imgDiv"  :src="info.avatar" ></el-image>
            <span style="vertical-align: middle;">{{info.name}}</span>
        </div>
        <div v-html="info.content" style="margin-top: 10px;">
        </div>
        <div v-show="showEdit" class="bottomButtons">
            <el-button @click="isPass('3')">
                未通过
            </el-button>
            <el-button type="primary" @click.native="isPass('2')" >通过并发布</el-button>
        </div>
    </div>


</template>
<script>
    import request from '@/api/request.js'
    export default {
        data() {
            return {
                type:'0',
                info: {},
                selectId:'',
                imgDivStyle: {

                },
                checkUrl:'',
                showCheck:false,
                showEdit:false
            }
        },
        components: {

        },
        methods:{
            isPass(type){
                console.log(123,this.checkUrl)
                request.post(this.checkUrl,{id:this.selectId,type:type},(res)=>{
                    if(res.code==0){
                        this.$message.success('操作成功')
                        this.$router.go(-1);
                        this.showEdit=false;
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        },
        mounted() {
            console.log(this.$router);
            var query = this.$router.query ? this.$router.query : this.$router.currentRoute.query;
            var url = '';
            this.selectId=query.id;
            this.showCheck=query.showCheck=='true';
            var data = { id: query.id };
            this.checkUrl=query.url;
            debugger
            switch (query.type) {
                case '1':
                    url = "/backapi/Statistical/detailsClass";
                    break;
                case '2':
                    url = "/backapi/Statistical/detailsClass";//社團       
                    break;
                case '3':
                    url = "/backapi/Statistical/detailsProject";   //專題
                    break;
                case '4':
                    url = "/backapi/Statistical/detailsTeaching";     //教研  
                    break;

            }
            request.post(url, data, (res) => {
                this.info = res.data;
            })
            console.log(this.$router.query ? this.$router.query.id : this.$router.currentRoute.query.id);
        }
    }
</script>
<style scoped>
    .el-header {
        padding-left: 0;
    }
    .bottomButtons{
        border-top: 1px solid #e8e8e8;
        height: 50px ;
        line-height: 50px;
        margin-top: 20px;
        /* text-align: right; */
        padding-right: 30px;
    }
    .imgDiv {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background: url('~@/assets/images/special.png') no-repeat center center;
        display: inline-block;
        vertical-align: middle;
        margin-right: 20px;
    }

    .message {
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;
    }

    .el-main {
        padding-left: 20px;
    }
</style>