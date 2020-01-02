<template>
    <div class="userNanager">
        <template>
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
            <el-row class="tabsTop">

                <el-col :span="10">

                    <div style="margin-top: 15px;">
                        <el-select v-model="schoolName" class="elInput" @change="getGrade" placeholder="请选择">
                            <el-option v-for="item in schoolOptions" :key="item.id" :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input placeholder="请输入账号/名称" v-model="keyword" class="input">
                            <el-button id="seachIcon" slot="append" ref="seachButton" @click.native="seach"
                                icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="14">
                    <template>
                        <div class="rightSlects">
                            <el-button class="bt_top" @click="fshowTimeDialog">设置开放注册时间</el-button>
                            <el-button class="bt_top" @click="showExplor=true">批量导入</el-button>
                            <el-button class="bt_top" @click="showAdd=true">单个添加</el-button>
                        </div>

                    </template>
                </el-col>
            </el-row>
            <!-- <el-tab-pane label="学生账号管理" name="student"> -->

            <template>
                <el-table :data="studentTableData" style="width: 100%">
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="mobile" label="账号">
                    </el-table-column>
                    <el-table-column prop="school.school" label="校区">
                    </el-table-column>
                    <el-table-column prop="school.level" label="用户类别">
                        <template slot-scope="scope">
                            <span>{{scope.row==1?'总管理':scope.row==2?'子管理':'普通用户'}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="Teaching.title" label="用户权限">
                    </el-table-column> -->
                    <!-- <el-table-column prop="Teaching.title" label="教研组">
                    </el-table-column> -->
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="fviewDialog(scope.row)" type="text" size="small">
                                查看</el-button>
                            <el-button @click="feditDialog(scope.row)" type="text" size="small">
                                编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- 查看弹框 -->
            <el-dialog title="查看" :visible.sync="viewDialog">
                <div class="viewdialogContainer">
                    <div>基本信息</div>
                    <div class="avoiterCotainer" style="vertical-align: middle;">
                        <el-image class="avoiter" style="width: 50px; height: 50px" :src="url"></el-image>
                        <span style="vertical-align: middle;margin-left: 10px;">张三</span>
                    </div>
                    <div class="fc_gray">
                        登录账号 ： 13120523333
                    </div>
                    <div class="meTitle">
                        权限信息 ：速度快废了SDK
                    </div>
                    <div class="fc_gray mb_10">
                        班级 ： 13120523333
                    </div>
                    <div class="fc_gray mb_10">
                        社团 ： 13120523333
                    </div>
                    <div class="fc_gray mb_10">
                        课题组 ： 13120523333
                    </div>
                    <div class="fc_gray">
                        教研组 ： 教研组
                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="viewDialog=false">取消</el-button>

                    <el-button type="primary" @click="freeze">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑弹框 -->
            <el-dialog title="编辑" :visible.sync="editDialog">
                <el-form :model="form">
                    <el-form-item label="用户名称">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editDialog=false">取消</el-button>

                    <el-button type="primary" @click="submitEdit">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 单个添加弹框 -->
            <el-dialog title="编辑" :visible.sync="showAdd">
                <el-form :model="form">
                    <el-form-item label="用户名称">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" style="display: none;">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showAdd=false">取消</el-button>

                    <el-button type="primary" @click="subimitAdd">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 批量导入弹框 -->
            <el-dialog title="编辑" :visible.sync="showExplor">
                
                <div>
                    1231
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showExplor=false">取消</el-button>

                    <el-button type="primary" @click="submitEdit">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 开放注册时间 -->
            <el-dialog title="编辑" :visible.sync="showTimeDialog">
                <el-form :model="registTime" v-show="showEditTime">
                    <el-form-item label="用户名称">
                        <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="registTime.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                   
                </el-form>
                <div v-show="!showEditTime">
                    当前已设置开放时间 {{!showEditTime?registTime.time[0]+'-'+registTime.time[1]:''}}
                    <div style="margin-top: 24px;">
                        <el-button @click="showEditTime=true">重新设置</el-button>
                        <el-button @click="closeRegist">关闭注册</el-button>

                    </div>
                </div>
                <div slot="footer" class="dialog-footer" v-show="!showEditTime">
                    <el-button type="primary" @click="showTimeDialog=false">取消</el-button>

                    <el-button type="primary" @click="submitEditTime">确 定</el-button>
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
                registTime:{},//注册时间
                showTimeDialog: false,
                showAdd: false,
                showExplor: false,
                showEditTime:true,
                oldTime:{},//设置的注册时间
                form: {
                    password: 123456
                },
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                viewDialog: false,//查看弹窗
                permissionClass: '',
                editDialog: false,//编辑弹窗
                userStatus: 0,
                editId: '',//编辑id
                activeName: 'student',
                keyword: '',
                schoolName: 1,//学校id
                gradeName: "",//年级
                className: '',//班级名称
                schoolOptions: [
                    { id: 1, title: "东区", },
                    { id: 2, title: "西区", },
                    { id: 3, title: "南区", }
                ],
                gradeOptions: [],
                classOptions: [],
                page: 1,
                psize: 20,
                studentTableData: [
                ],
                teacherTableData: [],
            };
        },
        methods: {
            getTimeregist(){
                request.post('/backapi/Users/reg',{},(res)=>{
                    if(res.data.res_starttime&&res.data.res_status!=2){
                        this.showEditTime=false;
                    }else{
                        this.showEditTime=true;
                        return;
                    }
                    console.log(res);
                    var registtime={time:[]};
                    registtime.time[0]=res.data.res_starttime
                    registtime.time[1]=res.data.res_endtime;
                    this.registTime=registtime;
                   
                })
            },
            fshowTimeDialog(){
                this.showTimeDialog=true;
                // request.post('/backapi/Users/reg',{},(res)=>{
                //     console.log(res);
                //     var registtime={time:[]};
                //     registtime.time[0]=res.data.res_starttime
                //     registtime.time[1]=res.data.res_endtime;
                //     this.registTime=registtime;
                // })
            },
            fviewDialog() {
                this.viewDialog = true;
            },
            feditDialog(item) {
                this.editDialog = true;
                this.editId = item.id;
            },
            submitEditTime(){
                console.log(this.registTime);
                var data={
                    res_status:1,
                    res_starttime:this.registTime.time[0],
                    res_endtime:this.registTime.time[1],
                }
                request.post('/backapi/Users/editReg',data,(res)=>{
                    if(res.code==0){
                        this.$message.success('设置成功');
                        this.showEditTime=false;
                    }
                })
            },
            closeRegist(){//关闭注册
                var data={
                    res_status:2,
                    res_starttime:this.registTime.time[0],
                    res_endtime:this.registTime.time[1],
                }
                request.post('/backapi/Users/editReg',data,(res)=>{
                    if(res.code==0){
                        this.$message.success('设置成功');
                        this.showEditTime=true;
                        this.showTimeDialog=false;
                    }
                })
            },
            submitEdit() {
                this.editDialog = true;
                this.form.id = this.editId;
                request.post('/backapi/Users/editUsers', this.form, (res) => {
                    if (res.code == 0) {
                        this.$message.success('修改成功');
                        this.handleClick(1);
                        this.editDialog = false;
                        this.form = {};
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            subimitAdd() {
                this.form.s_id = this.schoolName;
                request.post('/backapi/Users/addUsers', this.form, (res) => {
                    if (res.code == 0) {
                        this.$message.success('添加成功');
                        this.handleClick(1);
                        this.showAdd = false;
                        this.form = {};
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            getSchools() {
                let url = "/backapi/Statistical/sgb";
                request.post(url, {}, (res) => {
                    // res.data.unshift({ title: '全部', id: 'all' })
                    this.schoolOptions = res.data;
                    this.schoolName = res.data[0].id;
                })
            },
            getGrade(tab) {
                console.log(tab)
                if (tab == 'all') {
                    // this.gradeOptions = [{ title: '全部', id: 'all', class: [{ id: 'all', title: '全部' }] }];
                    // this.gradeName = "全部";
                    // this.className = "全部";
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
                    this.tab = 'all';
                } else {
                    this.gradeOptions.forEach(element => {
                        if (element.id == tab) {
                            this.classOptions = element.class;
                        }
                    });
                }

            },
            handleClick(tab, event) {
                switch (this.activeName) {//去掉了教师
                    case 'student':
                        var data = {
                            s_id: this.schoolName,
                            keyword: this.keyword,//搜索关键词
                            page: this.page,
                            psize: this.psize
                        };
                        request.post('/backapi/Users/lists', data, (res) => {
                            this.studentTableData = res.data.model;
                        });
                        break;
                    // case 'teacher':
                    //     request.post('/backapi/Users/Teacherslists', {}, (res) => {
                    //         this.teacherTableData = res.data.model;
                    //     })
                    //     break;
                }
            },
            seach() {

                var data = {
                    keyword: this.keyword
                }
                this.handleClick();
                // switch (this.activeName) {
                //     case 'student':
                //         request.post('/backapi/Users/lists', data, (res) => {
                //             this.studentTableData = res.data.model;
                //         });
                //         break;
                //     case 'teacher':
                //         request.post('/backapi/Users/Teacherslists', data, (res) => {
                //             this.teacherTableData = res.data.model;
                //         })
                //         break;
                // }
            },
            seachButton() {
                var data = {
                    keyword: this.keyword,
                    s_id: this.schoolName,
                    grade_id: this.gradeName,
                    class_id: this.className

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
            getlist() {
                var data = { keyword: this.keyword, page: this.page, psize: this.psize }
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
            this.getTimeregist();//是否已经设置注册时间
            // this.getSchools();//固定的了
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