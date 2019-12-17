<template>
    <div class="userNanager">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-row class="tabsTop">
                    <el-col :span="6">
                        <div style="margin-top: 15px;">
                            <el-input placeholder="请输入账号/名称" v-model="keyword" class="input">
                                <el-button id="seachIcon" slot="append" ref="seachButton" @click.native="seach"  icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <template>
                            <div class="rightSlects">
                                <el-select v-model="schoolName"  class="elInput"  @change="getGrade"  placeholder="请选择">
                                    <el-option v-for="item in schoolOptions" :key="item.id" :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>

                                <el-select v-model="gradeName" @change="getClass"   class="elInput"
                                    style="margin-left: 10px;" placeholder="请选择">
                                    <el-option v-for="item in gradeOptions" :key="item.id" :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="className"   class="elInput"
                                    style="margin-left: 10px;" placeholder="请选择">
                                    <el-option v-for="item in classOptions" :key="item.id" :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button class="seachdate" @click="seachButton">筛选</el-button>

                            </div>

                        </template>
                    </el-col>
                </el-row>
                <el-tab-pane label="学生账号管理" name="student">

                    <template>
                        <el-table :data="studentTableData" style="width: 100%">
                            <el-table-column prop="name" label="名称">
                            </el-table-column>
                            <el-table-column prop="mobile" label="注册账号">
                            </el-table-column>
                            <el-table-column prop="school.title" label="校区名称">
                            </el-table-column>
                            <el-table-column prop="Teaching.title" label="教研组">
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="stopUse(scope.row)" type="text" size="small">
                                        {{scope.row.status==2?'启用':'停用'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="教师账号管理" name="teacher">
                   
                    <template>
                        <el-table :data="teacherTableData" style="width: 100%">
                            <el-table-column prop="name" label="名称">
                            </el-table-column>
                            <el-table-column prop="mobile" label="注册账号">
                            </el-table-column>
                            <el-table-column prop="mobile" label="校区">
                            </el-table-column>
                            <el-table-column prop="class.title" label="班级名称">
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="stopUse(scope.row)" type="text" size="small">
                                        {{scope.row.status==2?'启用':'停用'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>

            </el-tabs>
            <el-dialog title="停用当前账号" :visible.sync="viewDialog">
                <div style="text-align: center;">是否{{userStatus==2?'停用':'启用'}}当前账号</div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="viewDialog=false">取消</el-button>

                    <el-button type="primary" @click="freeze">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
    import request from '@/api/request.js';

    export default {
        data() {
            return {
                viewDialog: false,
                userStatus: 0,
                activeName: 'student',
                keyword: '',
                schoolName: "",//学校名称
                gradeName: "",//年级
                className: '',//班级名称
                schoolOptions: [],
                gradeOptions: [],
                classOptions: [],
                psize:1,
                psize:20,
                studentTableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
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
                }],
                teacherTableData: [],
            };
        },
        methods: {
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
            handleClick(tab, event) {
                console.log(tab, event);
                console.log(this.activeName)
                switch (this.activeName) {
                    case 'student':
                        request.post('/backapi/Users/lists', {}, (res) => {
                            this.studentTableData = res.data.model;
                        });
                        break;
                    case 'teacher':
                        request.post('/backapi/Users/Teacherslists', {}, (res) => {
                            this.teacherTableData = res.data.model;
                        })
                        break;
                }
            },
            seach(){
                
                var data = { keyword: this.keyword,
                    // s_id:this.s_id,
                    // grade_id:this.grade_id,
                    // class_id:this.class_id

                }
                switch (this.activeName) {
                    case 'student':
                        request.post('/backapi/Users/lists', data, (res) => {
                            this.studentTableData = res.data.model;
                        });
                        break;
                    case 'teacher':
                        request.post('/backapi/Users/Teacherslists', data, (res) => {
                            this.teacherTableData = res.data.model;
                        })
                        break;
                }
            },
            seachButton(){
                var data = { keyword: this.keyword,
                    s_id:this.schoolName,
                    grade_id:this.gradeName,
                    class_id:this.className

                }
                switch (this.activeName) {
                    case 'student':
                        request.post('/backapi/Users/lists', data, (res) => {
                            this.studentTableData = res.data.model;
                        });
                        break;
                    case 'teacher':
                        request.post('/backapi/Users/Teacherslists', data, (res) => {
                            this.teacherTableData = res.data.model;
                        })
                        break;
                }
            },
            getlist(){
                var data = { keyword: this.keyword,page:this.page,psize:this.psize }
                switch (this.activeName) {
                    case 'student':
                        request.post('/backapi/Users/lists', data, (res) => {
                            this.studentTableData = res.data.model;
                        });
                        break;
                    case 'teacher':
                        request.post('/backapi/Users/Teacherslists', data, (res) => {
                            this.teacherTableData = res.data.model;
                        })
                        break;
                }
            },
            freeze(userId) {
                var data = { id: this.chooseUserId };
                request.post('/backapi/Users/freeze', data, (res) => {
                    if (res.code == 0) {
                        this.$message.success('已停用');
                        this.viewDialog = false;
                        this.handleClick();
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            stopUse(tab) {
                this.viewDialog = true;
                this.userStatus = tab.status;//用户状态2 已停用
                this.chooseUserId = tab.id;

            },
        
        },
        mounted() {
            this.handleClick(1);
            this.getSchools();
            // this.$refs.seachButton.onclick=this.seach;
            // console.log(this.$refs.seachButton,'ss')
            // document.getElementById('seachIcon').onclick=(e)=>{
            //     this.seach();
            // }
        }
    };
</script>

<style scoped>
    @import './../../assets/css/userManager.css';
</style>