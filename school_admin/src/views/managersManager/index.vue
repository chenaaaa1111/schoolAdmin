<template>
    <div class="managerManager">
        <template>
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="学生账号管理" name="first"> -->
            <el-row class="header">
                <el-col :span="3">
                    <el-button class="addButton" @click="addDialog=true">
                        添加管理员
                    </el-button>
                </el-col>
                <el-col :span="6">
                    <div style="margin-top: 15px;">
                        <el-input placeholder="请输入账号/名称" v-model="studentSeachKey" class="input">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-col>

            </el-row>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="title" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="mobile" label="账号" width="180">
                    </el-table-column>
                    <el-table-column prop="level.title" label="管理等级">
                    </el-table-column>
                    <el-table-column prop="level.num" label="管理范围">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClick('1',scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleClick('2',scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="handleClick('3',scope.row)" type="text" size="small">权限设置</el-button>
                            <el-button @click="handleClick('4',scope.row)" slot="reference" type="text" size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- </el-tab-pane>                   
                </el-tabs> -->
            <el-dialog title="添加子管理" :visible.sync="addDialog">
                <el-form :model="form">
                    <el-form-item label="管理名称" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDialog=false">取 消</el-button>
                    <el-button type="primary" @click="addManages">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑管理员 -->
            <el-dialog title="编辑管理员" :visible.sync="editDialog">
                <el-form :model="form">
                    <el-form-item label="管理名称" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialog=false">取 消</el-button>
                    <el-button type="primary" @click="editManages">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 查看 -->
            <el-dialog title="编辑管理员" :visible.sync="viewDialog">
                <div>管理名称 : <span>{{form.title}}</span></div>
                <div>
                    管理账号 : <span>{{form.mobile}}</span>
                </div>
                <div>
                    登录密码 : <span></span>
                </div>
                <div>
                    登录权限 : <span></span>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="viewDialog=false">确 定</el-button>
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
                editDialog: false,
                viewDialog: false,
                chooseId: '',
                formLabelWidth: '120px',
                activeName: 'first',
                visibleDelete: false,
                studentSeachKey: '',
                teachSeachKey: '',
                school: "",//学校名称
                grade: "",//年级
                className: '',//班级名称
                schoolOptions: [],
                gradeOptions: [],
                classOptions: [],
                tableData: [],
                addDialog: false,  //增加的弹框
                form: {

                    level: 1
                }
            };
        },
        methods: {
            delete(id) {

                this.$confirm('删除此管理员？', '删除', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(() => {
                        request.post('/backapi/Admin/delete', { id: id }, (res) => {
                            if (res.code == 0) {
                                this.$message.success('删除成功');
                                this.getAdmins();
                            } else {
                                this.$message.error(res.message);
                            }
                        })

                    })
                    .catch(action => {

                    });


            },
            addManages() {
                var data = this.form;
                request.post('/backapi/Admin/registered', data, (res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.addDialog = false;
                    } else {
                        this.$message.error(res.message);
                    }

                })
            },
            editManages() {
                var data = {
                    id: this.form.id,
                    title: this.form.tiitle,
                    level: this.form.level,
                    mobile: this.form.mobile,
                    password: this.form.password
                };
                // data.id=id;
                request.post('/backapi/Admin/edit', data, (res) => {
                    if (res.code == 0) {
                        this.$message.success('编辑成功');
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            handleClick(tab, data) {
                console.log(tab, data);
                switch (tab) {
                    case '1':
                        this.editDialog = true;
                        this.form = data;
                        break;
                    case '2':
                        this.viewDialog = true;
                        this.form=data;
                        break;
                    case '4':
                        this.chooseId = data.id;
                        this.delete(data.id)
                        break;    //删除


                }

            },
            seach(key) {

            },
            getAdmins() {
                var data = {

                };
                request.post('/backapi/Admin/adminList', data, (res) => {
                    this.tableData = res.data;
                })
            }
        },
        mounted() {
            this.getAdmins();
        }
    };
</script>

<style scoped>
    @import './../../assets/css/Manager.css';
</style>