<template>
    <div class="homeIndex">
        <ul class="cardsList">
            <li class="tabspaces">
                <p class="num">899</p>
                <p class="homemessage"> 发布新闻数</p>
                <img src="~@/assets/images/classs.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">899</p>
                <p class="homemessage"> 发布信息数</p>
                <img src="~@/assets/images/team.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">899</p>
                <p class="homemessage"> 发布专题数</p>
                <img src="~@/assets/images/special.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">899</p>
                <p class="homemessage"> 发布课题数</p>
                <img src="~@/assets/images/teaching.png" class="img_icon_space" alt="">
            </li>
            <li class="tabspaces">
                <p class="num">899</p>
                <p class="homemessage"> 发布教研数</p>
                <img src="~@/assets/images/topic.png" class="img_icon_space" alt="">
            </li>
        </ul>
        <div class="RankingCard">
            <div style="position: relative;">
                <!-- <span>发布数量排行榜</span> <el-selecte ></el-selecte> -->
                <template>
                    <span>发布数量排行榜</span>
                    <el-select v-model="rangsKey" label="发布数量排行榜" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div class="right"><span>今天</span><span>本周</span><span>本月</span><span>全年</span></div>
            </div>
            <div class="rangsList">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="border">
                            <div class="infoItem">
                                <span class="num_icon">1</span><span>2018级9班</span><span>11</span>
                                <span>1</span><span>2018级9班</span><span class="rightNum">11</span>
                            </div>

                        </div>


                    </el-col>
                    <el-col :span="8">
                        <div class="border">
                            <div class="infoItem">
                                <span class="num_icon">1</span><span>2018级9班</span><span>11</span>
                                <span>1</span><span>2018级9班</span><span>11</span>
                            </div>
                            <div class="infoItem">
                                <span class="num_icon">1</span><span>2018级9班</span><span>11</span>
                                <span>1</span><span>2018级9班</span><span>11</span>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="border">
                            <div class="infoItem">
                                <span class="num_icon">1</span><span>2018级9班</span><span>11</span>
                                <span>1</span><span>2018级9班</span><span>11</span>
                            </div>
                            <div class="infoItem">
                                <span class="num_icon gray_bg">2</span><span>2018级9班</span><span>11</span>
                                <span>1</span><span>2018级9班</span><span>11</span>
                            </div>

                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="RankingCard">
            <div style="position: relative;">
                <!-- <span>发布数量排行榜</span> <el-selecte ></el-selecte> -->
                <template>
                    <span>发布数量排行榜</span>
                    <el-select v-model="newestKey" label="发布数量排行榜" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <div class="right">查看全部</div>
            </div>
            <div class="rangsList">
                <el-row>
                    <el-col :span="6" class="six">
                        <h6>关于美好的明天</h6>
                        <div class="dycontent">
                            美好的明天确实很美好，值得我们一起去期待，也许中间会有很多坎坷需要经历…
                        </div>
                        <div class="ownerInfo">
                            <el-image :src="Imgsrc" class="avotorImg"></el-image>
                            <span class="demonstration">柳子璇</span>
                            <span class="right time gray">2小时前</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="six">
                            <h6>关于美好的明天</h6>
                            <div class="dycontent">
                                美好的明天确实很美好，值得我们一起去期待，也许中间会有很多坎坷需要经历…
                            </div>
                            <div class="ownerInfo">
                                <el-image :src="Imgsrc" class="avotorImg"></el-image>
                                <span class="demonstration">柳子璇</span>
                                <span class="right time gray">2小时前</span>
                            </div>
                    </el-col>
                    <el-col :span="6" class="six">
                            <h6>关于美好的明天</h6>
                            <div class="dycontent">
                                美好的明天确实很美好，值得我们一起去期待，也许中间会有很多坎坷需要经历…
                            </div>
                            <div class="ownerInfo">
                                <el-image :src="Imgsrc" class="avotorImg"></el-image>
                                <span class="demonstration">柳子璇</span>
                                <span class="right time gray">2小时前</span>
                            </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgs: {
                    class: '~@/assets/images/classs.png'
                },
                Imgsrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                rangsKey: '',
                newestKey: '',
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ]
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style scoped lang="scss">
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