<template>
  <div class="classifyManager">
    <el-tabs v-model="activeName" @tab-click="toggleSettingType">
      <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in tabsList" :key="index">
        <el-tabs v-model="activeSchool" class="schoolList" @tab-click="switchCampus">
          <el-tab-pane :label="item.label" :name="item.name" :id="item.id" v-for="(item,index) in schoolList"
            :key="index">
            <div v-show="activeName =='class'" class="flexhalf">
              <div class="halfItem bg_white">
                <div class="tabCard bg_white">小学</div>
                <div class="halfBg">
                  <div class="tabTitle bg_white">
                    <el-button type="primary" class="smallBt" @click="primaryGradeExpandAll">
                      {{primaryGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                    <el-button type="success" class="smallBt" @click="addGradeClassClick(1)">新增年级</el-button>
                  </div>
                  <div class="halfClassItem" v-for="(item,index) in primaryGradeClassData" :key="index">
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
                              <span class="smallInline" @click="clickAddClassBtn(item,1)">添加班级</span>
                              <span v-if="item.name" class="smallInline"
                                @click="changeReviewerClick(item,1)">更改审核人</span>
                              <span v-else class="smallInline" @click="setReviewerClick(item, 1)">设置审核人</span>
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
                    <el-button type="primary" class="smallBt" @click="middleGradeExpandAll">
                      {{middleGradeClassIsOpen?'折叠全部':'展开全部'}}</el-button>
                    <el-button type="success" class="smallBt" @click="addGradeClassClick(2)">新增年级</el-button>
                  </div>

                  <div class="halfClassItem" v-for="(item,index) in middleGradeClassData" :key="index">
                    <div v-show="item.id">
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
                              <span class="smallInline" @click="clickAddClassBtn(item,2)">添加班级</span>
                              <span v-if="item.name" class="smallInline"
                                @click="changeReviewerClick(item,2)">更改审核人</span>
                              <span v-else class="smallInline" @click="setReviewerClick(item, 2)">设置审核人</span>
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
                                <span class="smallInline" @click="editClassClick(it)">编辑</span>
                                <span class="smallInline" @click="
                                (item)">删除</span>
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
            <div v-show="activeName =='team'">
              <div class="halfItem bg_white">
                <div class="halfBg">
                  <div class="tabTitle bg_white">
                    <div class="leftSection">
                      <el-button type="primary" class="smallBt" @click="setTeamExpandAll">
                        {{setTeamIsPageOpen?'折叠全部':'展开全部'}}</el-button>
                      <el-button type="success" class="smallBt" @click="addTeamClick">新增社团</el-button>
                    </div>
                    <div class="rightSection">
                      <el-badge :value="teamApplicationProcessList.length">
                        <el-button type="primary" class="applyBtn" @click="teamApplicationProcess">社团申请处理</el-button>
                      </el-badge>

                    </div>
                  </div>
                  <div class="halfClassItem" v-for="(item,index) in setTeamPageData" :key="index">
                    <div>
                      <template>
                        <div class="gradeContainer">
                          <el-row>
                            <el-col :span="12">
                              <span class="itemInline" @click="setTeamExpandItem(item,index)">
                                <i v-show="item.isOpen" class="el-icon-caret-bottom"></i>
                                <i v-show="!item.isOpen" class="el-icon-caret-right"></i>
                                {{item.title}}
                              </span>
                              <span v-if="item.cj_name" class="itemInline">发布人：{{item.cj_name}}</span>
                              <span v-else class="itemInline">暂无发布人</span>
                              <span v-if="item.name" class="itemInline">审核人：{{item.name}}</span>
                              <span v-else class="itemInline">暂无审核人</span>
                            </el-col>
                            <el-col :span="12" class="rightSection">
                              <span class="smallInline" @click="teamSetAddUserClick(item)">添加用户</span>
                              <span class="smallInline" @click="editTeamNameClick(item)">编辑</span>
                              <span class="smallInline" @click="deleteTeamClick(item)">删除</span>
                            </el-col>
                          </el-row>
                          <!-- 社团 -->
                          <div v-show="item.isOpen">
                            <el-row v-for="(it,ind) in item.member" :key="ind">
                              <el-col :span="12">
                                <span class="itemInline">{{it.name}}</span>
                                <span v-if="it.sh == 1" class="itemInline">审核人</span>
                              </el-col>
                              <el-col :span="12" class="rightSection">
                                <span class="smallInline"></span>
                                <span v-if="it.sh == 0" class="smallInline"
                                  @click="teamSetReviewerClick(item)">设为审核人</span>
                                <span class="smallInline" @click="showUserDialog(it)">详情</span>
                                <span class="smallInline" @click="deleteTeamUser(it)">删除</span>
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
            <div v-show="activeName =='topic'">
              <div class="halfItem bg_white">
                <div class="halfBg">
                  <div class="tabTitle bg_white">
                    <div class="leftSection">
                      <el-button type="primary" class="smallBt" @click="setTopicExpandAll">
                        {{setTopicIsPageOpen?'折叠全部':'展开全部'}}</el-button>
                      <el-button type="success" class="smallBt" @click="addTopicClick">新增课题组</el-button>
                    </div>
                  </div>
                  <div class="halfClassItem" v-for="(item,index) in setTopicPageData" :key="index">
                    <div>
                      <template>
                        <div class="gradeContainer">
                          <el-row>
                            <el-col :span="12">
                              <span class="itemInline" @click="setTopicExpandItem(item,index)">
                                <i v-show="item.isOpen" class="el-icon-caret-bottom"></i>
                                <i v-show="!item.isOpen" class="el-icon-caret-right"></i>
                                {{item.title}}
                              </span>
                              <!-- <span v-if="item.name" class="itemInline">发布人：{{item.statement}}</span>
                              <span v-else class="itemInline">暂无发布人</span> -->
                            </el-col>
                            <el-col :span="12" class="rightSection">
                              <span class="smallInline" @click="topicSetAddUserClick(item)">添加用户</span>
                              <span class="smallInline" @click="editTopicNameClick(item)">编辑</span>
                              <span class="smallInline" @click="deleteTopicClick(item)">删除</span>
                            </el-col>
                          </el-row>
                          <!-- 课题组-->
                          <div v-show="item.isOpen">
                            <el-row v-for="(it,ind) in item.member" :key="ind">
                              <el-col :span="12">
                                <span class="itemInline">{{it.name}}</span>
                                <span class="itemInline"></span>
                              </el-col>
                              <el-col :span="12" class="rightSection">
                                <span class="smallInline"></span>
                                <span class="smallInline"></span>
                                <span class="smallInline"  @click="showUserDialog(it)">详情</span>
                                <span class="smallInline" @click="deleteTopicUser(it)">删除</span>
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
            <div v-show="activeName =='teaching'">
              <div class="halfItem bg_white">
                <div class="halfBg">
                  <div class="tabTitle bg_white">
                    <div class="leftSection">
                      <el-button type="primary" class="smallBt" @click="setTeachingExpandAll">
                        {{setTeachingIsPageOpen?'折叠全部':'展开全部'}}</el-button>
                      <el-button type="success" class="smallBt" @click="addTeachingClick">新增教研组</el-button>
                    </div>
                  </div>
                  <div class="halfClassItem" v-for="(item,index) in setTeachingPageData" :key="index">
                    <div>
                      <template>
                        <div class="gradeContainer">
                          <el-row>
                            <el-col :span="12">
                              <span class="itemInline" @click="setTeachingExpandItem(item,index)">
                                <i v-show="item.isOpen" class="el-icon-caret-bottom"></i>
                                <i v-show="!item.isOpen" class="el-icon-caret-right"></i>
                                {{item.title}}
                              </span>
                              <!-- <span v-if="item.name" class="itemInline">发布人：{{item.name}}</span>
                              <span v-else class="itemInline">暂无发布人</span> -->
                              <span v-if="item.name" class="itemInline" style="width:200px;">教研组组长：{{item.name}}</span>
                              <span v-else class="itemInline">暂无教研组组长</span>
                            </el-col>
                            <el-col :span="12" class="rightSection">
                              <span class="smallInline" @click="teachingSetAddUserClick(item)">添加用户</span>
                              <span class="smallInline" @click="editTeachingNameClick(item)">编辑</span>
                              <span class="smallInline" @click="deleteTeachingClick(item)">删除</span>
                            </el-col>
                          </el-row>
                          <!-- 教研组 -->
                          <div v-show="item.isOpen">
                            <el-row v-for="(it,ind) in item.member" :key="ind">
                              <el-col :span="12">
                                <span class="itemInline">{{it.name}}</span>
                              </el-col>
                              <el-col :span="12" class="rightSection">
                                <!-- <span class="smallInline"></span> -->
                                <span class="smallInline" style="width:105px;"
                                  @click="teachingSetReviewerClick(item)">设为教研组组长</span>
                                <span class="smallInline"  @click="showUserDialog(it)">详情</span>
                                <span class="smallInline" @click="deleteTeachingUser(it)">删除</span>
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
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="栏目设置" name="columnSet" class="columnSection">
        <el-row class="addColumn">
          <el-col :span="24">
            <el-button icon="el-icon-plus" @click="addColumnClick">添加栏目</el-button>
          </el-col>
        </el-row>
        <el-row class="columnList">
          <el-col :span="24">
            <el-row class="bgcchildren">
              <el-col :span="24">
                <el-row class="bgculumns">
                  <el-col :span="3" v-for="(item,index) in setColumnList" :key="index" class="columnItem">
                    <el-button class="columnButton">{{item.title}}<i class="el-icon-delete"
                        @click="deleteColumnClick(item)"></i><i class="el-icon-edit-outline el-icon--right"
                        @click="editColumnNameClick(item)"></i></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增年级 -->
    <el-dialog title="添加年级" :visible.sync="addGradeDialog" width="30%" @close="closeGradeDialog('addGradeRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
      <el-form :model="addGradeRuleForm" :rules="addGradeRules" ref="addGradeRuleForm" label-width="100px"
        class="demo-ruleForm">
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
    <el-dialog title="添加班级" :visible.sync="addClassDialog" width="30%" @close="closeClassDialog('addClassRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('addClass')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="addClassRuleForm" :rules="addClassRules" ref="addClassRuleForm" label-width="100px"
        class="demo-ruleForm">
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
    <el-dialog title="设置审核人" :visible.sync="setReviewerDialog" width="30%"
      @close="closeSetReviewer('setReviewerRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="setReviewerRuleForm" :rules="setReviewerRules" ref="setReviewerRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span v-if="setReviewerFlag == 1">小学20</span>
            <span v-if="setReviewerFlag == 2">初中20</span>
            <span>{{setReviewerRuleForm.gradeNameTitle}}</span>
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
    <el-dialog title="更改审核人" :visible.sync="changeReviewerDialog" width="30%"
      @close="closeChangeReviewer('changeReviewerRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('changeReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="changeReviewerRuleForm" :rules="changeReviewerRules" ref="changeReviewerRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span v-if="changeReviewerFlag == 1">小学20</span>
            <span v-if="changeReviewerFlag == 2">初中20</span>
            <span>{{changeReviewerRuleForm.gradeNameTitle}}</span>
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
    <el-dialog title="编辑年级" width="30%" :visible.sync="editGradeClassDialog"
      @close="closeEditGradeClassDialog('editGradeClassRuleForm')">
      <el-form :model="editGradeClassRuleForm" :rules="editGradeClassRules" ref="editGradeClassRuleForm"
        label-width="100px" class="demo-ruleForm">
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
    <el-dialog title="设置班主任" :visible.sync="setHeadmasterDialog" width="30%"
      @close="closeSetHeadmaster('setHeadmasterRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setHeadmaster')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="setHeadmasterRuleForm" :rules="setHeadmasterRules" ref="setHeadmasterRuleForm"
        label-width="100px" class="demo-ruleForm">
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
    <el-dialog title="更改班主任" :visible.sync="changeHeadmasterDialog" width="30%"
      @close="closeChangeHeadmaster('changeHeadmasterRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('changeHeadmaster')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="changeHeadmasterRuleForm" :rules="changeHeadmasterRules" ref="changeHeadmasterRuleForm"
        label-width="100px" class="demo-ruleForm">
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
    <el-dialog title="编辑班级" width="30%" :visible.sync="editClassDialog"
      @close="closeEditClassDialog('editClassRuleForm')">
      <el-form :model="editClassRuleForm" :rules="editClassRules" ref="editClassRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="editClassRuleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEditClass('editClassRuleForm')">确 认</el-button>
          <el-button @click="closeEditClassDialog('editClassRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 社团部分 -->
    <!-- 新增社团 -->
    <el-dialog title="新增社团" width="30%" :visible.sync="addTeamDialog" @close="closeAddTeamDialog('addTeamRuleForm')">
      <el-form :model="addTeamRuleForm" :rules="addTeamRules" ref="addTeamRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="社团名称" prop="addTeamName">
          <el-input v-model="addTeamRuleForm.addTeamName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddTeam('addTeamRuleForm')">确 认</el-button>
          <el-button @click="closeAddTeamDialog('addTeamRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="teamSetAddUserDialog" width="30%"
      @close="closeTeamSetAddUser('teamSetAddUserRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('teamSetAddUser')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="teamSetAddUserRuleForm" :rules="teamSetAddUserRules" ref="teamSetAddUserRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span>{{teamSetAddUserRuleForm.teamName}}</span>
          </el-col>
        </el-row>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="teamSetAddUserRuleForm.userName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTeamSetAddUser('teamSetAddUserRuleForm')">确 认</el-button>
          <el-button @click="closeTeamSetAddUser('teamSetAddUserRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑社团名字 -->
    <el-dialog title="编辑社团" width="30%" :visible.sync="editTeamNameDialog"
      @close="closeEditTeamNameDialog('editTeamNameRuleForm')">
      <el-form :model="editTeamNameRuleForm" :rules="editTeamNameRules" ref="editTeamNameRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="社团名称" prop="teamName">
          <el-input v-model="editTeamNameRuleForm.teamName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEditTeamName('editTeamNameRuleForm')">确 认</el-button>
          <el-button @click="closeEditTeamNameDialog('editTeamNameRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 社团申请列表弹窗-->
    <el-dialog title="社团申请列表" width="60%" :visible.sync="teamApplicationDialog">
      <el-row class="titleTip">
        <el-col :span="24">同意后，该用户将自动加入到该社团，拥有发布和审批的权限</el-col>
      </el-row>
      <el-row v-if="teamApplicationProcessList.length ==0" class="titleTip">
        <el-col :span="24">暂无申请列表</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="teamApplicationLists">
          <el-row class="applicationItem" v-for="(item, index) in teamApplicationProcessList" :key="index">
            <el-col :span="21" class="leftSection">
              <el-row class="item">
                <el-col :span="3" class="name">申请社团:</el-col>
                <el-col :span="21" class="content">{{item.title}}</el-col>
              </el-row>
              <el-row class="item">
                <el-col :span="3" class="name">申请说明：</el-col>
                <el-col :span="21" class="content">{{item.statement}}</el-col>
              </el-row>
              <el-row class="item">
                <el-col :span="3" class="name">申请人:</el-col>
                <el-col :span="5" class="content">{{item.name}}</el-col>
                <el-col :span="16">
                  <span class="name">申请时间：</span>
                  <span class="content">{{item.create_time}}</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3" class="rightSection">
              <el-row class="operateItem">
                <el-col :span="24">
                  <el-button @click="agreeApplication(item.id)">同意</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-button @click="refuseApplication(id)">拒绝</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="teamApplicationDialog = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 社团设置审核人 -->
    <el-dialog title="设置审核人" :visible.sync="teamSetReviewerDialog" width="30%"
      @close="closeTeamSetReviewer('teamSetReviewerRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setTeamReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="teamSetReviewerRuleForm" :rules="teamSetReviewerRules" ref="teamSetReviewerRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span>{{teamSetReviewerRuleForm.teamNameTitle}}</span>
          </el-col>
        </el-row>
        <el-form-item label="社团审核人" prop="teamReviewerName">
          <el-input v-model="teamSetReviewerRuleForm.teamReviewerName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTeamSetReviewer('teamSetReviewerRuleForm')">确 认</el-button>
          <el-button @click="closeTeamSetReviewer('teamSetReviewerRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 社团设置--end -->


    <!-- 课题组设置  ---start-->
    <!-- 新增课题组 -->
    <el-dialog title="新增课题组" width="30%" :visible.sync="addTopicDialog"
      @close="closeAddTopicDialog('addTopicRuleForm')">
      <el-form :model="addTopicRuleForm" :rules="addTopicRules" ref="addTopicRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="课题组名称" prop="addTopicName">
          <el-input v-model="addTopicRuleForm.addTopicName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddTopic('addTopicRuleForm')">确 认</el-button>
          <el-button @click="closeAddTopicDialog('addTopicRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="topicSetAddUserDialog" width="30%"
      @close="closeTopicSetAddUser('topicSetAddUserRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('topicSetAddUser')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="topicSetAddUserRuleForm" :rules="topicSetAddUserRules" ref="topicSetAddUserRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span>{{topicSetAddUserRuleForm.topicName}}</span>
          </el-col>
        </el-row>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="topicSetAddUserRuleForm.userName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTopicSetAddUser('topicSetAddUserRuleForm')">确 认</el-button>
          <el-button @click="closeTopicSetAddUser('topicSetAddUserRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑课题组名字 -->
    <el-dialog title="编辑课题组" width="30%" :visible.sync="editTopicNameDialog"
      @close="closeEditTopicNameDialog('editTopicNameRuleForm')">
      <el-form :model="editTopicNameRuleForm" :rules="editTopicNameRules" ref="editTopicNameRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-form-item label="课题组名称" prop="topicName">
          <el-input v-model="editTopicNameRuleForm.topicName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEditTopicName('editTopicNameRuleForm')">确 认</el-button>
          <el-button @click="closeEditTopicNameDialog('editTopicNameRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 课题组设置  ---end-->

    <!-- 教研组设置  ---start-->
    <!-- 新增教研组组 -->
    <el-dialog title="新增教研组" width="30%" :visible.sync="addTeachingDialog"
      @close="closeAddTeachingDialog('addTeachingRuleForm')">
      <el-form :model="addTeachingRuleForm" :rules="addTeachingRules" ref="addTeachingRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="教研组名称" prop="addTeachingName">
          <el-input v-model="addTeachingRuleForm.addTeachingName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddTeaching('addTeachingRuleForm')">确 认</el-button>
          <el-button @click="closeAddTeachingDialog('addTeachingRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="teachingSetAddUserDialog" width="30%"
      @close="closeTeachingSetAddUser('teachingSetAddUserRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('teachingSetAddUser')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="teachingSetAddUserRuleForm" :rules="teachingSetAddUserRules" ref="teachingSetAddUserRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span>{{teachingSetAddUserRuleForm.teamName}}</span>
          </el-col>
        </el-row>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="teachingSetAddUserRuleForm.userName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTeachingSetAddUser('teachingSetAddUserRuleForm')">确 认</el-button>
          <el-button @click="closeTeachingSetAddUser('teachingSetAddUserRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑教研组名字 -->
    <el-dialog title="编辑教研组" width="30%" :visible.sync="editTeachingNameDialog"
      @close="closeEditTeachingNameDialog('editTeachingNameRuleForm')">
      <el-form :model="editTeachingNameRuleForm" :rules="editTeachingNameRules" ref="editTeachingNameRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-form-item label="教研组名称" prop="teachingName">
          <el-input v-model="editTeachingNameRuleForm.teachingName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEditTeachingName('editTeachingNameRuleForm')">确 认</el-button>
          <el-button @click="closeEditTeachingNameDialog('editTeachingNameRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 设置教研组组长 -->
    <el-dialog title="设置审核人" :visible.sync="teachingSetReviewerDialog" width="30%"
      @close="closeTeachingSetReviewer('teachingSetReviewerRuleForm')">
      <el-dialog width="30%" :visible.sync="searchClickDialog" append-to-body class="searchUserDialog">
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
          <el-button @click="searchClickDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserName('setTeachingReviewer')">确 认</el-button>
        </div>
      </el-dialog>
      <el-form :model="teachingSetReviewerRuleForm" :rules="teachingSetReviewerRules" ref="teachingSetReviewerRuleForm"
        label-width="120px" class="demo-ruleForm">
        <el-row class="dialogTitle">
          <el-col :span="24">
            <span>{{teachingSetReviewerRuleForm.teachingNameTitle}}</span>
          </el-col>
        </el-row>
        <el-form-item label="教研组审核人" prop="teachingReviewerName">
          <el-input v-model="teachingSetReviewerRuleForm.teachingReviewerName" readonly style="width:70%;"></el-input>
          <el-button style="width:27%;margin-left:3%;" @click="searchUserClick">查 找</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmTeachingSetReviewer('teachingSetReviewerRuleForm')">确 认</el-button>
          <el-button @click="closeTeachingSetReviewer('teachingSetReviewerRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设置教研组组长--end -->
    <!-- 教研组设置  ---end-->

    <!-- 栏目设置  start -->
    <!-- 添加栏目  start-->
    <el-dialog title="添加栏目" width="30%" :visible.sync="addColumnDialog"
      @close="closeAddColumnDialog('addColumnRuleForm')">
      <el-form :model="addColumnRuleForm" :rules="addColumnRules" ref="addColumnRuleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="栏目名称" prop="columnName">
          <el-input v-model="addColumnRuleForm.columnName" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAddColumn('addColumnRuleForm')">确 认</el-button>
          <el-button @click="closeAddColumnDialog('addColumnRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加栏目  end-->

    <!-- 编辑栏目  --start -->
    <el-dialog title="编辑栏目" width="30%" :visible.sync="editColumnNameDialog"
      @close="closeEditColumnNameDialog('editColumnNameRuleForm')">
      <el-form :model="editColumnNameRuleForm" :rules="editColumnNameRules" ref="editColumnNameRuleForm"
        label-width="100px" class="demo-ruleForm">
        <el-form-item label="栏目名称" prop="columnName">
          <el-input v-model="editColumnNameRuleForm.columnName" placeholder="请输入栏目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEditColumnName('editColumnNameRuleForm')">确 认</el-button>
          <el-button @click="closeEditColumnNameDialog('editColumnNameRuleForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑栏目  --end -->
    <!-- 栏目设置  --end -->
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
              <span v-for="(item,key) in viewuserInfo.community" :key="key">{{item.title}}</span>
          </div>
          <div class="fc_gray mb_10">
              课题组 ：
              <span v-for="(item,key) in viewuserInfo.subject" :key="key">{{item.title}}</span>
          </div>
          <div class="fc_gray">
              教研组 ：
              <span v-for="(item,key) in viewuserInfo.teaching" :key="key">{{item.title}}</span>
          </div>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: center;">

          <el-button type="primary" @click="viewDialog=false">关闭</el-button>
      </div>
  </el-dialog>
 <!-- 查看弹框 end -->
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

  .dialogTitle {
    margin-bottom: 25px;
    padding-left: 17px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 33px;
  }

  .titleTip {
    margin-bottom: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }

  .teamApplicationLists {
    width: 100%;
    height: 600px;
    overflow-y: scroll;
  }

  .applicationItem {
    padding: 30px;
    width: 100%;
    height: 148px;
    background: rgba(243, 237, 232, 1);
    border: 1px solid rgba(218, 196, 178, 1);
  }

  .applicationItem .leftSection {
    border-right: 1px solid #CBCBCB;
  }

  .applicationItem .leftSection .item {
    margin-bottom: 12px;
  }

  .applicationItem .leftSection .item .name {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 22px;
  }

  .applicationItem .leftSection .item .content {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }

  .applicationItem .rightSection {
    text-align: right;
  }

  .applicationItem .rightSection button {
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;
    border: 1px solid rgba(224, 224, 224, 1);
  }

  .applicationItem .rightSection .operateItem {
    margin-bottom: 20px;
  }
</style>
<script>
  import request from "@/api/request.js";
  export default {
    data() {
      return {
        viewuserInfo:{},
        viewDialog:false,
        activeName: "class", //默认 是班级设置 tab项
        activeSchool: "east", //默认是 东区 设置项
        tabsList: [
          { name: "class", label: "班级设置" },
          { name: "team", label: "社团设置" },
          { name: "topic", label: "课题组" },
          { name: "teaching", label: "教研组" }
        ],
        schoolList: [
          { name: "east", label: "东区", id: 1 },
          { name: "west", label: "西区", id: 2 },
          { name: "south", label: "南区", id: 3 }
        ],
        primaryGradeClassIsOpen: false, //年级班级 小学 展开项 是否全部展开了
        middleGradeClassIsOpen: false, //年级班级 初中 展开项 是否全部展开了
        primaryGradeClassData: {}, //年级班级数据 小学  东区 西区 南区
        middleGradeClassData: {}, //年级班级数据 初中  东区 西区 南区

        // 班级设置 弹窗部分

        //点击增加年级的类型标识  如果是小学中 点击年级 标识1  如果是点击初中 点击年级 标识2
        addGradeFlag: 1,
        //点击增加班级的类型标识  如果是小学中 点击班级 标识1  如果是点击初中 点击班级 标识2
        addClassFlag: 1,
        //点击更改审核人类型标识  如果是小学中 点击更改审核人 标识1  如果是点击初中 点击更改审核人 标识2
        changeReviewerFlag: 1,
        //点击设置审核人类型标识  如果是小学中 点击设置审核人 标识1  如果是点击初中 点击设置审核人 标识2
        setReviewerFlag: 1,

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
          name: '',//名称
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
          name: '',//名称
        },
        editClassRules: { //编辑班级 班级 验证规则
          name: [
            { required: true, message: "请输入年级名称", trigger: "blur" }
          ]
        },
        //编辑班级 班级 部分 结束


        //社团设置部分  --start
        //社团数据
        setTeamPageData: [],
        setTeamIsPageOpen: false, //社团数据 展开项 是否全部展开了
        //新增社团
        addTeamDialog: false, //新增社团弹窗
        addTeamRuleForm: {
          addTeamName: '', //新增社团名称
        },
        addTeamRules: { ///新增社团名称 验证规则
          addTeamName: [
            { required: true, message: "请输入社团名称", trigger: "blur" }
          ]
        },
        //社团 设置 点击社团一行中 的添加用户 --start
        teamSetAddUserDialog: false, //添加用户 弹窗
        teamSetAddUserRuleForm: {
          teamName: '', //社团名称
          teamId: '', //社团id
          userName: '', //用户名称
        },
        teamSetAddUserRules: { //添加用户  验证规则
          userName: [
            { required: true, message: "请输入用户名称", trigger: "blur" }
          ]
        },
        //社团 设置 点击社团一行中 的添加用户 --end

        //社团设置 编辑社团名字 --start
        editTeamNameDialog: false, //编辑社团名字 弹窗
        editTeamNameRuleForm: {
          teamId: '', //社团id
          teamName: '', //社团名称
        },
        editTeamNameRules: { //编辑社团名字 验证规则
          teamName: [
            { required: true, message: "请输入的社团名称", trigger: "blur" }
          ]
        },
        //社团设置 编辑社团名字 --end

        //社团申请列表
        teamApplicationDialog: false, //社团申请列表弹窗
        teamApplicationProcessList: [],

        // 社团设置审核人 --start
        teamSetReviewerDialog: false, //点击 设置审核人 出现弹窗
        teamSetReviewerRuleForm: { //设置审核人 绑定值
          teamNameTitle: '', //社团名称
          teamReviewerName: '', //社团审核人名称
          teamReviewerId: '' // 社团审核人id
        },
        teamSetReviewerRules: { //设置审核人弹窗 验证规则
          teamReviewerName: [
            { required: true, message: "请设置社团审核人", trigger: "blur" }
          ]
        },
        // 社团  设置审核人 --end

        //社团设置部分  --end

        //课题组设置 部分 ---start
        setTopicPageData: [],
        setTopicIsPageOpen: false, //社团数据 展开项 是否全部展开了
        //新增课题组 --start
        addTopicDialog: false, //新增课题组
        addTopicRuleForm: {
          addTopicName: '', //新增课题组名称
        },
        addTopicRules: { ///新增课题组名称 验证规则
          addTopicName: [
            { required: true, message: "请输入课题组名称", trigger: "blur" }
          ]
        },
        //新增课题组 --end

        //课题组 设置 点击课题组一行中 的添加用户 --start
        topicSetAddUserDialog: false, //添加用户 弹窗
        topicSetAddUserRuleForm: {
          topicName: '', //课题组名称
          topicId: '', //课题组id
          userName: '', //用户名称
        },
        topicSetAddUserRules: { //添加用户  验证规则
          userName: [
            { required: true, message: "请输入用户名称", trigger: "blur" }
          ]
        },
        //课题组 设置 点击课题组一行中 的添加用户 --end

        //课题组设置 编辑课题组名字 --start
        editTopicNameDialog: false, //编辑课题组名字 弹窗
        editTopicNameRuleForm: {
          topicId: '', //课题组id
          topicName: '', //课题组名称
        },
        editTopicNameRules: { //编辑课题组名字 验证规则
          topicName: [
            { required: true, message: "请输入的课题组名称", trigger: "blur" }
          ]
        },
        //课题组设置 编辑课题组名字 --end
        //课题组设置 部分 ---end


        //教研组设置 --start
        setTeachingPageData: [],
        setTeachingIsPageOpen: false, //社团数据 展开项 是否全部展开了
        //新增教研组 --start
        addTeachingDialog: false, //新增教研组组
        addTeachingRuleForm: {
          addTeachingName: '', //新增教研组名称
        },
        addTeachingRules: { ///新增教研组组名称 验证规则
          addTeachingName: [
            { required: true, message: "请输入教研组名称", trigger: "blur" }
          ]
        },
        //新增教研组 --end

        //教研组 设置 点击教研组一行中 的添加用户 --start
        teachingSetAddUserDialog: false, //添加用户 弹窗
        teachingSetAddUserRuleForm: {
          teachingName: '', //教研组名称
          teachingId: '', //教研组id
          userName: '', //用户名称
        },
        teachingSetAddUserRules: { //添加用户  验证规则
          userName: [
            { required: true, message: "请输入用户名称", trigger: "blur" }
          ]
        },
        //教研组 设置 点击教研组一行中 的添加用户 --end

        //教研组设置 编辑教研组名字 --start
        editTeachingNameDialog: false, //编辑教研组名字 弹窗
        editTeachingNameRuleForm: {
          teachingId: '', //教研组id
          teachingName: '', //教研组名称
        },
        editTeachingNameRules: { //编辑教研组名字 验证规则
          teachingName: [
            { required: true, message: "请输入的教研组名称", trigger: "blur" }
          ]
        },
        //教研组设置 编辑教研组名字 --end

        // 教研组设置审核人 --start
        teachingSetReviewerDialog: false, //点击 设置审核人 出现弹窗
        teachingSetReviewerRuleForm: { //设置审核人 绑定值
          teachingNameTitle: '', //教研组名称
          teachingReviewerName: '', //教研组审核人名称
          teachingReviewerId: '' //教研组审核人id
        },
        teachingSetReviewerRules: { //设置审核人弹窗 验证规则
          teachingReviewerName: [
            { required: true, message: "请设置教研组组长", trigger: "blur" }
          ]
        },
        // 教研组  设置审核人 --end
        //教研组组设置 部分 ---end

        //栏目设置--start
        setColumnList: [], //栏目列表
        //添加栏目 --start
        addColumnDialog: false, //添加栏目 弹窗
        addColumnRuleForm: {
          s_id: '', //校区id
          columnName: '', //栏目名称
        },
        addColumnRules: { //添加栏目  验证规则
          columnName: [
            { required: true, message: "请输入栏目名称", trigger: "blur" }
          ]
        },
        //添加栏目 --end
        //编辑栏目名称  --start
        editColumnNameDialog: false, //弹窗
        editColumnNameRuleForm: {
          columnId: '', //栏目id
          columnName: '' //栏目名称 
        },
        editColumnNameRules: { //添加栏目  验证规则
          columnName: [
            { required: true, message: "请输入栏目名称", trigger: "blur" }
          ]
        },
        //编辑栏目名称  --end

        //栏目设置  --end



      };
    },
    methods: {
      showUserDialog(item){
        var data = { id: item.id }
                request.post('/backapi/Users/Details', data, (res) => {
                    this.viewuserInfo = res.data;
                    this.viewDialog=true;
                })
      },
      //页面数据部分
      toggleSettingType(tab) { //主页面---点击切换设置类型  班级 社团设置
        console.log(tab, event);
        switch (tab.name) {
          case "class": //班级设置
            this.getGradeClassData();
            break;
          case "team": //社团设置
            console.log("点击了社团设置");
            this.getSetTeamPageData();
            break;
          case "topic": //课题组
            console.log("点击了课题组设置");
            this.getSetTopicPageData();
            break;
          case "teaching": //教研组
            console.log("点击了教研组设置");
            this.getSetTeachingPageData();
            break;
          case "columnSet": //栏目设置
            console.log("点击了栏目设置");
            this.getSetColumnList();
            break;
          default:
        }
      },
      //东区   西区 南区 判断  activeSchool: 'east',
      switchCampus(val) { //点击切换
        console.log(val, "点击设置里面的切换校区");
        switch (this.activeName) {
          case "class": //班级设置
            this.getGradeClassData(val.name);
            break;
          case "team": //社团设置
            console.log("点击了社团设置");
            this.getSetTeamPageData(val.name);
            break;
          case "topic": //课题组
            console.log("点击了课题组设置");
            this.getSetTopicPageData(val.name);
            break;
          case "teaching": //教研组
            console.log("点击了教研组设置");
            this.getSetTeachingPageData(val.name);
            break;
          default:
        }
      },

      //班级设置
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

      //班级设置--东区里面 小学 点击新增年级  ---start
      addGradeClassClick(flag) { //班级设置--东区里面 小学 点击新增年级按钮
        this.addGradeRuleForm.gradeName = ""; //清空年级名称
        this.addGradeRuleForm.gradeReviewer = ""; //年级审核人
        this.addGradeDialog = true;
        if (flag == 1) { //如果是小学中点击年级 标识为1
          this.addGradeFlag = 1;
        } else if (flag == 2) { //如果是初中中点击年级 标识为2
          this.addGradeFlag = 2;
        }
      },
      confirmAddGrade(ruleForm) {  //新增年级 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            var params = {};
            if (self.addGradeFlag == 1) { //如果是小学
              params = {
                s_id: self.primaryGradeClassData[0].s_id, //校区id 小学
                l_id: self.primaryGradeClassData[0].l_id, //校部id  小学
                title: self.addGradeRuleForm.gradeName, //	年级名称
                u_id: self.checkedVal, //审核员id
                name: self.addGradeRuleForm.gradeReviewer //审核员名字
              };
            } else if (self.addGradeFlag == 2) { //如果是初中
              params = {
                s_id: self.middleGradeClassData[0].s_id, //校区id 初中
                l_id: self.middleGradeClassData[0].l_id, //校部id  初中
                title: self.addGradeRuleForm.gradeName, //	年级名称
                u_id: self.checkedVal, //审核员id
                name: self.addGradeRuleForm.gradeReviewer //审核员名字
              };
            }
            request.post("/backapi/Classify/addGrade", params, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addGradeDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                this.$message.error(res.message);
                self.addGradeDialog = false;
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
        } else if (val == 'setReviewer') { //如果是设置审核人
          this.setReviewerRuleForm.gradeReviewerName = this.filterUser.name; //年级审核员姓名
        } else if (val == 'changeReviewer') { //如果是更改审核人
          this.changeReviewerRuleForm.gradeReviewerName = this.filterUser.name; //年级更改后审核员姓名
        } else if (val == 'setHeadmaster') { //如果是设置班主任
          this.setHeadmasterRuleForm.headmasterName = this.filterUser.name; //设置班主任的名字
        } else if (val == 'changeHeadmaster') { //如果是更改班主任
          this.changeHeadmasterRuleForm.headmasterName = this.filterUser.name; //更改后班主任的名字
        } else if (val == 'teamSetAddUser') { //社团设置--添加用户
          this.teamSetAddUserRuleForm.userName = this.filterUser.name; //添加用户的名称
        } else if (val == 'setTeamReviewer') { //社团设置审核人
          this.teamSetReviewerRuleForm.teamReviewerName = this.filterUser.name; //社团审核人的名称
        } else if (val == 'topicSetAddUser') { //课题组设置--添加用户
          this.topicSetAddUserRuleForm.userName = this.filterUser.name; //添加用户的名称
        } else if (val == 'teachingSetAddUser') { //教研组设置--添加用户
          this.teachingSetAddUserRuleForm.userName = this.filterUser.name; //添加用户的名称
        } else if (val == 'setTeachingReviewer') { //教研组设置审核人教研组组长
          this.teachingSetReviewerRuleForm.teachingReviewerName = this.filterUser.name; //社团审核人的名称
        }
      },
      //用户查询弹窗 通用--end  

      //新增班级 部分-start
      clickAddClassBtn(item, flag) {// 东区 --小学 初中  点击某一年级的新增班级按钮
        //点击新增班级 出现弹窗
        console.log(item, "东区-小学--点击添加班级--得到该年级信息");
        this.addClassRuleForm.superiorGradeId = item.id;//上级年级 id
        this.addClassRuleForm.superiorGrade = item.title;//上级年级名字
        this.addClassRuleForm.className = "";
        this.addClassRuleForm.headmaster = "";
        this.addClassDialog = true;
        if (flag == 1) { //如果是小学中点击班级 标识为1
          this.addClassFlag = 1;
        } else if (flag == 2) { //如果是初中中点击班级 标识为2
          this.addClassFlag = 2;
        }
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
            var params = {};
            if (self.addClassFlag == 1) { //如果是小学
              params = {
                s_id: self.primaryGradeClassData[0].s_id, //校区id 小学
                g_id: self.addClassRuleForm.superiorGradeId, //年级id
                title: self.addClassRuleForm.className, //	班级名称
                u_id: self.checkedVal, //班主任id
                name: self.addClassRuleForm.headmaster //班主任名字
              }
            } else if (self.addClassFlag == 2) { //如果是中学
              params = {
                s_id: self.middleGradeClassData[0].s_id, //校区id 小学
                g_id: self.addClassRuleForm.superiorGradeId, //年级id
                title: self.addClassRuleForm.className, //	班级名称
                u_id: self.checkedVal, //班主任id
                name: self.addClassRuleForm.headmaster //班主任名字
              }
            }
            request.post("/backapi/Classify/addClass", params, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addClassDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.addClassDialog = false;
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
      setReviewerClick(item, flag) { //东区 --小学 初中 点击某一年级 设置审核人 出现弹窗
        console.log(item, "东区-小学--点击设置审核人--得到该年级信息");
        this.setReviewerRuleForm.gradeNameTitle = item.title; //审核的年级名称
        this.setReviewerRuleForm.gradeReviewerId = item.id;// 年级id
        this.setReviewerRuleForm.gradeReviewerName = ''; //清空年级审核人
        this.setReviewerDialog = true;
        if (flag == 1) { //如果是小学中点击设置审核人 标识为1
          this.setReviewerFlag = 1;
        } else if (flag == 2) { //如果是初中设置审核人 标识为2
          this.setReviewerFlag = 2;
        }
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
            request.post("/backapi/Classify/editGradeuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.setReviewerDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.setReviewerDialog = false;
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
      changeReviewerClick(item, flag) { //东区 --小学 点击某一年级 设置审核人 出现弹窗
        console.log(item, "东区-小学--点击更改审核人--得到该年级信息");
        this.changeReviewerRuleForm.gradeNameTitle = item.title; //审核的年级名称
        this.changeReviewerRuleForm.gradeReviewerId = item.id;// 年级id
        this.changeReviewerRuleForm.gradeReviewerName = ''; //清空年级审核人
        this.changeReviewerDialog = true;
        if (flag == 1) { //如果是小学中点击更改审核人 标识为1
          this.changeReviewerFlag = 1;
        } else if (flag == 2) { //如果是初中更改审核人 标识为2
          this.changeReviewerFlag = 2;
        }
      },
      confirmChangeReviewer(ruleForm) {  // 东区 --小学 中学 更改审核人-- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.changeReviewerRuleForm.gradeReviewerId, //年级id
              u_id: self.checkedVal, //用户id
              name: self.changeReviewerRuleForm.gradeReviewerName //姓名
            };
            request.post("/backapi/Classify/editGradeuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.changeReviewerDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.changeReviewerDialog = false;
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
      editGradeClick(item) { //编辑年级 
        console.log(item, '得到当前年级信息');
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
            request.post("/backapi/Classify/editGrade", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editGradeClassDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.editGradeClassDialog = false;
                self.$message.error(res.message);
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
            request.post("/backapi/Classify/delGrade", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getGradeClassData(_that.activeName);
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
      setHeadmasterClick(item) { //东区 --小学 点击某一年级 设置审核人 出现弹窗
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
            request.post("/backapi/Classify/editClassuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.setHeadmasterDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.setHeadmasterDialog = false;
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
      changeHeadmasterClick(item) { //东区 --小学 点击某一年级 更改审核人 出现弹窗
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
            request.post("/backapi/Classify/editClassuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.changeHeadmasterDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.changeHeadmasterDialog = false;
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
      editClassClick(item) { //编辑班级
        console.log(item, '得到点击的班级信息');
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
            request.post("/backapi/Classify/editClass", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editClassDialog = false;
                self.getGradeClassData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.editClassDialog = false;
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
            request.post("/backapi/Classify/delClass", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getGradeClassData(_that.activeName);
              }else{
                _that.$message.error(res.message);
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
      //东区 --小学  点击某一年级 删除班级 --end

      //社团设置
      getSetTeamPageData(area) {   // 社团设置--获取社团数据
        var s_id = '';
        var url = '/backapi/Classify/Community';
        switch (area) {
          case "east": //东区
            s_id = 1;
            break;
          case "west": //西区
            s_id = 2;
            break;
          case "south": //南区
            s_id = 3;
            break;
          default:
            s_id = 1;
        }
        var params = {
          s_id: s_id
        };
        var self = this;
        request.post(url, params, res => {
          if (res.code == 0) {
            self.setTeamPageData = res.data.map(item => {
              item.isOpen = false; //默认折叠
              return item;
            }); //设置社团页面数据
            console.log("设置社团页面数据列表", self.setTeamPageData);
          }
        });
      },
      setTeamExpandAll() { // 社团设置-点击社团 点击了展开全部 折叠 全部
        this.setTeamIsPageOpen = !this.setTeamIsPageOpen;
        this.setTeamPageData = this.setTeamPageData.map(item => {
          item.isOpen = !item.isOpen;
          return item;
        });
      },
      setTeamExpandItem(item, index) {  //社团设置-点击社团的展开项
        if (item.isOpen) {
          this.setTeamPageData[index].isOpen = false;
        } else {
          this.setTeamPageData[index].isOpen = true;
        }
      },
      //社团设置 新增社团 --start
      addTeamClick(item) { //新增社团
        console.log(item, '得到当前社团信息');
        this.addTeamRuleForm.addTeamName = '';//清空社团名称
        this.addTeamDialog = true;
      },
      confirmAddTeam(ruleForm) {  // 社团设置 新增社团 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.setTeamPageData[0].s_id, //校区id 1 2 3
              title: self.addTeamRuleForm.addTeamName, //社团名称
            };
            request.post("/backapi/Classify/addCommunity", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addTeamDialog = false;
                self.getSetTeamPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.addTeamDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeAddTeamDialog(ruleForm) {  //社团设置 新增社团 弹窗 关闭 取消 遮罩  空白处
        this.addTeamDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //社团设置 新增社团 --end

      //社团设置 添加用户  --start
      teamSetAddUserClick(item) { //点击社团 -添加用户 出现弹窗
        console.log(item, "点击社团 -添加用户--得到该社团信息");
        this.teamSetAddUserRuleForm.teamName = item.title; //社团名称
        this.teamSetAddUserRuleForm.teamId = item.id;// 社团id
        this.teamSetAddUserRuleForm.userName = ''; //清空用户名称
        this.teamSetAddUserDialog = true;
      },
      confirmTeamSetAddUser(ruleForm) {  // 点击社团 -添加用户-- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              c_id: self.teamSetAddUserRuleForm.teamId, //社团id
              u_id: self.checkedVal //用户id
            };
            request.post("/backapi/Classify/addCommunityuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.teamSetAddUserDialog = false;
                self.getSetTeamPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.teamSetAddUserDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeTeamSetAddUser(ruleForm) {  //点击社团 -添加用户 弹窗 关闭 取消 遮罩  空白处
        this.teamSetAddUserDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //点击社团 -添加用户 --end

      //社团设置 编辑社团名字  --start
      editTeamNameClick(item) { //编辑社团名称 
        console.log(item, '得到当前点击的社团信息');
        this.editTeamNameRuleForm.teamId = item.id; //社团id
        this.editTeamNameRuleForm.teamName = '';//清空编辑 社团名称
        this.editTeamNameDialog = true;
      },
      confirmEditTeamName(ruleForm) {  // 社团设置 编辑社团名字 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.editTeamNameRuleForm.teamId, //社团id
              title: self.editTeamNameRuleForm.teamName, //社团名称
            };
            request.post("/backapi/Classify/editCommunity", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editTeamNameDialog = false;
                self.getSetTeamPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.editTeamNameDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeEditTeamNameDialog(ruleForm) {  //社团设置 编辑社团名字 弹窗 关闭 取消 遮罩  空白处
        this.editTeamNameDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //社团设置 编辑社团名字 --end

      //社团设置 删除社团 --start
      deleteTeamClick(item) {
        var _that = this;
        _that.$confirm("是否删除该社团，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //社团id
            };
            request.post("/backapi/Classify/delCommunity", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTeamPageData(_that.activeName);
              }else{
                _that.$message.error(res.message);

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
      //社团设置 删除社团  --end
      //删除社团成员
      deleteTeamUser(item) {
        var _that = this;
        _that.$confirm("是否删除该社团成员，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //社团id
            };
            request.post("/backapi/Classify/delCommunityuser", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTeamPageData(_that.activeName);
              }else{
                _that.$message.error(res.message);
                
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
      //删除课题组用户
      deleteTopicUser(item) {
        var _that = this;
        _that.$confirm("是否删除该课题组成员，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //社团id
            };
            request.post("/backapi/Classify/delSubjectuser", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTeamPageData(_that.activeName);
              }else{
                _that.$message.error(res.message);
                
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
      //删除教研组用户
      deleteTeachingUser(item) {
        var _that = this;
        _that.$confirm("是否删除该教研组成员，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //社团id
            };
            request.post("/backapi/Classify/delTeachinguser", data, function (res) {          
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTeachingPageData(_that.activeName);
                // self.getSetTeachingPageData(self.activeName);
              }else{
                _that.$message.error(res.message);
                
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
      //社团申请列表 
      teamApplicationProcess() { //点击社团申请列表
        this.teamApplicationDialog = true;
        this.getTeamApplicationList();
      },
      //获取社团申请列表
      getTeamApplicationList() {
        request.post("/backapi/Classify/sqCommunity", {}, function (res) {
          if (res.code == 0) {
            this.teamApplicationProcessList = res.data;
          }
        });
      },
      agreeApplication(id){ //社团社情列表 同意申请 社团id
        var data = {
          c_id: id
        }
        var self = this;
        request.post("/backapi/Classify/tyCommunity", data, function (res) {
          if (res.code == 0) {
            self.$message({
              type: "success",
              message: res.message
            });
            self.getTeamApplicationList();
          }
        });
      },
      refuseApplication(id){ //社团社情列表 拒绝申请 社团id
        var data = {
          c_id: id
        }
        var self = this;
        request.post("/backapi/Classify/jjommunity", data, function (res) {
          if (res.code == 0) {
            self.$message({
              type: "success",
              message: res.message
            });
            self.getTeamApplicationList();
          }
        });
      },

      //社团设置审核人  --start
      teamSetReviewerClick(item) { //点击社团 设置审核人 出现弹窗
        console.log(item, "社团设置审核人--得到该社团信息");
        this.teamSetReviewerRuleForm.teamNameTitle = item.title; //社团名称
        this.teamSetReviewerRuleForm.teamReviewerId = item.id;// 社团id
        this.teamSetReviewerRuleForm.teamReviewerName = ''; //社团审核人名称 用户名称
        this.teamSetReviewerDialog = true;
      },
      confirmTeamSetReviewer(ruleForm) {  // 社团 设置审核人-- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              c_id: self.teamSetReviewerRuleForm.teamReviewerId, //社团id
              u_id: self.checkedVal //用户id
            };
            request.post("/backapi/Classify/editSh", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.teamSetReviewerDialog = false;
                self.getSetTeamPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.teamSetReviewerDialog = false;
                
              }
            });
          } else {
            return false;
          }
        });
      },
      closeTeamSetReviewer(ruleForm) {  //社团 设置审核人 弹窗 关闭 取消 遮罩  空白处
        this.teamSetReviewerDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //社团设置审核人  --end

      //课题组设置 --start
      getSetTopicPageData(area) {   // 课题组设置--获取课题组数据
        var s_id = '';
        var url = '/backapi/Classify/Subject';
        switch (area) {
          case "east": //东区
            s_id = 1;
            break;
          case "west": //西区
            s_id = 2;
            break;
          case "south": //南区
            s_id = 3;
            break;
          default:
            s_id = 1;
        }
        var params = {
          s_id: s_id
        };
        var self = this;
        request.post(url, params, res => {
          if (res.code == 0) {
            self.setTopicPageData = res.data.map(item => {
              item.isOpen = false; //默认折叠
              return item;
            }); //设置社团页面数据
            console.log("设置课题组页面数据列表", self.setTopicPageData);
          }
        });
      },
      setTopicExpandAll() { // 课题组设置-点击课题 点击了展开全部 折叠 全部
        this.setTopicIsPageOpen = !this.setTopicIsPageOpen;
        this.setTopicPageData = this.setTopicPageData.map(item => {
          item.isOpen = !item.isOpen;
          return item;
        });
      },
      setTopicExpandItem(item, index) {  //课题组设置-点击课题的展开项
        if (item.isOpen) {
          this.setTopicPageData[index].isOpen = false;
        } else {
          this.setTopicPageData[index].isOpen = true;
        }
      },
      //课题组设置 新增课题组--start
      addTopicClick(item) { //新增课题组
        console.log(item, '得到当前课题组信息');
        this.addTopicRuleForm.addTopicName = '';//清空课题名称
        this.addTopicDialog = true;
      },
      confirmAddTopic(ruleForm) {  // 课题组设置 新增课题 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.setTopicPageData[0].s_id, //校区id 1 2 3
              title: self.addTopicRuleForm.addTopicName, //课题组名称
            };
            request.post("/backapi/Classify/addSubject", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addTopicDialog = false;
                self.getSetTopicPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.addTopicDialog = false;
                
              }
            });
          } else {
            return false;
          }
        });
      },
      closeAddTopicDialog(ruleForm) {  //课题组设置 新增课题组 弹窗 关闭 取消 遮罩  空白处
        this.addTopicDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //课题组设置 新增课题 --end

      //课题组设置 添加用户  --start
      topicSetAddUserClick(item) { //点击课题组 -添加用户 出现弹窗
        console.log(item, "点击课题组 -添加用户--得到该课题组信息");
        this.topicSetAddUserRuleForm.topicName = item.title; //课题组名称
        this.topicSetAddUserRuleForm.topicId = item.id;// 课题组id
        this.topicSetAddUserRuleForm.userName = ''; //清空用户名称
        this.topicSetAddUserDialog = true;
      },
      confirmTopicSetAddUser(ruleForm) {  // 点击课题组 -添加用户-- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              c_id: self.topicSetAddUserRuleForm.topicId, //课题组id
              u_id: self.checkedVal //用户id
            };
            request.post("/backapi/Classify/addSubjectuser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.topicSetAddUserDialog = false;
                self.getSetTopicPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.topicSetAddUserDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeTopicSetAddUser(ruleForm) {  //点击课题组 -添加用户 弹窗 关闭 取消 遮罩  空白处
        this.topicSetAddUserDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //点击课题组 -添加用户 --end

      //课题组 编辑课题组名字  --start
      editTopicNameClick(item) { //编辑课题组名称 
        console.log(item, '得到当前点击的课题组信息');
        this.editTopicNameRuleForm.topicId = item.id; //课题组id
        this.editTopicNameRuleForm.topicName = '';//清空编辑 课题组名称
        this.editTopicNameDialog = true;
      },
      confirmEditTopicName(ruleForm) {  // 课题组设置 编辑课题组名字 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.editTopicNameRuleForm.topicId, //课题组id
              title: self.editTopicNameRuleForm.topicName, //课题组名称
            };
            request.post("/backapi/Classify/editSubject", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editTopicNameDialog = false;
                self.getSetTopicPageData(self.activeName);
              }else{
                self.$message.error(res.message);
                self.editTopicNameDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeEditTopicNameDialog(ruleForm) {  //课题组设置 编辑课题组名字 弹窗 关闭 取消 遮罩  空白处
        this.editTopicNameDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //课题组设置 编辑课题组名字 --end

      //课题组设置 删除课题组 --start
      deleteTopicClick(item) {
        var _that = this;
        _that.$confirm("是否删除该课题组，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //课题组id
            };
            request.post("/backapi/Classify/delSubject", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTopicPageData(_that.activeName);
              }else{
                _that.$message.error(res.message)
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
      //课题组设置 删除课题组  --end
      //课题组设置 --end


      //教研组设置 --start
      getSetTeachingPageData(area) {   // 课题组设置--获取课题组数据
        var s_id = '';
        var url = '/backapi/Classify/Teaching';
        switch (area) {
          case "east": //东区
            this.s_id = s_id = 1;
            break;
          case "west": //西区
            this.s_id = s_id = 2;
            break;
          case "south": //南区
            this.s_id = s_id = 3;
            break;
          default:
            this.s_id = s_id = 1;
        }
        var params = {
          s_id: s_id
        };
        var self = this;
        request.post(url, params, res => {
          if (res.code == 0) {
            self.setTeachingPageData = res.data.map(item => {
              item.isOpen = false; //默认折叠
              return item;
            }); //设置教研组页面数据
            console.log("设置教研组组页面数据列表", self.setTeachingPageData);
          }
        });
      },
      setTeachingExpandAll() { // 教研组设置-点击课题组 点击了展开全部 折叠 全部
        this.setTeachingIsPageOpen = !this.setTeachingIsPageOpen;
        this.setTeachingPageData = this.setTeachingPageData.map(item => {
          item.isOpen = !item.isOpen;
          return item;
        });
      },
      setTeachingExpandItem(item, index) {  //教研组组设置-点击课题的展开项
        if (item.isOpen) {
          this.setTeachingPageData[index].isOpen = false;
        } else {
          this.setTeachingPageData[index].isOpen = true;
        }
      },
      //教研组设置 新增教研组--start
      addTeachingClick(item) { //新增教研组
        console.log(item, '得到当前教研组信息');
        this.addTeachingRuleForm.addTeachingName = '';//清空教研组名称
        this.addTeachingDialog = true;
      },
      confirmAddTeaching(ruleForm) {  // 教研组组设置 新增教研组 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              s_id: self.setTeachingPageData[0].s_id, //校区id 1 2 3
              title: self.addTeachingRuleForm.addTeachingName, //教研组组名称
            };
            request.post("/backapi/Classify/addTeaching", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addTeachingDialog = false;
                self.getSetTeachingPageData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.addTeachingDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeAddTeachingDialog(ruleForm) {  //教研组组设置 新增教研组组 弹窗 关闭 取消 遮罩  空白处
        this.addTeachingDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //教研组设置 新增教研组 --end

      //教研组设置 添加用户  --start
      teachingSetAddUserClick(item) { //点击教研组 -添加用户 出现弹窗
        console.log(item, "点击教研组 -添加用户--得到该教研组信息");
        this.teachingSetAddUserRuleForm.teachingName = item.title; //教研组名称
        this.teachingSetAddUserRuleForm.teachingId = item.id;// 教研组id
        this.teachingSetAddUserRuleForm.userName = ''; //清空用户名称
        this.teachingSetAddUserDialog = true;
      },
      confirmTeachingSetAddUser(ruleForm) {  // 点击教研组 -添加用户-- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              c_id: self.teachingSetAddUserRuleForm.teachingId, //教研组id
              u_id: self.checkedVal //用户id
            };
            request.post("/backapi/Classify/addTeachinguser", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.teachingSetAddUserDialog = false;
                self.getSetTeachingPageData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.teachingSetAddUserDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeTeachingSetAddUser(ruleForm) {  //点击教研组 -添加用户 弹窗 关闭 取消 遮罩  空白处
        this.teachingSetAddUserDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //点击教研组 -添加用户 --end

      //教研组设置 编辑教研组名字  --start
      editTeachingNameClick(item) { //编辑教研组名称 
        console.log(item, '得到当前点击的教研组信息');
        this.editTeachingNameRuleForm.teachingId = item.id; //教研组id
        this.editTeachingNameRuleForm.teachingName = '';//清空编辑 教研组名称
        this.editTeachingNameDialog = true;
      },
      confirmEditTeachingName(ruleForm) {  // 教研组设置 编辑教研组名字 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.editTeachingNameRuleForm.teachingId, //教研组id
              title: self.editTeachingNameRuleForm.teachingName, //教研组名称
            };
            request.post("/backapi/Classify/editTeaching", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editTeachingNameDialog = false;
                self.getSetTeachingPageData(self.activeName);
              } else {
                self.$message.error(res.message);
                self.editTeachingNameDialog = false;

              }
            });
          } else {
            return false;
          }
        });
      },
      closeEditTeachingNameDialog(ruleForm) {  //教研组设置 编辑教研组名字 弹窗 关闭 取消 遮罩  空白处
        this.editTeachingNameDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //教研组设置 编辑教研组名字 --end

      //教研组设置 删除教研组 --start
      deleteTeachingClick(item) {
        var _that = this;
        _that.$confirm("是否删除该教研组，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //教研组id
            };
            request.post("/backapi/Classify/delTeaching", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetTeachingPageData(_that.activeName);
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
      //教研组设置 删除教研组  --end

      //教研组设置审核人 组长 --start
      teachingSetReviewerClick(item) { //点击教研组成员 设置为教研组组长 出现弹窗
        console.log(item, "设置教研组组长--得到该教研组信息");
        this.teachingSetReviewerRuleForm.teachingNameTitle = item.title; //教研组名称
        this.teachingSetReviewerRuleForm.teachingReviewerId = item.id;// 教研组id
        this.teachingSetReviewerRuleForm.teachingReviewerName = ''; //教研组名称 用户名称
        this.teachingSetReviewerDialog = true;
      },
      confirmTeachingSetReviewer(ruleForm) {  // 教研组成员 设置为教研组组长 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              c_id: self.teachingSetReviewerRuleForm.teachingReviewerId, //教研组id
              u_id: self.checkedVal //用户id
            };
            request.post("/backapi/Classify/editTeachingsh", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.teachingSetReviewerDialog = false;
                self.getSetTeachingPageData(self.activeName);
              } else {
                self.teachingSetReviewerDialog = false;
                self.$message.error(res.message);
              }
            });
          } else {
            return false;
          }
        });
      },
      closeTeachingSetReviewer(ruleForm) {  //教研组成员 设置为教研组组长  弹窗 关闭 取消 遮罩  空白处
        this.teachingSetReviewerDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //教研组设置审核人 组长 --end
      //教研组设置 --end

      //栏目设置 ---start
      //获取栏目列表
      getSetColumnList() {
        var self = this;
        request.post("/backapi/Classify/column", {}, function (res) {
          if (res.code == 0) {
            self.setColumnList = res.data;
          }
        });
      },

      //添加栏目 --start
      addColumnClick() { //添加栏目名称 出现弹窗
        this.addColumnDialog = true;
      },
      confirmAddColumn(ruleForm) {  // 添加栏目 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            var sid = '';
            if (self.addGradeFlag == 1) { //如果是小学
              sid = self.primaryGradeClassData[0].s_id;
            } else if (self.addGradeFlag == 2) { //如果是初中
              sid = self.middleGradeClassData[0].s_id;
            }
            let data = {
              s_id: sid, //校区id
              title: self.addColumnRuleForm.columnName, //栏目名称
            };
            request.post("/backapi/Classify/addColumn", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.addColumnDialog = false;
                self.getSetColumnList();
              } else {
                this.$message.error(res.message);
                self.addColumnDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeAddColumnDialog(ruleForm) {  //添加栏目 弹窗 关闭 取消 遮罩  空白处
        this.addColumnDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //添加栏目 --end

      //编辑栏目名称  --start
      editColumnNameClick(item) {  //编辑栏目名称
        console.log('点击得到当前栏目的信息', item);
        this.editColumnNameDialog = true;
        this.editColumnNameRuleForm.columnId = item.id; //栏目id
        this.editColumnNameRuleForm.columnName = ''; //栏目名称
      },
      confirmEditColumnName(ruleForm) {  // 编辑栏目 -- 弹窗 确认按钮
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var self = this;
            let data = {
              id: self.editColumnNameRuleForm.columnId, //栏目id
              title: self.editColumnNameRuleForm.columnName, //栏目名称
            };
            request.post("/backapi/Classify/editColumn", data, function (res) {
              if (res.code == 0) {
                self.$message({
                  type: "success",
                  message: res.message
                });
                self.editColumnNameDialog = false;
                self.getSetColumnList();
              } else {
                this.$message.error(res.message);
                self.editColumnNameDialog = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      closeEditColumnNameDialog(ruleForm) {  //编辑 弹窗 关闭 取消 遮罩  空白处
        this.editColumnNameDialog = false;
        this.$nextTick(() => {
          this.$refs[ruleForm].resetFields();
        });
      },
      //编辑栏目名称  --end

      //删除栏目 --start
      deleteColumnClick(item) {
        var _that = this;
        _that.$confirm("是否删除该栏目，是否确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = {
              id: item.id, //栏目id
            };
            request.post("/backapi/Classify/delColumn", data, function (res) {
              if (res.code == 0) {
                _that.$message({
                  type: "success",
                  message: res.message
                });
                _that.getSetColumnList();
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
      //删除栏目  --end
      //栏目设置 ---end



    },
    mounted() {
      this.getGradeClassData();
      // this.getGradeClassData(this.activeSchool);
    }
  };
</script>