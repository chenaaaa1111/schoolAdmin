<template>
    <div class="classifyManager">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in tabsList" :key="index">
                <el-tabs v-model="activeSchool" class="schoolList">
                    <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in schoolList" :key="index">
                        <div class="flexhalf">
                            <div class="halfItem bg_white">
                                <div class="tabCard bg_white">
                                    小学
                                </div>
                                <div class="halfBg">
                                    <div class="tabTitle bg_white">
                                        <el-button type="primary" class="smallBt">展开全部</el-button>
                                        <el-button type="success" class="smallBt">新增班级</el-button>
                                    </div>
                                    <div class="halfClassItem">
                                        <div>
                                            <template>
                                                <div class="gradeContainer">
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <span class="itemInline"><i
                                                                    class="el-icon-caret-bottom"></i> 2019</span>
                                                            <span class="itemInline">暂无审核人</span>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <span class="smallInline"
                                                                @click="viewClassDialog=true">添加班级</span>
                                                            <span class="smallInline"
                                                                @click="viewCheckingDialog=true">设置审核人</span>
                                                            <span class="smallInline"
                                                                @click="viewEditDialog=true">编辑</span>
                                                            <span class="smallInline"
                                                                @click="deleteConfirm">删除</span>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- 班级 -->
                                                    <div>
                                                        <el-row v-for="(item,index) in gradeChildren" :key="index"
                                                            v-show="showAll||item.isShow">
                                                            <el-col :span="12">
                                                                <span class="itemInline">1班</span>
                                                                <span class="itemInline">班主任:张三</span>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <span class="smallInline"></span>
                                                                <span class="smallInline">更改班主任</span>
                                                                <span class="smallInline">编辑</span>
                                                                <span class="smallInline">删除</span>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="12">
                                                                <span class="itemInline">1班</span>
                                                                <span class="itemInline">班主任:李四</span>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <span class="smallInline"></span>
                                                                <span class="smallInline">更改班主任</span>
                                                                <span class="smallInline">编辑</span>
                                                                <span class="smallInline">删除</span>
                                                            </el-col>
                                                        </el-row>
                                                    </div>

                                                </div>

                                            </template>
                                        </div>
                                    </div>
                                    <div class="halfClassItem">
                                        <div>
                                            <template>
                                                <div class="gradeContainer">
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <span class="itemInline"><i
                                                                    class="el-icon-caret-bottom"></i> 2019</span>
                                                            <span class="itemInline">暂无审核人</span>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <span class="smallInline">添加班级</span>
                                                            <span class="smallInline">设置审核人</span>
                                                            <span class="smallInline">编辑</span>
                                                            <span class="smallInline">删除</span>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- 班级 -->
                                                    <div>
                                                        <el-row v-for="(item,index) in gradeChildren" :key="index"
                                                            v-show="showAll||item.isShow">
                                                            <el-col :span="12">
                                                                <span class="itemInline">1班</span>
                                                                <span class="itemInline">班主任:张三</span>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <span class="smallInline"></span>
                                                                <span class="smallInline">更改班主任</span>
                                                                <span class="smallInline">编辑</span>
                                                                <span class="smallInline">删除</span>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="12">
                                                                <span class="itemInline">1班</span>
                                                                <span class="itemInline">班主任:李四</span>
                                                            </el-col>
                                                            <el-col :span="12">
                                                                <span class="smallInline"></span>
                                                                <span class="smallInline">更改班主任</span>
                                                                <span class="smallInline">编辑</span>
                                                                <span class="smallInline">删除</span>
                                                            </el-col>
                                                        </el-row>
                                                    </div>

                                                </div>

                                            </template>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="columnFlex">

                            </div>
                            <div class="bg_white halfItem">

                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </el-tab-pane>
            <el-tab-pane label="栏目设置" name="栏目设置" >
                <div class="bgcolumn">
                    <el-button>
                        添加栏目
                    </el-button>
                    <div class="bgcchildren">
                        <div class="bgculumns">
                            <el-button >栏目1 <i class="el-icon-delete " @click="deleteCulomn"></i> | <i @click="editCulomn" class="el-icon-edit-outline el-icon--right"></i></el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 添加班级弹框 -->
        <el-dialog title="添加班级" :visible.sync="viewClassDialog">
            <el-form :model="classform">
                <el-form-item label="班级名称">
                    <el-input v-model="classform.name" require autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewClassDialog = false">取 消</el-button>
                <el-button type="primary" @click="addClass">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 设置审核人 -->
        <el-dialog title="设置审核人" :visible.sync="viewCheckingDialog">
            <el-form :model="classform">
                <el-form-item label="设置审核人">
                    <el-select v-model="checkingMan" placeholder="请选择">
                        <el-option v-for="item in checkOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewCheckingDialog = false">取 消</el-button>
                <el-button type="primary" @click="addChecking">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 删除提示 -->
    </div>
</template>
<style scoped>
    @import './../../assets/css/classifyManager.css';
</style>
<style>
    .halfBg {
        background: rgba(223, 231, 238, 1);

    }

    .smallBt {
        padding: 7px 8px;
    }

    .tabCard {
        margin-bottom: 5px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

    .el-main {

        background: rgba(246, 246, 246, 1);
    }

    .bg_white {
        background: #fff;
    }

    .schoolList .el-tabs__nav-scroll {
        width: 200px;
        margin: 0 auto;
    }

    .flexhalf {}
</style>
<script>
    export default {
        data() {
            return {
                checkOptions: [{
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
                }],
                checkingMan: '',
                checkingOption: [],
                classform: {},//添加班级参数
                viewClassDialog: false,
                viewCheckingDialog: false,
                viewEditDialog: false,
                showAll: true,
                gradeChildren: [
                    {}, {}
                ],
                activeName: 'class',
                activeSchool: 'east',
                tabsList: [
                    { name: 'class', label: '班级设置' },
                    { name: 'team', label: '社团设置' },
                    { name: 'topic', label: '课题组设置' },
                    { name: 'teaching', label: '教研设置' }
                  
                ],
                schoolList: [
                    { name: 'east', label: '东区' },
                    { name: 'west', label: '西区' },
                    { name: 'south', label: '南区' }
                ],

            };
        },
        methods: {
            deleteCulomn(id){
                console.log('删除');
            },
            editCulomn(id){
                console.log('编辑')
            },
            deleteConfirm() {
                this.$confirm('删除后该栏目下的文章会自动被删除，是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            addClass() {
                var data = {};
                request.post('', data, (res) => {

                })
            },
            addChecking() {
                var data = {};
                request.post('', data, (res) => {

                })
            }
        },
        mounted() {

        }
    }
</script>