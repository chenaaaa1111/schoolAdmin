<template>
    <div class="Spaces">
        <el-container>
            <el-header>
                <el-breadcrumb separator="/" class="elbreadCrumb">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>查看全部</el-breadcrumb-item>
                  
                </el-breadcrumb>
            </el-header>
            <el-container class="mainContainer">
                <el-main>
                    <!-- <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="班级空间" name="class">
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-date"
                                                v-model="seachKey">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" v-model="startTime" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="school" class="elInput" multiple
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolOptions" :key="item.value"
                                                            :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select v-model="grade" multiple collapse-tags class="elInput"
                                                        style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in gradeOptions" :key="item.value"
                                                            :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="className" multiple collapse-tags
                                                        class="elInput" style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in classOptions" :key="item.value"
                                                            :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                                <template>
                                    <el-table :data="tableData" style="width: 100%" class="tableTh">
                                        <el-table-column prop="date" label="发布封面" width="180">
                                        </el-table-column>
                                        <el-table-column prop="name" label="发布日期" width="180">
                                        </el-table-column>
                                        <el-table-column prop="address" label="发布主题">
                                        </el-table-column>
                                        <el-table-column prop="address" label="发布内容">
                                        </el-table-column>
                                        <el-table-column prop="address" label="发布人">
                                        </el-table-column>
                                        <el-table-column prop="address" label="操作">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="年级空间" name="grade">配置管理</el-tab-pane>
                            <el-tab-pane label="社团空间" name="jiaose">角色管理</el-tab-pane>
                            <el-tab-pane label="专题空间" name="space">专题空间</el-tab-pane>
                            <el-tab-pane label="课题空间" name="keti">课题空间</el-tab-pane>
                            <el-tab-pane label="教研空间" name="teaching">教研空间</el-tab-pane>
                        </el-tabs>
                    </template> -->
                    <MainTabContent>

                    </MainTabContent>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>
<script>
    // import MainTabContent from "./components/MainContent.vue"
    import MainTabContent from "@/components/MainTabContent.vue"
    export default {
        data() {
            return {
                school: '',//学校名称
                grade: '',//年级名称
                className: 'class',//班级名称
                activeName: 'second',
                schoolOptions: [],
                gradeOptions: [],
                classOptions: [],
                seachKey: '',
                startTime: '',

                endTime: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            seach(key) {
                //搜索
                console.log(this.startTime, this.endTime)
            }
        },
        components:{
             MainTabContent
        }
    }
</script>
<style scoped>
    .mainContainer {
        background: #fff;
    }

    .rightSlects {
        position: absolute;
        top: 0px;
        right: 20px;

    }
    .elInput{
        width: 106px;
    }
    .tableTh {
        margin-top: 30px;
    }

    .tableTh th {
        background: rgba(241, 241, 241, 1);
    }

    .demonstration {
        margin-right: 10px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner.elDate {
        width: 120px;
    }

    .seachdate {
        background: #0A4B95FF;
        color: #fff;
        margin-left: 10px;
    }

    .elbreadCrumb {
        height: 50px;
        line-height: 50px;
        background: #fff;
        padding-left: 30px;
    }
</style>