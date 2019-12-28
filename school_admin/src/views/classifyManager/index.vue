<template>
  <div class="classifyManager">
    <el-tabs v-model="activeName" @tab-click="toggleSettingType">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="(item,index) in tabsList"
        :key="index"
      >
        <el-tabs v-model="activeSchool" class="schoolList" @tab-click="switchCampus">
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="(item,index) in schoolList"
            :key="index"
          >
            <div v-show="activeName =='class'" class="flexhalf">
              <div class="halfItem bg_white">
                <div class="tabCard bg_white">小学</div>
                <div class="halfBg">
                  <div class="tabTitle bg_white">
                    <el-button
                      type="primary"
                      class="smallBt"
                      @click="primaryGradeExpandAll"
                    >{{primaryGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                    <el-button type="success" class="smallBt" @click="primaryAddGradeClass">新增年级</el-button>
                  </div>
                  <div
                    class="halfClassItem"
                    v-for="(item,index) in primaryGradeClassData"
                    :key="index"
                  >
                    <div>
                      <template>
                        <div class="gradeContainer">
                          <el-row>
                            <el-col :span="12">
                              <span class="itemInline" @click="primaryExpandItem(item,index)">
                                <i v-show="item.isOpen" class="el-icon-caret-bottom"></i>
                                <i v-show="!item.isOpen" class="el-icon-caret-right"></i>
                                {{item.title}}
                              </span>
                              <span v-if="item.name" class="itemInline">审核人：{{item.name}}</span>
                              <span v-else class="itemInline">暂无审核人</span>
                            </el-col>
                            <el-col :span="12">
                              <span class="smallInline" @click="clickAddClassBtn(item)">添加班级</span>
                              <span v-if="item.name" class="smallInline" @click="changeReviewerClick(item)">更改审核人</span>
                              <span v-else class="smallInline" @click="setReviewerClick(item)">设置审核人</span>
                              <span class="smallInline" @click="editGradeClick(item)">编辑</span>
                              <span class="smallInline" @click="deleteGrade(item)">删除</span>
                            </el-col>
                          </el-row>
                          <!-- 班级 -->
                          <div v-show="item.isOpen">
                            <el-row v-for="(it,ind) in item.class" :key="ind">
                              <el-col :span="12">
                                <span class="itemInline">{{it.title}}</span>
                                <span v-if="it.name" class="itemInline">班主任：{{it.name}}</span>
                                <span v-else class="itemInline">暂无班主任</span>
                              </el-col>
                              <el-col :span="12">
                                <span class="smallInline"></span>
                                <span v-if="it.name" class="smallInline" @click="changeHeadmasterClick(it)">更改班主任</span>
                                <span v-else class="smallInline" @click="setHeadmasterClick(it)">设置班主任</span>
                                <span class="smallInline" @click="editClassClick(item)">编辑</span>
                                <span class="smallInline" @click="deleteClass(item)">删除</span>
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
                    <el-button
                      type="primary"
                      class="smallBt"
                      @click="middleGradeExpandAll"
                    >{{middleGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                    <el-button type="success" class="smallBt">新增年级</el-button>
                  </div>

                  <div
                    class="halfClassItem"
                    v-for="(item,index) in middleGradeClassData"
                    :key="index"
                  >
                    <div>
                      <template>
                        <div class="gradeContainer">
                          <el-row>
                            <el-col :span="12">
                              <span class="itemInline" @click="middleExpandItem(item,index)">
                                <i v-show="item.isOpen" class="el-icon-caret-bottom"></i>
                                <i v-show="!item.isOpen" class="el-icon-caret-right"></i>
                                {{item.title}}
                              </span>
                              <span v-if="item.name" class="itemInline">审核人：{{item.name}}</span>
                              <span v-else class="itemInline">暂无审核人</span>
                            </el-col>
                            <el-col :span="12">
                              <span class="smallInline">添加班级</span>
                              <span v-if="item.name" class="smallInline">更改审核人</span>
                              <span v-else class="smallInline">设置审核人</span>
                              <span class="smallInline">编辑</span>
                              <span class="smallInline">删除</span>
                            </el-col>
                          </el-row>
                          <!-- 班级 -->
                          <div v-show="item.isOpen">
                            <el-row v-for="(it,ind) in item.class" :key="ind">
                              <el-col :span="12">
                                <span class="itemInline">{{it.title}}</span>
                                <span v-if="it.name" class="itemInline">班主任：{{it.name}}</span>
                                <span v-else class="itemInline">暂无班主任</span>
                              </el-col>
                              <el-col :span="12">
                                <span class="smallInline"></span>
                                <span v-if="it.name" class="smallInline">更改班主任</span>
                                <span v-else class="smallInline">设置班主任</span>
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
          <el-button>添加栏目</el-button>
          <div class="bgcchildren">
            <div class="bgculumns">
              <el-button>
                栏目1
                <i class="el-icon-delete"></i> |
                <i class="el-icon-edit-outline el-icon--right"></i>
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增年级 -->
    <el-dialog
      title="添加年级"
      :visible.sync="addGradeDialog"
      width="30%"
      @close="closeGradeDialog('addGradeRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addGradeDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('addGrade')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="addGradeRuleForm"
        :rules="addGradeRules"
        ref="addGradeRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="级别">
          <el-radio-group v-model="addGradeRuleForm.level">
            <el-radio :label="0">年级</el-radio>
            <!-- <el-radio :label="1">班级</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年级名称" prop="gradeName">
          <el-input v-model="addGradeRuleForm.gradeName"></el-input>
        </el-form-item>
        <el-form-item label="年级审核人">
          <el-input v-model="addGradeRuleForm.gradeReviewer" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddGrade('addGradeRuleForm')">确 认</el-button>
          <el-button @click="closeGradeDialog('addGradeRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加班级弹框 -->
    <el-dialog
      title="添加班级"
      :visible.sync="addClassDialog"
      width="30%"
      @close="closeClassDialog('addClassRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('addClass')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="addClassRuleForm"
        :rules="addClassRules"
        ref="addClassRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="级别">
          <el-radio-group v-model="addClassRuleForm.level">
            <!-- <el-radio :label="0">年级</el-radio> -->
            <el-radio :label="1">班级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级年级" prop="superiorGrade">
          <el-input v-model="addClassRuleForm.superiorGrade" readonly style="width:70%;"></el-input>
          <!-- <el-select v-model="addClassRuleForm.superiorGrade" placeholder="请选择上级年级">
            <el-option
              v-for="(item,index) in superiorGradeList"
              :key="index"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="addClassRuleForm.className"></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-input v-model="addClassRuleForm.headmaster" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddClass('addClassRuleForm')">确 认</el-button>
          <el-button @click="closeClassDialog('addClassRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 设置审核人 -->
    <el-dialog
      title="设置审核人"
      :visible.sync="setReviewerDialog"
      width="30%"
      @close="closeSetReviewer('setReviewerRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="setReviewerRuleForm"
        :rules="setReviewerRules"
        ref="setReviewerRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="dialogTitle">
            <el-col :span="24">
                <span>小学20</span><span>{{setReviewerRuleForm.gradeNameTitle}}</span>
            </el-col>
        </el-row>
        <el-form-item label="年级审核人" prop="gradeReviewerName">
          <el-input v-model="setReviewerRuleForm.gradeReviewerName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmSetReviewer('setReviewerRuleForm')">确 认</el-button>
          <el-button @click="closeSetReviewer('setReviewerRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 更改审核人 -->
    <el-dialog
      title="更改审核人"
      :visible.sync="changeReviewerDialog"
      width="30%"
      @close="closeChangeReviewer('changeReviewerRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('changeReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="changeReviewerRuleForm"
        :rules="changeReviewerRules"
        ref="changeReviewerRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="dialogTitle">
            <el-col :span="24">
                <span>小学20</span><span>{{changeReviewerRuleForm.gradeNameTitle}}</span>
            </el-col>
        </el-row>
        <el-form-item label="年级审核人" prop="gradeReviewerName">
          <el-input v-model="changeReviewerRuleForm.gradeReviewerName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmChangeReviewer('changeReviewerRuleForm')">确 认</el-button>
          <el-button @click="closeChangeReviewer('changeReviewerRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑年级 -->
    <el-dialog title="编辑年级" width="30%" :visible.sync="editGradeClassDialog" @close="closeEditGradeClassDialog('editGradeClassRuleForm')">
        <el-form :model="editGradeClassRuleForm" :rules="editGradeClassRules" ref="editGradeClassRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="年级名称" prop="name">
                <el-input v-model="editGradeClassRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmEditGradeClass('editGradeClassRuleForm')">确 认</el-button>
                <el-button @click="closeEditGradeClassDialog('editGradeClassRuleForm')">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 设置班主任 -->
    <el-dialog
      title="设置班主任"
      :visible.sync="setHeadmasterDialog"
      width="30%"
      @close="closeSetHeadmaster('setHeadmasterRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setHeadmaster')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="setHeadmasterRuleForm"
        :rules="setHeadmasterRules"
        ref="setHeadmasterRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="dialogTitle">
            <el-col :span="24">
                <span>{{setHeadmasterRuleForm.classNameTitle}}</span>
            </el-col>
        </el-row>
        <el-form-item label="班主任" prop="headmasterName">
          <el-input v-model="setHeadmasterRuleForm.headmasterName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmSetHeadmaster('setHeadmasterRuleForm')">确 认</el-button>
          <el-button @click="closeSetHeadmaster('setHeadmasterRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 更改班主任 -->
    <el-dialog
      title="更改班主任"
      :visible.sync="changeHeadmasterDialog"
      width="30%"
      @close="closeChangeHeadmaster('changeHeadmasterRuleForm')"
    >
      <el-dialog
        width="30%"
        :visible.sync="searchClickDialog"
        append-to-body
        class="searchUserDialog"
      >
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchUserName" placeholder="请输入姓名或账号"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:2%;">
            <el-button style="width:90%;" type="primary" @click="searchListClick">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p class="searchTip">提示：搜索结果只展示已注册用户，如果没有搜索到要找的用户，请到用户管理里去先添加该用户。</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul class="userList">
              <li v-for="(item,index) in searchUseerList" :key="index">
                <el-radio v-model="checkedVal" :label="item.id" class="radioWidth">{{item.name}}</el-radio>
                <span>{{item.mobile}}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('changeHeadmaster')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form
        :model="changeHeadmasterRuleForm"
        :rules="changeHeadmasterRules"
        ref="changeHeadmasterRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="dialogTitle">
            <el-col :span="24">
               <span>{{changeHeadmasterRuleForm.classNameTitle}}</span>
            </el-col>
        </el-row>
        <el-form-item label="班主任" prop="headmasterName">
          <el-input v-model="changeHeadmasterRuleForm.headmasterName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmChangeHeadmaster('changeHeadmasterRuleForm')">确 认</el-button>
          <el-button @click="closeChangeHeadmaster('changeHeadmasterRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

     <!-- 编辑班级 -->
    <el-dialog title="编辑班级" width="30%" :visible.sync="editClassDialog" @close="closeEditClassDialog('editClassRuleForm')">
        <el-form :model="editClassRuleForm" :rules="editClassRules" ref="editClassRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="班级名称" prop="name">
                <el-input v-model="editClassRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmEditClass('editClassRuleForm')">确 认</el-button>
                <el-button @click="closeEditClassDialog('editClassRuleForm')">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>
<style scoped>
@import "./../../assets/css/classifyManager.css";
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

.searchUserDialog .el-dialog .el-dialog__body {
  height: 300px;
}
.searchUserDialog .searchTip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(164, 104, 104, 1);
  line-height: 20px;
}
.searchUserDialog .userList {
  width: 100%;
  height: 220px;
  overflow: scroll;
}
.searchUserDialog .userList li {
  margin-bottom: 5px;
  padding-left: 19px;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  color: #333;
  background: rgba(242, 242, 242, 1);
}
.searchUserDialog .userList li .radioWidth {
  width: 100px;
}
.dialogTitle{
    margin-bottom: 25px;
    padding-left: 17px;
    font-size: 17px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 33px;
}
</style>
<script>
import request from "@/api/request.js";
export default {
  data() {
    return {
      activeName: "class", //默认 是班级设置 tab项
      activeSchool: "east", //默认是 东区 设置项
      tabsList: [
        { name: "class", label: "班级设置" },
        { name: "team", label: "社团设置" },
        { name: "topic", label: "课题组" },
        { name: "teaching", label: "教研组" }
      ],
      schoolList: [
        { name: "east", label: "东区" },
        { name: "west", label: "西区" },
        { name: "south", label: "南区" }
      ],
      primaryGradeClassIsOpen: false, //年级班级 小学 展开项 是否全部展开了
      middleGradeClassIsOpen: false, //年级班级 初中 展开项 是否全部展开了
      primaryGradeClassData: {}, //年级班级数据 小学  东区 西区 南区
      middleGradeClassData: {}, //年级班级数据 初中  东区 西区 南区

      // 班级设置 弹窗部分
      // 新增年级 弹窗 --start
      addGradeDialog: false, //新增年级弹窗
      addGradeRuleForm: {
        //新增年级弹窗 内容绑定值
        level: 0, // 级别  默认年级
        gradeName: "", //年级名称
        gradeReviewer: "" //年级审核人
      },
      addGradeRules: {
        //新增年级弹窗 验证规则
        gradeName: [
          { required: true, message: "请输入年级名称", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
        // gradeReviewer: [
        //     { required: true, message: '年级审核人不能为空', trigger: 'blur' }
        // ],
      },
      // 新增年级 弹窗 --end

      // 通用部分 start
      searchClickDialog: false, //新增年级弹窗  --年级审核人 --点击查找 出现下面的查询弹窗
      searchUserName: "", //用户查询弹窗下的 搜索字段
      searchUseerList: [], //搜索的用户列表
      checkedVal: "", //选中的用户 id 审核人id 班主任 id 审核人id
      filterUser: {}, //保留选中的审核人 班主任 等 id和名字
      //通用部分 --end

      // 新增班级 弹窗 --start
      addClassDialog: false, //新增班级弹窗
      addClassRuleForm: { //新增班级弹窗 内容绑定值
        level: 1, // 级别  默认班级
        superiorGradeId: '',//上级年级 id
        superiorGrade: "", //上级年级 名称
        className: "", //班级名称
        headmaster: "" //班主任
      },
      addClassRules: {
        //新增班级弹窗 验证规则
        superiorGrade: [
          { required: true, message: "请选择上级年级", trigger: "change" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
      },
      // 新增班级 弹窗 --end

      superiorGradeList: [], //上级年级列表  通用 咱没使用
     
      // 班级设置-东区 小学  设置审核人 --start
      setReviewerDialog: false, //点击 设置审核人 出现弹窗
      setReviewerRuleForm: { //设置审核人 绑定值
        gradeNameTitle: '', //年级名称
        gradeReviewerName: '', //年级审核人名称
        gradeReviewerId: '' // 年级审核人id
      },
      setReviewerRules: { //设置审核人弹窗 验证规则
        gradeReviewerName: [
          { required: true, message: "请设置年级审核人", trigger: "blur" }
        ]
      },
      // 班级设置-东区 小学  设置审核人 --end

       // 班级设置-东区 小学  更改审核人 --start
      changeReviewerDialog: false, //点击 更改审核人 出现弹窗
      changeReviewerRuleForm: { //更改审核人 绑定值
        gradeNameTitle: '', //年级名称
        gradeReviewerName: '', //年级审核人名称
        gradeReviewerId: '' // 年级审核人id
      },
      changeReviewerRules: { //更改审核人弹窗 验证规则
        gradeReviewerName: [
          { required: true, message: "请设置要更改的年级审核人", trigger: "blur" }
        ]
      },
      // 班级设置-东区 小学  更改审核人 --end

      //编辑 年级 班级 部分 开始
      editGradeClassDialog: false, //编辑弹窗
      editGradeClassRuleForm: {
        gradeId: '',//年级id
        name: '' ,//名称
      },
      editGradeClassRules: { //编辑年级 班级 验证规则
        name: [
          { required: true, message: "请输入年级名称", trigger: "blur" }
        ]
      },
      //编辑 年级 班级 部分 结束

      // 班级---设置班主任 --start
      setHeadmasterDialog: false, //点击 设置班主任 出现弹窗
      setHeadmasterRuleForm: { //设置班主任  绑定值
        classNameTitle: '', //班级信息
        headmasterName: '', //班主任名字
        headmasterId: '' // 班主任id
      },
      setHeadmasterRules: { //设置审核人弹窗 验证规则
        headmasterName: [
          { required: true, message: "请设置班主任", trigger: "blur" }
        ]
      },
      // 班级---设置班主任 --end

      // 班级---更改班主任 --start
      changeHeadmasterDialog: false, //点击 更改班主任 出现弹窗
      changeHeadmasterRuleForm: { //更改班主任  绑定值
        classNameTitle: '', //班级信息
        headmasterName: '', //班主任名字
        headmasterId: '' // 班主任id
      },
      changeHeadmasterRules: { //更改审核人弹窗 验证规则
        headmasterName: [
          { required: true, message: "请设置要更改的班主任", trigger: "blur" }
        ]
      },
      // 班级---更改班主任 --end

      //编辑班级 班级 部分 开始
      editClassDialog: false, //编辑弹窗
      editClassRuleForm: {
        classId: '',//班级id
        name: '' ,//名称
      },
      editClassRules: { //编辑班级 班级 验证规则
        name: [
          { required: true, message: "请输入年级名称", trigger: "blur" }
        ]
      },
      //编辑班级 班级 部分 结束

    };
  },
  methods: {
     //页面数据部分
    toggleSettingType(tab) { //主页面---点击切换设置类型  班级 社团设置
      console.log(tab, event);
      switch (tab.name) {
        case "class": //班级设置
          this.getGradeClassData();
          break;
        case "team": //社团设置
          console.log("点击了社团设置");
          break;
        case "topic": //课题组
          console.log("点击了课题组");
          break;
        case "teaching": //教研组
          console.log("点击了教研组");
          break;
        default:
      }
    },
    getGradeClassData(area) {   // 班级设置--获取年级班级数据
      var url = "";
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
      request.post(url, {}, res => {
        if (res.code == 0) {
          self.primaryGradeClassData = res.data.small.map(item => {
            item.isOpen = false; //默认折叠
            return item;
          }); //小学的年级班级数据
          self.middleGradeClassData = res.data.Junior.map(item => {
            item.isOpen = false;
            return item;
          }); //中学的年级班级数据
          console.log("小学年级班级数据列表", self.primaryGradeClassData);
          console.log("中学年级班级数据列表", self.middleGradeClassData);
        }
      });
    },
    primaryGradeExpandAll() { // 班级设置--东区里面 小学 点击了展开全部 折叠 全部
      this.primaryGradeClassIsOpen = !this.primaryGradeClassIsOpen;
      this.primaryGradeClassData = this.primaryGradeClassData.map(item => {
        item.isOpen = !item.isOpen;
        return item;
      }); //小学的年级班级数据
    },
    primaryExpandItem(item, index) {  //班级设置--东区里面 小学 点击了某一年级的展开项
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
      }); //小学的年级班级数据
    },
    middleExpandItem(item, index) { //  班级设置--东区里面 小学 点击了某一年级的展开项
      if (item.isOpen) {
        this.middleGradeClassData[index].isOpen = false;
      } else {
        this.middleGradeClassData[index].isOpen = true;
      }
    },

    // 班级设置部分
    //东区   西区 南区 判断  activeSchool: 'east',
    switchCampus(val) {
      //点击切换
      console.log(val, "点击班级设置里面的切换校区");
      this.getGradeClassData(val.name);
    }, 

    //班级设置--东区里面 小学 点击新增年级  ---start
    primaryAddGradeClass() { //班级设置--东区里面 小学 点击新增年级按钮
      this.addGradeRuleForm.gradeName = ""; //清空年级名称
      this.addGradeRuleForm.gradeReviewer = ""; //年级审核人
      this.addGradeDialog = true;
    },
    confirmAddGrade(ruleForm) {  //新增年级 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            s_id: self.primaryGradeClassIsOpen[0].s_id, //校区id 小学
            l_id: self.primaryGradeClassIsOpen[0].l_id, //校部id  小学 初中
            title: self.addGradeRuleForm.gradeName, //	年级名称
            u_id: self.checkedVal, //审核员id
            name: self.addGradeRuleForm.gradeReviewer //审核员名字
          };
          request.post("/backapi/Classify/addGrade", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.addGradeDialog = false;
                this.getGradeClassData();
            }
          });
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
    //班级设置--东区里面 小学 点击新增年级  ---end


    //用户查询弹窗 通用--start
    searchUserClick() {  //新增年级弹窗  --年级审核人 --点击查找 新增班级  设置审核人 出现下面的查询弹窗
      this.searchClickDialog = true; //内层弹窗出现
    },
    searchListClick() {  //内层弹窗中点击 查询按钮 通用
      this.getSearchUserList();
    },
    // 查询弹窗 用户搜索接口 获取查询到的用户列表  班主任查询 也是  通用
    getSearchUserList() { //获取查询到的用户列表
      var data = {
        keyword: this.searchUserName, //关键字 （传空显示全部）
        page: 1
      };
      request.post("/backapi/Classify/User", data, res => {
        if (res.code == 0) {
          if (res.data.model.length > 0) {
            this.searchUseerList = res.data.model;
          }
        }
      });
    },
    confirmUserName(val) { //查询用户的弹窗 确认按钮 通用
      console.log(val, "点击查询用户确认弹窗是什么类型");
      this.searchClickDialog = false;
      console.log(this.checkedVal, "选中的审核人id值是什么");
      const receiveArr = this.searchUseerList.filter(item => {
        return item.id == this.checkedVal;
      });
      this.filterUser = receiveArr[0];
      console.log(this.filterUser, "筛选出匹配的用户名称和id集合");
      if (val == "addGrade") { //如果是新增年级
        this.addGradeRuleForm.gradeReviewer = this.filterUser.name; //审核人名称
      } else if (val == "addClass") { //如果是新增班级
        this.addClassRuleForm.headmaster = this.filterUser.name; //班主任姓名
      } else if(val == 'setReviewer'){ //如果是设置审核人
        this.setReviewerRuleForm.gradeReviewerName = this.filterUser.name; //年级审核员姓名
      } else if(val == 'changeReviewer'){ //如果是更改审核人
        this.changeReviewerRuleForm.gradeReviewerName = this.filterUser.name; //年级更改后审核员姓名
      } else if(val == 'setHeadmaster'){ //如果是设置班主任
        this.setHeadmasterRuleForm.headmasterName = this.filterUser.name; //设置班主任的名字
      } else if(val == 'changeHeadmaster'){ //如果是更改班主任
        this.changeHeadmasterRuleForm.headmasterName = this.filterUser.name; //更改后班主任的名字
      }
    },
    //用户查询弹窗 通用--end

    //新增班级 部分-start
    clickAddClassBtn(item) {// 东区 --小学 点击某一年级的新增班级按钮
      //点击新增班级 出现弹窗
      console.log(item, "东区-小学--点击添加班级--得到该年级信息");
      this.addClassRuleForm.superiorGradeId = item.id;//上级年级 id
      this.addClassRuleForm.superiorGrade = item.title;//上级年级名字
      this.addClassRuleForm.className = "";
      this.addClassRuleForm.headmaster = "";
      this.addClassDialog = true;
    //   this.getSuperiorGradeList();
    },
    getSuperiorGradeList() {  //获取上级年级 列表  通用
      var params = {
        type: "1" //1东区小学2东区初中3西区小学4西区初中5南区小学6南区初中
      };
      request.post("/backapi/Classify/grade", params, res => {
        if (res.code == 0) {
          this.superiorGradeList = res.data;
        }
      });
    },
    confirmAddClass(ruleForm) {  // 东区 --小学 新增班级-- 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            s_id: self.primaryGradeClassIsOpen[0].s_id, //校区id 小学
            l_id: self.addClassRuleForm.superiorGradeId, //年级id
            title: self.addClassRuleForm.className, //	班级名称
            u_id: self.checkedVal, //班主任id
            name: self.addClassRuleForm.headmaster //班主任名字
          };
          request.post("/backapi/Classify/addClass", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.addClassDialog = false;
                this.getGradeClassData();
            }
          });
        } else {
          return false;
        }
      });
    },
    closeClassDialog(ruleForm) {  //东区 --小学 新增班级 弹窗 关闭 取消 遮罩  空白处
      this.addClassDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    addClassSarchUserClick() { //东区 --小学 新增班级弹窗  --班主任 --点击查找 出现下面的查询弹窗
      this.searchClickDialog = true; //内层搜索班主任  弹窗出现
    },
    //新增班级 部分-end

    //东区 --小学 点击某一年级中的 设置审核人  --start
    setReviewerClick(item){ //东区 --小学 点击某一年级 设置审核人 出现弹窗
        console.log(item, "东区-小学--点击设置审核人--得到该年级信息");
        this.setReviewerRuleForm.gradeNameTitle = item.title; //审核的年级名称
        this.setReviewerRuleForm.gradeReviewerId = item.id;// 年级id
        this.setReviewerRuleForm.gradeReviewerName = ''; //清空年级审核人
        this.setReviewerDialog = true;
    },
    confirmSetReviewer(ruleForm) {  // 东区 --小学 设置审核人-- 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            id: self.setReviewerRuleForm.gradeReviewerId, //年级id
            u_id: self.checkedVal, //用户id
            name: self.setReviewerRuleForm.gradeReviewerName //姓名
          };
          request.post("/backapi/Classify/editGradeuser", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.setReviewerDialog = false;
                this.getGradeClassData();
            }
          });
        } else {
          return false;
        }
      });
    },
    closeSetReviewer(ruleForm) {  //东区 --小学 设置审核人 弹窗 关闭 取消 遮罩  空白处
      this.setReviewerDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    //东区 --小学 点击某一年级中的 设置审核人  --end

    //东区 --小学 点击某一年级中的 更改审核人  --start
    changeReviewerClick(item){ //东区 --小学 点击某一年级 设置审核人 出现弹窗
        console.log(item, "东区-小学--点击更改审核人--得到该年级信息");
        this.changeReviewerRuleForm.gradeNameTitle = item.title; //审核的年级名称
        this.changeReviewerRuleForm.gradeReviewerId = item.id;// 年级id
        this.changeReviewerRuleForm.gradeReviewerName = ''; //清空年级审核人
        this.changeReviewerDialog = true;
    },
    confirmChangeReviewer(ruleForm) {  // 东区 --小学 更改审核人-- 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            id: self.changeReviewerRuleForm.gradeReviewerId, //年级id
            u_id: self.checkedVal, //用户id
            name: self.changeReviewerRuleForm.gradeReviewerName //姓名
          };
          request.post("/backapi/Classify/editGradeuser", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.changeReviewerDialog = false;
                this.getGradeClassData();
            }
          });
        } else {
          return false;
        }
      });
    },
    closeChangeReviewer(ruleForm) {  //东区 --小学 更改审核人 弹窗 关闭 取消 遮罩  空白处
      this.changeReviewerDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    //东区 --小学 点击某一年级中的 更改审核人  --end

    //东区 --小学 点击某一年级中的 编辑年级  --start
    editGradeClick (item) { //编辑年级 
        console.log(item,'得到当前年级信息');
        this.editGradeClassRuleForm.gradeId = item.id; //年级id
        this.editGradeClassRuleForm.name = '';//清空编辑 年级 班级名称
        this.editGradeClassDialog = true;
    },
    confirmEditGradeClass(ruleForm) {  // 东区 --小学 编辑年级 班级 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
            if (valid) {
            var self = this;
            let data = {
                id: self.editGradeClassRuleForm.gradeId, //年级id
                title: self.editGradeClassRuleForm.name, //年级名称
            };
            request.post("/backapi/Classify/editGrade", data, function(res) {
                if (res.code == 0) {
                    self.$message({
                        type: "success",
                        message: res.message
                    });
                    self.editGradeClassDialog = false;
                    this.getGradeClassData();
                }
            });
            } else {
                return false;
            }
        });
    },
    closeEditGradeClassDialog(ruleForm) {  //东区 --小学 编辑班级 弹窗 关闭 取消 遮罩  空白处
      this.editGradeClassDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    //东区 --小学 点击某一年级中的 编辑年级  --end

    //东区 --小学  点击某一年级 删除年级 --start
    deleteGrade(item) {
        var _that = this;
        _that.$confirm("是否删除该年级，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
            let data = {
                id: item.id, //年级id
            };
            request.post("/backapi/Classify/delGrade", data, function(res) {
                if (res.code == 0) {
                    _that.$message({
                        type: "success",
                        message: res.message
                    });
                    this.getGradeClassData();
                }
            });
        })
        .catch(() => {
          _that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //东区 --小学  点击某一年级 删除年级 --start

    //东区 --小学 点击某一年级中的 班级---设置班主任 --start
    setHeadmasterClick(item){ //东区 --小学 点击某一年级 设置审核人 出现弹窗
        console.log(item, "东区-小学--点击某年纪下某班级--得到该班级信息");
        this.setHeadmasterRuleForm.classNameTitle = item.title; //班级名称信息
        this.setHeadmasterRuleForm.headmasterId = item.id;// 班级id
        this.setHeadmasterRuleForm.headmasterName = ''; //班主任名称
        this.setHeadmasterDialog = true;
    },
    confirmSetHeadmaster(ruleForm) {  // 东区 --小学 班级 设置班主任-- 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            id: self.setHeadmasterRuleForm.headmasterId, //班级id
            u_id: self.checkedVal, //用户id 班主任
            name: self.setHeadmasterRuleForm.headmasterName //班主任名字
          };
          request.post("/backapi/Classify/editClassuser", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.setHeadmasterDialog = false;
                this.getGradeClassData();
            }
          });
        } else {
          return false;
        }
      });
    },
    closeSetHeadmaster(ruleForm) {  //东区 --小学 设置班主任 弹窗 关闭 取消 遮罩  空白处
      this.setHeadmasterDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    ///东区 --小学 点击某一年级中的 班级---设置班主任 --end

     //东区 --小学 点击某一年级中的 班级---更改班主任 --start
    changeHeadmasterClick(item){ //东区 --小学 点击某一年级 更改审核人 出现弹窗
        console.log(item, "东区-小学--点击某年纪下某班级--得到该班级信息");
        this.changeHeadmasterRuleForm.classNameTitle = item.title; //班级名称信息
        this.changeHeadmasterRuleForm.headmasterId = item.id;// 班级id
        this.changeHeadmasterRuleForm.headmasterName = ''; //班主任名称
        this.changeHeadmasterDialog = true;
    },
    confirmChangeHeadmaster(ruleForm) {  // 东区 --小学 班级 更改班主任-- 弹窗 确认按钮
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var self = this;
          let data = {
            id: self.changeHeadmasterRuleForm.headmasterId, //班级id
            u_id: self.checkedVal, //用户id 班主任
            name: self.changeHeadmasterRuleForm.headmasterName //班主任名字
          };
          request.post("/backapi/Classify/editClassuser", data, function(res) {
            if (res.code == 0) {
                self.$message({
                    type: "success",
                    message: res.message
                });
                self.changeHeadmasterDialog = false;
                this.getGradeClassData();
            }
          });
        } else {
          return false;
        }
      });


    },
    closeChangeHeadmaster(ruleForm) {  //东区 --小学 更改班主任 弹窗 关闭 取消 遮罩  空白处
      this.changeHeadmasterDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    ///东区 --小学 点击某一年级中的 班级---更改班主任 --end

    //东区 --小学 点击某一年级中的 编辑班级  --start
    editClassClick (item) { //编辑班级
        console.log(item,'得到点击的班级信息');
        this.editClassRuleForm.classId = item.id; //班级id
        this.editClassRuleForm.name = '';//清空编辑 班级名称
        this.editClassDialog = true;
    },
    confirmEditClass(ruleForm) {  // 东区 --小学 编辑班级 班级 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
            if (valid) {
            var self = this;
            let data = {
                id: self.editClassRuleForm.classId, //班级id
                title: self.editClassRuleForm.name, //班级名称
            };
            request.post("/backapi/Classify/editGrade", data, function(res) {
                if (res.code == 0) {
                    self.$message({
                        type: "success",
                        message: res.message
                    });
                    self.editClassDialog = false;
                    this.getGradeClassData();
                }
            });
            } else {
                return false;
            }
        });
    },
    closeEditClassDialog(ruleForm) {  //东区 --小学 编辑班级 弹窗 关闭 取消 遮罩  空白处
      this.editClassDialog = false;
      this.$nextTick(() => {
        this.$refs[ruleForm].resetFields();
      });
    },
    //东区 --小学 点击某一年级中的 编辑年级  --end

    //东区 --小学  点击某一年级 删除班级 --start
    deleteClass(item) {
        var _that = this;
        _that.$confirm("是否删除该班级，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
            let data = {
                id: item.id, //班级id
            };
            request.post("/backapi/Classify/delClass", data, function(res) {
                if (res.code == 0) {
                    _that.$message({
                        type: "success",
                        message: res.message
                    });
                    this.getGradeClassData();
                }
            });
        })
        .catch(() => {
          _that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    
  },
  mounted() {
    this.getGradeClassData();
    // this.getGradeClassData(this.activeSchool);
  }
};
</script>