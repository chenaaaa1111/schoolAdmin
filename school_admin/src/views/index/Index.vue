<template>
    <div class="homeIndex">
        <ul class="cardsList">
            <li class="tabspaces">
                <p class="num">{{numInfos.news}}</p>
                <p class="homemessage"> 发布新闻数</p>
                <img src="~@/assets/images/classs.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">{{numInfos.notice}}</p>
                <p class="homemessage"> 发布信息数</p>
                <img src="~@/assets/images/team.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">{{numInfos.project}}</p>
                <p class="homemessage">发布专题数</p>
                <img src="~@/assets/images/special.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">{{numInfos.subject}}</p>
                <p class="homemessage"> 发布课题数</p>
                <img src="~@/assets/images/teaching.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">{{numInfos.teaching}}</p>
                <p class="homemessage"> 发布教研数</p>
                <img src="~@/assets/images/topic.png" class="img_icon_space" alt="">
            </li>
        </ul>
        <div class="RankingCard">
            <div style="position: relative;">
                <template>
                    <span>发布数量排行榜</span>
                    <el-select v-model="rangsKey" @change="changeSelect" class="Risking" label="发布数量排行榜" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div class="right"><span @click="getDate('1')" :class="date==1?'active':''">今天</span><span @click="getDate('2')" :class="date==2?'active':''">本周</span>
                    <span @click="getDate('3')" :class="date==3?'active':''">本月</span><span @click="getDate('4')" :class="date==4?'active':''">全年</span></div>
            </div>
            <div class="rangsList">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="border" >
                            <div class="infoItem" v-for="(item,index) in classListWest  " :key="index">
                                <span :class="index+1>3?'num_icon gray_bg' :'num_icon'">{{index+1}}</span><span>{{item.class?item.class.title:''}}</span><span class="rightNum">{{item.num}}</span>                         
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="border">
                            <div class="infoItem"  v-for="(item,index) in  classListEast" :key="index">
                                <span :class="index+1>3?'num_icon gray_bg' :'num_icon'">{{index+1}}</span><span>{{item.class?item.class.title:''}}</span><span class="rightNum">{{item.num}}</span>
                               
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="border">
                            <div class="infoItem"  v-for="(item,index) in  classListSourth" :key="index">
                                <span :class="index+1>3?'num_icon gray_bg' :'num_icon'">{{index+1}}</span><span>{{item.class?item.class.title:''}}</span><span class="rightNum">{{item.num}}</span>
                                <span>1</span><span>2018级9班</span><span>11</span>
                            </div>
                         

                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" style="text-align: center;" class="schoolClass">西区</el-col>
                    <el-col :span="8" class="schoolClass">东区</el-col>
                    <el-col :span="8" class="schoolClass">南区</el-col>
                </el-row>
            </div>
        </div>
        <div class="RankingCard">
            <div style="position: relative;">
                <span>最新发布</span> 
                <template>
                    <span></span>
                    <el-select v-model="newestKey" @change="getNewst" class="Risking" label="最新发布" placeholder="请选择">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div class="right" @click="changeTabChilder('articleManager')" > 查看全部 </div>
            </div>
            <div class="rangsList">
                <el-row>
                    <el-col :span="6" class="six" v-for="(item,index) in articleList" :key="index">
                        <h6>{{item.title}}</h6>
                        <div class="dycontent">
                            {{item.content&&item.content.match(/[\u4e00-\u9fa5]/g)?item.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,30)+'...':''}}

                        </div>
                        <div class="ownerInfo">
                            <el-image :src="Imgsrc" class="avotorImg"></el-image>
                            <span class="demonstration">{{item.name}}</span>
                            <span class="right time gray">{{item.create_time}}</span>
                        </div>
                    </el-col>
                   
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import request from '@/api/request.js'
    export default {
        data() {
            return {
                numInfos:{},
                type:'1',//年月日周
                date:'1',//年月周日
                select:'',//班级年级或者课题等
                imgs: {
                    class: '~@/assets/images/classs.png'
                },
                Imgsrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                rangsKey: '1',
                newestKey: '1',
                classListEast:[],//班级列表
                classListWest:[],
                classListSourth:[],
               schoolList:[],//校区列表
                articleList:[],//最新文章列表
                options: [
                    {
                        value: '1',
                        label: '班级'
                    }, {
                        value: '2',
                        label: '年级'
                    }, {
                        value: '3',
                        label: '社团'
                    }, {
                        value: '4',
                        label: '专题'
                    }, {
                        value: '5',
                        label: '课题'
                    },
                    {
                        value: '6',
                        label: '教研'
                    }
                ]
            }
        },
        mounted() {
            //获取统计数字
            
            request.post('/backapi/Statistical/num',{},(res)=>{
                console.log(res);
                this.numInfos=res.data;
            })
            this.getSchools();//获取校区
            this.getNewst('1');
            this.changeSelect('1');
        },
        methods: {
            changeTabChilder(item){
                console.log(123)
                this.$emit('changeTab',item);
            },
            goToAll(id){
                this.$router.push({url:'/home/spaces'})

            },
            getSchools(id){
                request.post('/backapi/Statistical/school',{},(res)=>{
                    console.log(res);
                    this.schoolList=res.data;
                })
            },
            getNewst(type){
                var url="";
                switch(type){
                    case '1':
                        this.newestKey=type;
                     url="/backapi/Statistical/newClass";
                        break;
                        case '2':
                    url="/backapi/Statistical/newGrade";
                    this.newestKey=type;
                        break;
                        case '3':
                    url="/backapi/Statistical/newCommunity"
                        break;
                        case '4':
                    url="/backapi/Statistical/newProject"   
                    this.newestKey=type;    
                        break;
                        case '5':
                    url="/backapi/Statistical/newSubject";
                    this.newestKey=type;
                        break;
                        case '6':
                    url="/backapi/Statistical/newTeaching";
                    this.newestKey=type;
                        break;
                    default: '';

                }
                var data={s_id:1,type:3,page:1,psize:12}
                request.post(url,data,(res)=>{
                    this.articleList=res.data.model;
                })
            },
            getDate(date){
                switch(date){
                    case '1':
                    this.date='1';
                    break;
                    case '2':
                    this.date='2';
                    break;
                    case '3':
                    this.date='3';
                    break;
                    case '4':
                    this.date='4';
                    break;
               
                }
                this.changeSelect(this.select);
            },
            changeSelect(ses){
                console.log(ses);
                var url="";
                
                switch(ses){
                    case '1':
                     url="/backapi/Statistical/numClass";
                     this.select='1';
                        break;
                        case '2':
                    url="/backapi/Statistical/numGrade";
                    this.select='2';
                        break;
                        case '3':
                    url="/backapi/Statistical/numCommunity";
                    this.select='3';
                        break;
                        case '4':
                    url="/backapi/Statistical/numProject"  
                    this.select='4';     
                        break;
                        case '5':
                    url="/backapi/Statistical/numSubject";
                    this.select='5';
                        break;
                        case '6':
                    url="/backapi/Statistical/numTeaching";
                    this.select='6';
                        break;
                    default: '';

                }
                var data={s_id:1,type:this.date}
                request.post(url,data,(res)=>{//东区
                    this.classListEast=res.data;
                });
                data={s_id:2,type:this.date}
                request.post(url,data,(res)=>{//西区
                    this.classListWest=res.data;
                })
                data={s_id:3,type:this.date}
                request.post(url,data,(res)=>{//南区
                    this.classListSourth=res.data;
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .schoolClass{
        text-align: center;
        margin-top: 20px;
    }
    .active{
        color:#034692FF;
    }
    .right span{
        margin-left: 10px;
    }
    .Risking{
        margin-left: 10px;
    }
    .homeIndex {
        .homemessage {
            font-size: 14px;
        }

        .dycontent {
            font-size: 12px;
        }

        .right {
            position: absolute;
            right: 20px;
            top: 10px;
        }
        .right.time{
            top: 0;
        }

        ul.cardsList {
            display: flex;
            justify-content: space-between;
        }
    }
    .RankingCard{
        box-shadow:0px 0px 10px 1px rgba(0,0,0,0.09);
        border-radius: 8px;
    }
    .ownerInfo{
        margin-top: 10px;
        position: relative;
        font-size: 12px;
    }
    .avotorImg {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 10px;
    }

    .userAvator {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        overflow: hidden;

    }

    .userAvator img {
        width: 28px;
        height: 28px;

    }

    .num_icon.gray_bg {
        background: rgba(210, 210, 210, 1);
    }

    h6 {
        font-size: 16px;
        margin: 0;
        color: #034692FF;
    }

    .rangsList {
        margin-top: 20px;
        font-size: 16px;
    }

    .rangsList .six {
        border-left: 1px solid rgba(0, 0, 0, 0.09);
        border-top: 1px solid rgba(0, 0, 0, 0.09);
        padding: 16px 20px 20px 16px;
        min-height: 130px;

    }

    .infoItem {
        margin-bottom: 20px;
        position: relative;
    }

    .rightNum {
        position: absolute;
        right: 30px;
        color: #999;
        top: 3px;
    }

    .border {
        border: 1px solid #ccc;
        padding-top: 10px;
        padding-left: 20px;
        border-radius: 4px;
        height: 260px;
    }

    .num_icon {
        background: #034692FF;
        color: #fff;
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        margin-right: 10px;
    }

    .RankingCard {
        background: #fff;
        margin-top: 24px;
        margin-bottom: 24px;
        padding: 20px 20px 40px 20px;
    }

    .tabspaces {
        width: 16.5%;
        background: #fff;
        padding: 10px 0 10px 30px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.09);
        border-radius: 8px;
        position: relative;
    }

    .img_icon_space {
        width: 24%;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .homeIndex {}
</style>