<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="checklist">
            审核列表
            <div class="radios">
                <el-radio-group v-model="radio">
                    <el-radio :label="1">待审核 </el-radio>
                    <el-radio :label="2">审核通过 </el-radio>
                    <el-radio :label="3">审核未通过 </el-radio>
                </el-radio-group>

            </div>
        </div>
        <div>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="seachKey">
                    </el-input>
                </el-col>
                <el-col :span="18">
                    <div class="block">
                        <span class="demonstration">发布时间</span>
                        <el-date-picker class="elDate" v-model="startTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                        --

                        <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                        <el-button class="seachdate" @click="seach">查询</el-button>
                    </div>
                    <template>
                        <div class="rightSlects">
                            <el-select v-model="schoolName" @change="getGrade" class="elInput" placeholder="请选择">
                                <el-option v-for="item in schoolOptions" :key="item.id" :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>

                            <el-select v-model="gradeName" @change="getClass" collapse-tags class="elInput"
                                style="margin-left: 20px;" placeholder="请选择">
                                <el-option v-for="item in gradeOptions" :key="item.value" :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="className" collapse-tags class="elInput" style="margin-left: 20px;"
                                placeholder="请选择">
                                <el-option v-for="item in classOptions" :key="item.title" :label="item.title"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button class="seachdate" @click="seach">筛选</el-button>

                        </div>

                    </template>
                </el-col>
            </el-row>
        </div>
        <el-tab-pane label="班级空间" name="classData">

            <template>
                <el-table :data="classData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'1'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                    :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="年级空间" name="gradeData">

            <template>
                <el-table :data="gradeData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'1'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                    :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="社团空间" name="team">

            <template>
                <el-table :data="teamData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'2'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                    :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="专题空间" name="space">

            <template>
                <el-table :data="spaceData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'3'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                    :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="课题空间" name="keti">

            <template>
                <el-table :data="ketiData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'4'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                    :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="教研空间" name="teaching">

            <template>
                <el-table :data="teachingData" style="width: 100%" class="tableTh">
                    <el-table-column prop="image" label="发布封面" width="180">
                        <template slot-scope="scope">
                            <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="发布日期" width="180">
                    </el-table-column>
                    <el-table-column prop="column_name" label="发布主题">
                    </el-table-column>
                    <el-table-column prop="content" label="发布内容">
                    </el-table-column>
                    <el-table-column prop="name" label="发布人">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <span>
                                <router-link :to="{path :'/space/item',query:{id:scope.row.id,type:'4'}}"> 查看</router-link>
                            </span> <span>修改</span><span @click="deleteArt(scope.id)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-tab-pane>
    </el-tabs>

</template>
<script>
    import request from '@/api/request.js';
    export default {
        data() {
            return {
                url: '/backapi/Management/newClass',
                teaching: [],
                schoolName: '',
                gradeName: '',
                className: '',//班级名称
                radio: 1,//1待审核2审核通过3审核未通过
                classData: [],
                gradeData: [],
                gradeData: [],
                teamData: [],
                psize:20,
                teachingData: [],
                spaceData: [],
                ketiData: [],
                currentPage1: 1,
                school: '1',//学校名称
                gradeData: [],//年级名称
                gradsList: [],
                schoolOptions: [],
                gradeOptions: [],
                classOptions: { id: 'all', title: '全部' },
                classTableData: [],//班级空间数据
                seachKey: '3',
                startTime: '4',
                endTime: '5',
                activeName: 'classData',
                fit: 'fill',
                tableData: [

                ],
                total:0,
            };
        },
        mounted() {
            var url = "/backapi/Management/newClass";
            this.getArticles(url, 'classData');
            this.getSchools();
        },
        methods: {
            classHandleChange(size) {
                console.log(size)
                var data = {
                    page: size
                }
                request.post('/backapi/Management/newClass', data, (res) => {
                    this.classTableData = res.data.model;
                    this.total=res.data.total;
                })
            },
            getSchools() {
                let url = "/backapi/Statistical/sgb";
                request.post(url, {}, (res) => {
                    res.data.unshift({ title: '全部', id: 'all' })
                    this.schoolOptions = res.data;
                })
            },
            getGrade(tab) {
                console.log(tab)
                if (tab == 'all') {
                    this.gradeOptions = [{ title: '全部', id: 'all', class: [{ id: 'all', title: '全部' }] }];
                    this.gradeName = "全部";
                    this.className = "全部";
                } else {
                    this.schoolOptions.forEach(element => {
                        if (element.id == tab) {
                            this.gradeOptions = element.grade;
                        }
                    });
                }

            },
            getClass(tab) {
                console.log(tab);
                if (tab == 'all' || '') {

                } else {
                    this.gradeOptions.forEach(element => {
                        if (element.id == tab) {
                            this.classOptions = element.class;
                        }
                    });
                }

            },
            seach() {
                var data = {
                    type:this.radio,//申核狀態
                    strtime: '',
                    endtime: '',
                    page: 1,
                    s_id:this.schoolName,
                    c_id:this.className,
                    psize: 20
                }
                request.post(this.url, data, (res) => {

                })
            },
            deleteArt(res) {

            },
            handleSizeChange(size) {

            },

            handleClick(tab, event) {
                console.log(tab, event);
                var url = "";
                switch (tab.name) {
                    case 'classData':
                        url = "/backapi/Management/newClass";
                        break;
                    case 'gradeData':
                        url = "/backapi/Management/newGrade";
                        break;
                    case 'teamData':
                        url = "/backapi/Management/newProject";
                        break;
                    case 'spaceData':
                        url = "/backapi/Management/newProject";
                        break;
                    case 'ketiData':
                        url = "/backapi/Management/newProject";
                        break;
                    case 'teachingData':
                        url = "/backapi/Management/newProject";
                        break;
                }
                this.getArticles(url, tab.name);
            },
            getArticles(url, key) {

                let data = {};
                request.post(url, data, (res) => {
                    res.data.model = [
                        {
                            "id": 11,
                            "s_id": 1,
                            "c_id": 1,
                            "columns": 1,
                            "column_name": "栏目",
                            "u_id": 1,
                            "name": "123",
                            "avatar": "http://git.i2f2f.com/images/icon/20191111/813aa473c84da8a0e698a56a91d472f3.jpg",
                            "level": 2,
                            "type": 1,
                            "title": "添加1",
                            "image": "",
                            "content": "财经栏目2",
                            "create_time": "2019-11-13 15:49:44"
                        }
                    ];
                    this[key] = res.data.model;
                })
            },
        }
    }
</script>
<style scoped>
    .radios {
        margin-top: 30px;
    }

    .checklist {
        margin-bottom: 30px;
    }

    .mainContainer {
        background: #fff;
    }

    .el-pagination {
        text-align: center;
        margin-top: 40px;
    }

    .rightSlects {
        position: absolute;
        top: 0px;
        right: 20px;

    }

    .elInput {
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