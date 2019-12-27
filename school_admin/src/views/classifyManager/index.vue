<template>
    <div class="classifyManager">
        <el-tabs v-model="activeName" @tab-click="toggleSettingType">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in tabsList" :key="index">
                <el-tabs v-model="activeSchool" class="schoolList" @tab-click="switchCampus">
                    <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in schoolList" :key="index">
                        <div v-show="activeName =='class'" class="flexhalf">
                            <div class="halfItem bg_white">
                                <div class="tabCard bg_white">小学</div>
                                <div class="halfBg">
                                    <div class="tabTitle bg_white">
                                        <el-button type="primary" class="smallBt" @click="primaryGradeExpandAll">
                                            {{primaryGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                                        <el-button type="success" class="smallBt" @click="primaryAddGradeClass">新增年级
                                        </el-button>
                                    </div>
<<<<<<< HEAD

                                    <div class="halfClassItem" v-for="(item,index) in primaryGradeClassData"
                                        :key="index">
=======
                                    <div class="halfClassItem" v-for="(item,index) in primaryGradeClassData" :key="index">
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e
                                        <div>
                                            <template>
                                                <div class="gradeContainer">
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <span class="itemInline"
                                                                @click="primaryExpandItem(item,index)">
                                                                <i v-show="item.isOpen"
                                                                    class="el-icon-caret-bottom"></i>
                                                                <i v-show="!item.isOpen"
                                                                    class="el-icon-caret-right"></i>
                                                                {{item.title}}</span>
                                                            <span v-if="item.name"
                                                                class="itemInline">审核人：{{item.name}}</span>
                                                            <span v-else>暂无审核人</span>
                                                        </el-col>
                                                        <el-col :span="12">
                                                            <span class="smallInline"
                                                                @click="clickAddClassBtn(item)">添加班级</span>
                                                            <span class="smallInline"
                                                                @click="viewCheckingDialog=true">设置审核人</span>
                                                            <span class="smallInline"
                                                                @click="viewEditDialog=true">编辑</span>
                                                            <span class="smallInline" @click="deleteConfirm">删除</span>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- 班级 -->
                                                    <div v-show="item.isOpen">
                                                        <el-row v-for="(it,ind) in item.class" :key="ind">
                                                            <el-col :span="12">
                                                                <span class="itemInline">{{it.title}}</span>
                                                                <span v-if="it.name"
                                                                    class="itemInline">班主任：{{it.name}}</span>
                                                                <span v-else>暂无班主任</span>
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
                            <div class="columnFlex"></div>
                            <div class="bg_white halfItem">
                                <div class="tabCard bg_white">初中</div>
                                <div class="halfBg">
                                    <div class="tabTitle bg_white">
                                        <el-button type="primary" class="smallBt" @click="middleGradeExpandAll">
                                            {{middleGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                                        <el-button type="success" class="smallBt">新增年级</el-button>
                                    </div>

                                    <div class="halfClassItem" v-for="(item,index) in middleGradeClassData"
                                        :key="index">
                                        <div>
                                            <template>
                                                <div class="gradeContainer">
                                                    <el-row>
                                                        <el-col :span="12">
                                                            <span class="itemInline"
                                                                @click="middleExpandItem(item,index)">
                                                                <i v-show="item.isOpen"
                                                                    class="el-icon-caret-bottom"></i>
                                                                <i v-show="!item.isOpen"
                                                                    class="el-icon-caret-right"></i>
                                                                {{item.title}}</span>
                                                            <span v-if="item.name"
                                                                class="itemInline">审核人：{{item.name}}</span>
                                                            <span v-else>暂无审核人</span>
                                                        </el-col>
                                                        <el-col :span="12">
<<<<<<< HEAD
                                                            <span class="smallInline"
                                                                @click="viewClassDialog=true">添加班级</span>
                                                            <span class="smallInline"
                                                                @click="viewCheckingDialog=true">设置审核人</span>
                                                            <span class="smallInline"
                                                                @click="viewEditDialog=true">编辑</span>
=======
                                                            <span class="smallInline">添加班级</span>
                                                            <span class="smallInline" @click="viewCheckingDialog=true">设置审核人</span>
                                                            <span class="smallInline" @click="viewEditDialog=true">编辑</span>
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e
                                                            <span class="smallInline" @click="deleteConfirm">删除</span>
                                                        </el-col>
                                                    </el-row>
                                                    <!-- 班级 -->
                                                    <div v-show="item.isOpen">
                                                        <el-row v-for="(it,ind) in item.class" :key="ind">
                                                            <el-col :span="12">
                                                                <span class="itemInline">{{it.title}}</span>
                                                                <span v-if="it.name"
                                                                    class="itemInline">班主任：{{it.name}}</span>
                                                                <span v-else>暂无班主任</span>
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
                        </div>
                        <div v-show="activeName =='team'">我是社团设置</div>
                        <div v-show="activeName =='topic'">我是课题组设置</div>
                        <div v-show="activeName =='teaching'">我是教研组设置</div>
                    </el-tab-pane>
                </el-tabs>

            </el-tab-pane>
            <el-tab-pane label="栏目设置" name="栏目设置">
                <div class="bgcolumn">
                    <el-button>
                        添加栏目
                    </el-button>
                    <div class="bgcchildren">
                        <div class="bgculumns">
                            <el-button>栏目1 <i class="el-icon-delete " @click="deleteCulomn"></i> | <i
                                    @click="editCulomn" class="el-icon-edit-outline el-icon--right"></i></el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!-- 新增年级 -->
<<<<<<< HEAD
        <el-dialog title="添加年级" :visible.sync="addGradeDialog" width="30%"
            @close="closeGradeDialog('addGradeRuleForm')">
            <el-form :model="addGradeRuleForm" :rules="addGradeRules" ref="addGradeRuleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="级别">
                    <el-radio-group v-model="addGradeRuleForm.level">
                        <el-radio :label="0">年级</el-radio>
                        <el-radio :label="1">班级</el-radio>
=======
        <el-dialog title="添加年级" :visible.sync="addGradeDialog"  width="30%" @close="closeGradeDialog('addGradeRuleForm')">
            <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
                <el-eow :gutter="20">
                    <el-col :span="19">
                        <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" @click="searchListClick">查询</el-button>
                    </el-col>
                </el-eow>
                <el-eow :gutter="20">
                    <el-col :span="24">
                       <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
                    </el-col>
                </el-eow>
                <el-eow :gutter="20">
                    <el-col :span="24">
                        <ul class="userList">
                            <li v-for="(item,index) in searchUseerList" :key="index">
                                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                                <span>{{item.mobile}}</span>
                            </li>
                        </ul>
                    </el-col>
                </el-eow>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addGradeDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmUserName('addGrade')">确 认</el-button>
                </div>
            </el-dialog>
            <el-form :model="addGradeRuleForm" :rules="addGradeRules" ref="addGradeRuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="级别">
                    <el-radio-group v-model="addGradeRuleForm.level">
                        <el-radio :label="0">年级</el-radio>
                        <!-- <el-radio :label="1">班级</el-radio> -->
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年级名称" prop="gradeName">
                    <el-input v-model="addGradeRuleForm.gradeName"></el-input>
                </el-form-item>
                <el-form-item label="年级审核人">
                    <el-input v-model="addGradeRuleForm.gradeReviewer" readonly style="width:70%;"></el-input>
                    <el-button style="width:27%;margin-left:3%;" @click="addGradeSearchUserClick">查 找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="confiemAddGrade('addGradeRuleForm')">确 认</el-button>
                    <el-button @click="closeGradeDialog('addGradeRuleForm')">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
<<<<<<< HEAD


=======
        
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e
        <!-- 添加班级弹框 -->
        <el-dialog title="添加班级" :visible.sync="addClassDialog"  width="30%" @close="closeClassDialog('addClassRuleForm')">
            <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
                <el-eow :gutter="20">
                    <el-col :span="19">
                        <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" @click="searchListClick">查 询</el-button>
                    </el-col>
                </el-eow>
                <el-eow :gutter="20">
                    <el-col :span="24">
                       <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
                    </el-col>
                </el-eow>
                <el-eow :gutter="20">
                    <el-col :span="24">
                        <ul class="userList">
                            <li v-for="(item,index) in searchUseerList" :key="index">
                                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                                <span>{{item.mobile}}</span>
                            </li>
                        </ul>
                    </el-col>
                </el-eow>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addClassDialog = false">取 消</el-button>
                    <el-button type="primary" @click="confirmUserName('addClass')">确 认</el-button>
                </div>
            </el-dialog>
            <el-form :model="addClassRuleForm" :rules="addClassRules" ref="addClassRuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="级别">
                    <el-radio-group v-model="addClassRuleForm.level">
                        <!-- <el-radio :label="0">年级</el-radio> -->
                        <el-radio :label="1">班级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级年级" prop="superiorGrade">
                    <el-select v-model="addClassRuleForm.superiorGrade" placeholder="请选择上级年级">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级名称" prop="className">
                    <el-input v-model="addClassRuleForm.className"></el-input>
                </el-form-item>
                <el-form-item label="班主任">
                    <el-input v-model="addClassRuleForm.headmaster" readonly style="width:70%;"></el-input>
                    <el-button style="width:27%;margin-left:3%;" @click="addClassSarchUserClick">查 找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="confiemAddClass('addClassRuleForm')">确 认</el-button>
                    <el-button @click="closeClassDialog('addClassRuleForm')">取 消</el-button>
                </el-form-item>
            </el-form>
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

    .searchUserDialog .el-dialog .el-dialog__body{
        height: 300px;
    }
    .searchUserDialog .searchTip{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(164,104,104,1);
        line-height:20px;
    }
    .searchUserDialog .userList{
        width: 100%;
        height: 220px;
        overflow: scroll;

    }
    .searchUserDialog .userList li{
        margin-bottom: 5px;
        padding-left: 19px;
        box-sizing: border-box;
        height:50px;
        line-height: 50px;
        color: #333;
        background:rgba(242,242,242,1);
    }
     .searchUserDialog .userList li .radioWidth{
        width: 100px;
     }

</style>
<script>
    import request from '@/api/request.js';
    export default {
        data() {
            return {
                //设置审核人列表
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
                checkingMan: '', //绑定审核人
                classform: {},//添加班级参数
                viewCheckingDialog: false,
                viewEditDialog: false,
                gradeChildren: [
                    {}, {}
                ],
                activeName: 'class', //默认 是班级设置 tab项 
                activeSchool: 'east', //默认是 东区 设置项
                tabsList: [
                    { name: 'class', label: '班级设置' },
                    { name: 'team', label: '社团设置' },
                    { name: 'topic', label: '课题组' },
                    { name: 'teaching', label: '教研组' }

                ],
                schoolList: [
                    { name: 'east', label: '东区' },
                    { name: 'west', label: '西区' },
                    { name: 'south', label: '南区' }
                ],
                primaryGradeClassIsOpen: false, //年级班级 小学 展开项 是否全部展开了
                middleGradeClassIsOpen: false, //年级班级 初中 展开项 是否全部展开了
                primaryGradeClassData: {}, //年级班级数据 小学  东区 西区 南区 
                middleGradeClassData: {}, //年级班级数据 初中  东区 西区 南区
                
                //班级设置 弹窗部分
                // 新增年级 弹窗
                addGradeDialog: false, //新增年级弹窗
                addGradeRuleForm: {  //新增年级弹窗 内容绑定值
                    level: 0, // 级别  默认年级
                    gradeName: '', //年级名称
                    gradeReviewer: '' //年级审核人
                },
                addGradeRules: {   //新增年级弹窗 验证规则
                    gradeName: [
                        { required: true, message: '请输入年级名称', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    // gradeReviewer: [
                    //     { required: true, message: '年级审核人不能为空', trigger: 'blur' }
                    // ],
                },
                // 通用部分 start
                searchClickDialog: false, //新增年级弹窗  --年级审核人 --点击查找 出现下面的查询弹窗
                searchUserName: '', //用户查询弹窗下的 搜索字段
                searchUseerList: [], //搜索的用户列表
                checkedVal: '', //选中的用户 id
                filterUser: {},//保留选中的审核人 班主任 等 id和名字
                //通用部分 --end

                 // 新增班级 弹窗
                addClassDialog: false, //新增班级弹窗
                addClassRuleForm: {  //新增班级弹窗 内容绑定值
                    level: 1, // 级别  默认班级
                    superiorGrade: '', //上级年级
                    className: '', //班级名称
                    headmaster: '' //班主任
                },
                addClassRules: {   //新增班级弹窗 验证规则
                    superiorGrade: [
                        { required: true, message: '请选择上级年级', trigger: 'change' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    className: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' }
                    ],
                    // headmaster: [
                    //     { required: true, message: '班主任人不能为空', trigger: 'blur' }
                    // ],
                },
            

                
               

            };
        },
        methods: {
            deleteCulomn(id) {
                console.log('删除');
            },
            editCulomn(id) {
                console.log('编辑')
            },
            deleteConfirm() {
                var _that = this;
                _that.$confirm('删除后该栏目下的文章会自动被删除，是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    t_thathis.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    _that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            toggleSettingType(tab) { //点击切换设置类型  班级 社团设置
                console.log(tab, event);
                switch (tab.name) {
                    case "class": //班级设置
                        this.getGradeClassData();
                        break;
                    case "team": //社团设置
                        console.log('点击了社团设置')
                        break;
                    case "topic": //课题组
                        console.log('点击了课题组')
                        break;
                    case "teaching": //教研组
                        console.log('点击了教研组')
                        break;
                    default:
                }

            },

            // 班级设置部分 
            //东区   西区 南区 判断  activeSchool: 'east',
            switchCampus(val) { //点击切换
                console.log(val, '点击班级设置里面的切换校区')
                this.getGradeClassData(val.name);
            },
<<<<<<< HEAD
            primaryAddGradeClass() { //班级设置--东区里面 小学 点击新增年级按钮
                this.addGradeDialog = true;
=======
            primaryAddGradeClass(){ //班级设置--东区里面 小学 点击新增年级按钮
               this.addGradeRuleForm.gradeName = '';
               this.addGradeRuleForm.gradeReviewer = '';
               this.addGradeDialog = true;
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e
            },
            confiemAddGrade(ruleForm) { //新增年级 弹窗 确认按钮
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var self = this;
                        let data = {
                            s_id: self.primaryGradeClassIsOpen[0].s_id, //校区id 小学
                            l_id: self.primaryGradeClassIsOpen[0].l_id, //校部id  小学 初中
                            title: self.addGradeRuleForm.gradeName, //	年级名称
                            u_id: self.checkedVal, //审核员id
                            name: self.addGradeRuleForm.gradeReviewer, //审核员名字
                        };
                        request.post('/backapi/Classify/addGrade', data, function (res) {
                            if (res.code == 0) {
                                self.$toast.success(res.message);
                                this.addGradeDialog = false;
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            closeGradeDialog(ruleForm) {  //新增年级 弹窗 关闭 取消 遮罩  空白处
                this.addGradeDialog = false;
                this.$nextTick(() => {
                    this.$refs[ruleForm].resetFields();
                });
            },
<<<<<<< HEAD
=======
            addGradeSearchUserClick(){ //新增年级弹窗  --年级审核人 --点击查找 出现下面的查询弹窗
                this.searchClickDialog = true; //内层弹窗出现
            },
            //用户查询弹窗 通用--start
            searchListClick(){ //内层弹窗中点击 查询按钮 通用
                this.getSearchUserList();
            },
            // 查询弹窗 用户搜索接口 获取查询到的用户列表  班主任查询 也是  通用
            getSearchUserList(){
                var data = {
                    keyword: this.searchUserName, //关键字 （传空显示全部）
                    page: 1,
                }
                request.post('/backapi/Classify/User', data, (res) => {
                    if(res.code ==0){
                        if(res.data.model.length>0){
                            this.searchUseerList = res.data.model;
                        }
                    }
                })
            },
            confirmUserName(val){ //查询用户的弹窗 确认按钮 通用
                console.log(val,'点击查询用户确认弹窗是什么类型')
                this.searchClickDialog = false;
                console.log(this.checkedVal,'选中的审核人id值是什么')
                const receiveArr = this.searchUseerList.filter((item) => {
                    return item.id == this.checkedVal
                })
                this.filterUser = receiveArr[0];
                console.log(this.filterUser, '筛选出匹配的用户名称和id集合');
                if(val == "addGrade"){ //如果是新增年级
                    this.addGradeRuleForm.gradeReviewer = this.filterUser.name;
                }else if(val == "addClass"){ //如果是新增班级
                    this.addClassRuleForm.headmaster = this.filterUser.name;
                }
            },
            //用户查询弹窗 通用--end

            //新增班级 部分
            clickAddClassBtn(item){  //点击新增班级 出现弹窗
                console.log(item,'点击添加班级')
                this.addClassRuleForm.superiorGrade = '';
                this.addClassRuleForm.className = '';
                this.addClassRuleForm.headmaster = '';
                this.addClassDialog = true;
            },
            confiemAddClass(ruleForm) { //新增班级-- 弹窗 确认按钮
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var self = this;
                        let data = {
                            s_id: self.primaryGradeClassIsOpen[0].s_id, //校区id 小学
                            l_id: self.primaryGradeClassIsOpen[0].l_id, //年级id
                            title: self.addClassRuleForm.className, //	班级名称
                            u_id: self.checkedVal, //班主任id
                            name: self.addClassRuleForm.headmaster, //班主任名字
                        };
                        request.post('/backapi/Classify/addClass', data, function (res) {
                            if (res.code == 0) {
                                self.$toast.success(res.message);
                                this.addClassDialog = false;
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            closeClassDialog(ruleForm) {  //新增年级 弹窗 关闭 取消 遮罩  空白处
                this.addClassDialog = false;
                this.$nextTick(() => {
                   this.$refs[ruleForm].resetFields();
                });
            },          
            addClassSarchUserClick(){ //新增班级弹窗  --班主任 --点击查找 出现下面的查询弹窗
                this.searchClickDialog = true; //内层搜索班主任  弹窗出现
            },
>>>>>>> 8300002ff3595a1601b82703708ed62cb9254e8e

            addClass() { //添加班级弹窗确定
                var data = {};
                request.post('', data, (res) => {

                })
            },
            addChecking() { //设置审核人  弹窗确定
                var data = {};
                request.post('', data, (res) => {

                })
            },
            getGradeClassData(area) { //获取年级班级数据
                var url = '';
                switch (area) {
                    case "east": //东区
                        url = "/backapi/Classify/dschool";
                        break;
                    case "west": //西区
                        url = "/backapi/Classify/xschool";
                        break;
                    case "south": //南区
                        url = "/backapi/Classify/nschool";
                        break;
                    default:
                        url = "/backapi/Classify/dschool";
                }
                var self = this;
                request.post(url, {}, (res) => {
                    if (res.code == 0) {
                        self.primaryGradeClassData = res.data.small.map(item => {
                            item.isOpen = false;//默认折叠
                            return item;
                        });//小学的年级班级数据
                        self.middleGradeClassData = res.data.Junior.map(item => {
                            item.isOpen = false;
                            return item;
                        });//中学的年级班级数据
                        console.log('小学年级班级数据列表', self.primaryGradeClassData);
                        console.log('中学年级班级数据列表', self.middleGradeClassData);
                    }
                })
            },
            primaryGradeExpandAll() { //班级设置--东区里面 小学 点击了展开全部 折叠 全部
                this.primaryGradeClassIsOpen = !this.primaryGradeClassIsOpen;
                this.primaryGradeClassData = this.primaryGradeClassData.map(item => {
                    item.isOpen = !item.isOpen;
                    return item;
                });//小学的年级班级数据
            },
            primaryExpandItem(item, index) { //班级设置--东区里面 小学 点击了某一年级的展开项
                if (item.isOpen) {
                    this.primaryGradeClassData[index].isOpen = false;
                } else {
                    this.primaryGradeClassData[index].isOpen = true;
                }
            },
            middleGradeExpandAll() { //班级设置--东区里面 初中 点击了展开全部 折叠 全部
                this.middleGradeClassIsOpen = !this.middleGradeClassIsOpen;
                this.middleGradeClassData = this.middleGradeClassData.map(item => {
                    item.isOpen = !item.isOpen;
                    return item;
                });//小学的年级班级数据
            },
            middleExpandItem(item, index) { //班级设置--东区里面 小学 点击了某一年级的展开项
                if (item.isOpen) {
                    this.middleGradeClassData[index].isOpen = false;
                } else {
                    this.middleGradeClassData[index].isOpen = true;
                }
            }
        },
        mounted() {
            this.getGradeClassData();
            // this.getGradeClassData(this.activeSchool);
        }
    }
</script>