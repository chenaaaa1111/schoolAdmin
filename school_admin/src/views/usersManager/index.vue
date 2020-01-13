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
            <el-row class="deletebox">
                <el-col :span="10">
                    <el-button @click="deleteUsers">批量删除</el-button> 已选 ({{selectUsers.length}})
                </el-col>
            </el-row>
            <!-- <el-tab-pane label="学生账号管理" name="student"> -->

            <template>
                <el-table :data="studentTableData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">

                    </el-table-column>
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="mobile" label="账号">
                    </el-table-column>
                    <el-table-column prop="school" label="校区">
                    </el-table-column>
                    <el-table-column prop="level" label="用户类别">
                        <template slot-scope="scope">
                            <span>{{scope.row.level==1?'总管理':scope.row.level==2?'子管理':'普通用户'}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="Teaching.title" label="用户权限">
                    </el-table-column> -->
                    <!-- <el-table-column prop="Teaching.title" label="教研组">
                    </el-table-column> -->
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button @click="fviewDialog(scope.row)" type="text" size="small">
                                查看</el-button>
                            <el-button @click="feditDialog(scope.row)" type="text" size="small">
                                编辑</el-button>
                            <el-button @click="showpowerDiaLog" v-show="scope.row.level==2" type="text" size="small">
                                权限管理</el-button>
                            <el-button @click="showpCancenDiaLog(scope.row)" v-show="scope.row.level==2" type="text"
                                size="small">
                                取消子管理</el-button>
                                <el-button @click="showpaddManagerDiaLog(scope.row)" v-show="scope.row.level==3" type="text"
                                size="small">
                                设为子管理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="psize"
                layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
            <!-- 查看弹框 -->
            <el-dialog title="查看" :visible.sync="viewDialog">
                <div class="viewdialogContainer">
                    <div>基本信息</div>
                    <div class="avoiterCotainer" style="vertical-align: middle;">
                        <el-image class="avoiter" style="width: 50px; height: 50px" :src="viewuserInfo.avatar">
                        </el-image>
                        <span style="vertical-align: middle;margin-left: 10px;">{{viewuserInfo.name}}</span>
                    </div>
                    <div class="fc_gray">
                        登录账号 ： {{viewuserInfo.mobile}}
                    </div>
                    <div class="meTitle">
                        权限信息 ： {{viewuserInfo.auth}}
                    </div>
                    <div class="fc_gray mb_10">
                        班级 ： {{viewuserInfo.class}}
                    </div>
                    <div class="fc_gray mb_10">
                        社团 ：
                        <span v-for="(item,key) in viewuserInfo.community" :key="key">{{item.title}} ; </span>
                    </div>
                    <div class="fc_gray mb_10">
                        课题组 ：
                        <span v-for="(item,key) in viewuserInfo.subject" :key="key">{{item.title}} ; </span>
                    </div>
                    <div class="fc_gray">
                        教研组 ：
                        <span v-for="(item,key) in viewuserInfo.teaching" :key="key">{{item.title}} ; </span>
                    </div>
                </div>

                <div slot="footer" class="dialog-footer" style="text-align: center;">

                    <el-button type="primary" @click="viewDialog=false">关闭</el-button>
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
            <el-dialog title="批量导入" :visible.sync="showExplor">

                <div>
                    <el-upload class="upload-demo" ref="upload" accept=".xls,xlsx" action="/backapi/Excel/inserExcel"
                        :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :limit="1"
                        :on-success="uploadSuccess" name="excel" :on-error="upLoadErro" :data="uploadeData"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="downLoad"> 下载模板
                        </el-button>
                        <div slot="tip" class="el-upload__tip">上传exe文件</div>
                    </el-upload>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showExplor=false">取消</el-button>
                    <el-button type="primary" @click="submitUpload">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 开放注册时间 -->
            <el-dialog title="设置注册时间" :visible.sync="showTimeDialog">
                <el-form :model="registTime" v-show="showEditTime">
                    <el-form-item label="用户名称">
                        <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="registTime.time"
                            type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                <div slot="footer" class="dialog-footer" v-show="showEditTime">
                    <el-button type="primary" @click="showTimeDialog=false">取消</el-button>
                    <el-button type="primary" @click="submitEditTime">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="管理权限" :visible.sync="powerDiaLog" class="quanxian">
                <template>
                    <!-- <div v-for="(item,index) in powerList" :key="index"> -->
                    <!-- <el-checkbox :indeterminate="isIndeterminate0" v-model="checkAll0" @change="handleCheckAllChange0">
                        {{powerList0.title}}
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedPower0" @change="handleCheckedCitiesChange0">
                        <el-checkbox v-for="(it,ind) in powerList0.note" :label="it.title" :key="ind">{{it.title}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <div>
                        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1"
                            @change="handleCheckAllChange1">
                            {{powerList1.title}}
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedPower1" @change="handleCheckedCitiesChange1">
                            <el-checkbox v-for="(it,ind) in powerList1.note" :label="it.title" :key="ind">{{it.title}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div>
                        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2"
                            @change="handleCheckAllChange2">
                            {{powerList2.title}}
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedPower2" @change="handleCheckedCitiesChange2">
                            <el-checkbox v-for="(it,ind) in powerList2.note" :value="it.id" :label="it.title" :key="ind">{{it.title}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div>
                        <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3"
                            @change="handleCheckAllChange3">
                            {{powerList3.title}}
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedPower3" @change="handleCheckedCitiesChange3">
                            <el-checkbox v-for="(it,ind) in powerList3.note" :label="it.title" :key="ind">{{it.title}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div> -->
                    <div class="checkboxBox">
                        <!-- <div > -->
                            <div v-for="(item,index) in powerList" :key="index" class="grouBg">
                                <div class="checkboxdiv">
                                    <!-- <el-checkbox @change="changeTitle(item)" data-id="item.id"
                                        v-model="powerList[index].checked">{{item.title}}</el-checkbox> -->
                                        {{item.title}}
                                </div>
                                <div class="checkgropBox">
                                    <el-checkbox :data-id="it.id" ref="powerList" :key="ind" :id="it.id+''"
                                        v-for="(it,ind) in item.note" @change="changePower(it)" v-model="it.checked">
                                        {{it.title}}</el-checkbox>
                                </div>
                            </div>
                        <!-- </div> -->

                    </div>
                </template>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="powerDiaLog=false">取消</el-button>
                    <el-button type="primary" @click="submitPower">确 定</el-button>
                </div>


            </el-dialog>

             <!-- 取消子管理 -->
             <el-dialog title="提示" :visible.sync="showCanceManager">
                <div>取消后该用户将失去子管理的权限，是否确认取消？</div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showCanceManager=false">取消</el-button>

                    <el-button type="primary" @click="subimitCancer">确 定</el-button>
                </div>
            </el-dialog>
             <!-- 设为子管理 -->
             <el-dialog title="提示" :visible.sync="showaddManager">
                <div>是否将该用户设为子管理？</div>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showaddManager=false">取消</el-button>

                    <el-button type="primary" @click="subimitAddManager">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
    import request from '@/api/request.js';
    const powerOptions0 = [];
    const powerOptions1 = [];
    const powerOptions2 = [];
    const powerOptions3 = [];
    export default {
        data() {
            return {
                showCanceManager:false,//子管理弹窗
                showaddManager:false,//子管理弹窗
                selectUserId: '',
                checkAll0: false,
                checkAll1: false,
                checkAll2: false,
                checkAll3: false,
                checkedPower: {},
                checkedPower0: [],
                checkedPower1: [],
                checkedPower2: [],
                checkedPower3: [],
                isIndeterminate0: true,
                isIndeterminate1: true,
                isIndeterminate2: true,
                isIndeterminate3: true,
                powerDiaLog: false,
                managerData: [],
                powerList: [],
                powerList0: [],
                powerList1: [],
                powerList2: [],
                powerList3: [],
                selectUsers: [],
                currentPage: 1,
                fileList: [],
                uploadeData: { token: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '' },
                viewUserId: '',
                viewuserInfo: {},
                registTime: {},//注册时间
                showTimeDialog: false,
                showAdd: false,
                showExplor: false,
                showEditTime: true,
                oldTime: {},//设置的注册时间
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
                total: 20,
                psize: 10,
                studentTableData: [
                ],
                teacherTableData: [],
            };
        },
        methods: {
            showpaddManagerDiaLog(item){
                this.selectUserId=item.id;
                this.showaddManager=true;
            },
            showpCancenDiaLog(item){
               
                this.selectUserId=item.id;
                this.showCanceManager=true;
            },
            subimitAddManager(){
                var data={
                    id:this.selectUserId
                }
                request.post('/backapi/Users/editAdmin',data,(res)=>{
                    if(res.code==0){
                        this.showpaddManagerDiaLog=false;
                        this.$message.success('添加成功');
                        this.showaddManager=false;
                        this.handleClick()
                    }
                })
            },
            subimitCancer(){
                var data={
                    id:this.selectUserId
                }
                request.post('/backapi/Users/editAdmin',data,(res)=>{
                    if(res.code==0){
                        this.showpCancenDiaLog=false;
                        this.$message.success('取消成功');
                        this.showCanceManager=false;
                        this.handleClick();
                    }
                })
            },
            submitPower() {
                var powerList = [];

                this.$refs.powerList.forEach((item) => {
                    if (item.isChecked) {
                        powerList.push(item.id);
                    }
                })
                request.post('/backapi/Users/editAuth', { id: powerList }, (res) => {
                    this.powerDiaLog = false;
                    this.$message.success('设置成功');
                })
            },
            changePower: function (val) {
                console.log('val', val);
                console.log(this.$refs.powerList)
            },
            changeTitle: function (val) {
                console.log('val', val);

                // val.checked=!val.checked;
            },
            handleCheckAllChange0(val) {
                console.log('handleCheckAllChange', val)
                this.checkedPower0 = val ? powerOptions0 : [];
                this.isIndeterminate0 = false;
            },
            handleCheckedCitiesChange0(value) {
                // debugger
                console.log('handleCheckedCitiesChange', value)
                let checkedCount = value.length;
                this.checkAll0 = checkedCount === this.powerList0.note.length;
                this.isIndeterminate0 = checkedCount > 0 && checkedCount < this.powerList0.note.length;
            },
            handleCheckAllChange1(val) {
                console.log('handleCheckAllChange', val)
                this.checkedPower1 = val ? powerOptions1 : [];
                this.isIndeterminate1 = false;
            },
            handleCheckedCitiesChange1(value) {
                // debugger
                console.log('handleCheckedCitiesChange', value)
                let checkedCount = value.length;
                this.checkAll1 = checkedCount === this.powerList1.note.length;
                this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.powerList1.note.length;
            },
            handleCheckAllChange2(val) {
                console.log('handleCheckAllChange', val)
                this.checkedPower2 = val ? powerOptions2 : [];
                this.isIndeterminate2 = false;
            },
            handleCheckedCitiesChange2(value) {
                // debugger
                console.log('handleCheckedCitiesChange', value)
                let checkedCount = value.length;
                this.checkAll2 = checkedCount === this.powerList2.note.length;
                this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.powerList2.note.length;
            },
            handleCheckAllChange3(val) {
                console.log('handleCheckAllChange', val)
                this.checkedPower3 = val ? powerOptions3 : [];
                this.isIndeterminate3 = false;
            },
            handleCheckedCitiesChange3(value) {
                // debugger
                console.log('handleCheckedCitiesChange', value)
                let checkedCount = value.length;
                this.checkAll3 = checkedCount === this.powerList3.note.length;
                this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.powerList3.note.length;
            },
            showpowerDiaLog(item) {
                //显示权限窗口
                this.powerDiaLog = true;

            },
            getManagers() {//获取所有权限
                request.post('/backapi/Admin/authList', {}, (res) => {
                    this.powerList = res.data;
                    this.powerList.forEach((item, key) => {
                        //  item.checked=false;
                        item.note.forEach((it, ind) => {
                            //  it.checked=false;
                        })
                    })
                    this.powerList = res.data;
                    // this.powerList0 = res.data[0];
                    // this.powerList1 = res.data[1];
                    // this.powerList2 = res.data[2];
                    // this.powerList3 = res.data[3];

                })
            },
            deleteUsers() {
                var data = this.selectUsers;
                request.post('/backapi/Admin/delete', data, (res) => {
                    this.handleClick();
                })
            },
            handleSelectionChange(val) {
                console.log('val', val)
                this.selectUsers = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.page = val;
                this.handleClick();
            },
            downLoad() {
                var link = document.createElement('a');
                link.setAttribute("download", "");
                link.href = this.$store.state.baseUrl + "/%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls";
                console.log(link);
                link.click();
            },
            uploadSuccess: function (res, file, fileList) {
                console.log('success', res, file, fileList);
                this.$message.success(`共导入 ${res.data.num} 条数据,导入成功 ${res.data.num_c} 失败 ${res.data.num_s}`);
                this.fileList = [];
            },
            submitUpload(file) {
                var token = sessionStorage.getItem('Authorization');
                if (!token) {
                    this.router.push('/login');
                }
                this.uploadeData = { token: token };
                this.$refs.upload.submit();


                this.handleClick();
            },
            upLoadErro(res) {
                this.fileList = [];
                this.$message.error(res);
                console.log('erro', res);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log("handlePreview", file);
            },
            getUserInfo() {
                var data = { id: this.viewUserId }
                request.post('/backapi/Users/Details', data, (res) => {
                    this.viewuserInfo = res.data;
                })
            },
            getTimeregist() {
                request.post('/backapi/Users/reg', {}, (res) => {
                    if (res.data.res_starttime && res.data.res_status != 2) {
                        this.showEditTime = false;
                    } else {
                        this.showEditTime = true;
                        return;
                    }
                    console.log(res);
                    var registtime = { time: [] };
                    registtime.time[0] = res.data.res_starttime
                    registtime.time[1] = res.data.res_endtime;
                    this.registTime = registtime;

                })
            },
            fshowTimeDialog() {
                this.showTimeDialog = true;
                // request.post('/backapi/Users/reg',{},(res)=>{
                //     console.log(res);
                //     var registtime={time:[]};
                //     registtime.time[0]=res.data.res_starttime
                //     registtime.time[1]=res.data.res_endtime;
                //     this.registTime=registtime;
                // })
            },
            fviewDialog(item) {
                this.viewUserId = item.id;
                this.viewDialog = true;
                this.getUserInfo(this.viewUserId);
            },
            feditDialog(item) {
                this.editDialog = true;
                this.editId = item.id;
                this.form=item;
            },
            submitEditTime() {
                console.log(this.registTime);
                var data = {
                    res_status: 1,
                    res_starttime: this.registTime.time[0],
                    res_endtime: this.registTime.time[1],
                }
                request.post('/backapi/Users/editReg', data, (res) => {
                    if (res.code == 0) {
                        this.$message.success('设置成功');
                        this.showEditTime = false;
                    }
                })
            },
            closeRegist() {//关闭注册
                var data = {
                    res_status: 2,
                    res_starttime: this.registTime.time[0],
                    res_endtime: this.registTime.time[1],
                }
                request.post('/backapi/Users/editReg', data, (res) => {
                    if (res.code == 0) {
                        this.$message.success('设置成功');
                        this.showEditTime = true;
                        this.showTimeDialog = false;
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
                            // this.page = this.page + 1;
                            this.total = res.data.total;
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
            this.getManagers();
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