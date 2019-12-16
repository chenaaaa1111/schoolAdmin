<template>
    <div class="userNanager">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="学生账号管理" name="student">
                    <el-row>
                        <el-col :span="6">
                            <div style="margin-top: 15px;">
                                <el-input placeholder="请输入账号/名称" v-model="studentSeachKey" class="input">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <template>
                                <div class="rightSlects">
                                    <el-select v-model="school" class="elInput" multiple placeholder="请选择">
                                        <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>

                                    <el-select v-model="grade" multiple collapse-tags class="elInput"
                                        style="margin-left: 10px;" placeholder="请选择">
                                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="className" multiple collapse-tags class="elInput"
                                        style="margin-left: 10px;" placeholder="请选择">
                                        <el-option v-for="item in classOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                </div>

                            </template>
                        </el-col>
                    </el-row>
                    <template>
                        <el-table :data="studentTableData" style="width: 100%">
                            <el-table-column prop="name" label="名称" >
                            </el-table-column>
                            <el-table-column prop="mobile" label="注册账号">
                            </el-table-column>
                            <el-table-column prop="mobile" label="校区名称" >
                            </el-table-column>
                            <el-table-column prop="mobile" label="教研组" >
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="stopUse(scope.row)" type="text" size="small">停用</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="教师账号管理" name="teacher">
                    <el-row>
                        <el-col :span="6">
                            <div style="margin-top: 15px;">
                                <el-input placeholder="请输入账号/名称" v-model="studentSeachKey" class="input">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <template>
                                <div class="rightSlects">
                                    <el-select v-model="school" class="elInput" multiple placeholder="请选择">
                                        <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>

                                    <el-select v-model="grade" multiple collapse-tags class="elInput"
                                        style="margin-left: 10px;" placeholder="请选择">
                                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="className" multiple collapse-tags class="elInput"
                                        style="margin-left: 10px;" placeholder="请选择">
                                        <el-option v-for="item in classOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                </div>

                            </template>
                        </el-col>
                    </el-row>
                    <template>
                        <el-table :data="teacherTableData" style="width: 100%">
                            <el-table-column prop="name" label="名称" >
                            </el-table-column>
                            <el-table-column prop="mobile" label="注册账号" >
                            </el-table-column>
                            <el-table-column prop="mobile" label="校区" >
                            </el-table-column>
                            <el-table-column prop="class.title" label="班级名称" >
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                            <el-table-column label="操作" >
                                <template slot-scope="scope">
                                    <el-button @click="stopUse(scope.row)" type="text" size="small">停用</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>

            </el-tabs>
            <el-dialog title="停用当前账号" :visible.sync="viewDialog">
               <div style="text-align: center;">是否停用当前账号</div>

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
                viewDialog:false,
                activeName: 'student',
                studentSeachKey: '',
                teachSeachKey: '',
                school: "",//学校名称
                grade: "",//年级
                className: '',//班级名称
                schoolOptions: [],
                gradeOptions: [],
                classOptions: [],
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
                teacherTableData:[],
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                console.log(this.activeName)
                switch(this.activeName){
                    case 'student' :
                        request.post('/backapi/Users/lists',{},(res)=>{
                            this.studentTableData=res.data.model;
                        });
                        break;
                    case 'teacher':
                        request.post('',{},(res)=>{
                            this.teacherTableData=res.data.model;
                        })
                    break;
                }
            },
            freeze(userId){
               var data= {id:this.chooseUserId};
                request.post('/backapi/Users/freeze',data,(res)=>{
                    if(res.code==0){
                        this.$message.success('已停用');
                        this.viewDialog=false;
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            stopUse(tab){
                this.viewDialog=true;
                this.chooseUserId=tab.id;
                
            },
            seach(key) {

            }
        },
        mounted(){
            this.handleClick(1)
        }
    };
</script>

<style scoped>
    @import './../../assets/css/userManager.css';
</style>