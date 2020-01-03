<template>
    <div class="mianTabContent" id="mianTabContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="topseach" v-if="showView">
                <div class="checklist">
                    <h3>审核列表</h3>
                    <div class="radios">
                        <el-radio-group v-model="type" @change="changeType">
                            <el-radio :label="1">待审核 </el-radio>
                            <el-radio :label="2">审核通过 </el-radio>
                            <el-radio :label="3">审核未通过 </el-radio>
                        </el-radio-group>

                    </div>
                </div>
                <div>
                    <el-row :gutter="10">
                        <el-col :span="4">
                            <el-input size="medium" placeholder="请输入内容" v-model="keyword">
                                <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick">
                                </i>
                            </el-input>
                        </el-col>
                        <el-col :span="20">
                            <div class="block">
                                <span class="demonstration">发布时间</span>
                                <el-date-picker class="elDate" value-format="yyyy-MM-dd" v-model="startTime" type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                --

                                <el-date-picker value-format="yyyy-MM-dd" v-model="endTime" type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <el-button class="seachdate" @click="seachTime">查询</el-button>
                            </div>
                            <template>
                                <div class="rightSlects">
                                    <el-select v-model="schoolName" @change="getGrade" class="elInput"
                                        placeholder="请选择">
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
                                    <el-select v-model="className" collapse-tags class="elInput"
                                        style="margin-left: 20px;" placeholder="请选择">
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
            </div>
            <el-tab-pane label="班级空间" name="classSpace" :class="showView">
                <div class="topList" v-if="showView">
                    <template>
                        <el-table :data="classData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" label="发布日期" width="180">
                            </el-table-column>
                            <el-table-column prop="column_name" label="发布主题">
                            </el-table-column>
                            <el-table-column prop="content" label="发布内容">
                                <template slot-scope="scope">
                                    {{scope.row.content&&scope.row.content.match(/[\u4e00-\u9fa5]/g)?scope.row.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}

                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="发布人">
                            </el-table-column>
                            <el-table-column prop="address" label="操作">
                                <template slot-scope="scope">
                                    <span>
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-show="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="4">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="20">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="schoolName" @change="getSchoolPart" class="elInput"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select v-model="schoolPartName" @change="getGrade" class="elInput"
                                                    style="margin-left: 10px;"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolPartOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="gradeName" @change="getClass" collapse-tags
                                                        class="elInput" style="margin-left: 10px;" placeholder="请选择">
                                                        <el-option v-for="item in gradeOptions" :key="item.value"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="className" collapse-tags class="elInput"
                                                        style="margin-left: 10px;" placeholder="请选择">
                                                        <el-option v-for="item in classOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="classData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1}}">
                                            查看
                                        </router-link>
                                    </span>

                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage2" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="年级空间" name="gradeSpace" v-if="showArticle">
                <div class="topList" v-if="showView">

                    <template>
                        <el-table :data="classData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" label="发布日期" width="180">
                            </el-table-column>
                            <el-table-column prop="column_name" label="发布主题">
                            </el-table-column>
                            <el-table-column prop="content" label="发布内容">
                                <template slot-scope="scope">
                                    {{scope.row.content&&scope.row.content.match(/[\u4e00-\u9fa5]/g)?scope.row.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}

                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="发布人">
                            </el-table-column>
                            <el-table-column prop="address" label="操作">
                                <template slot-scope="scope">
                                    <span>
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-show="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="4">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="20">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="schoolName" @change="getSchoolPart" class="elInput"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select v-model="schoolPartName" @change="getGrade" class="elInput"
                                                    style="margin-left: 10px;"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolPartOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="gradeName" @change="getClass" collapse-tags
                                                        class="elInput" style="margin-left: 10px;" placeholder="请选择">
                                                        <el-option v-for="item in gradeOptions" :key="item.value"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <!-- <el-select v-model="className" collapse-tags class="elInput"
                                                        style="margin-left: 10px;" placeholder="请选择">
                                                        <el-option v-for="item in classOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select> -->
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="classData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1}}">
                                            查看
                                        </router-link>
                                    </span>

                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage2" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="社团空间" name="teamSpace">
                <div class="topList" v-if="showView">

                    <template>
                        <el-table :data="teamData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type=='1',url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-show="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage3" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                 
                                                    <el-select v-model="teamName" collapse-tags class="elInput"
                                                        style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in teamOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="teamData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>

                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage4" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="专题空间" name="specialSpace">
                <div class="topList" v-if="showView ">

                    <template>
                        <el-table :data="spicialData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'3',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-if="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage5" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-seach"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="spicialSchoolName" @change="changeSpicial" class="elInput"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in spicialSchoolOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="spiciaName" collapse-tags class="elInput"
                                                        style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in spicialOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seachSpicial">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="spicialData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'3',showCheck:scope.row.type==1}}">
                                            查看
                                        </router-link>
                                    </span>

                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage6" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="课题空间" name="topicSpace" v-if="showView">
                <div class="topList" v-if="showView">

                    <template>
                        <el-table :data="spicialData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'3',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-if="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage5" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-seach"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="schoolName" @change="getGrade" class="elInput"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select v-model="gradeName" @change="getClass" collapse-tags
                                                        class="elInput" style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in gradeOptions" :key="item.value"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="className" collapse-tags class="elInput"
                                                        style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in classOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="spicialData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'3',showCheck:scope.row.type==1}}">
                                            查看
                                        </router-link>
                                    </span>

                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage6" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="教研空间" name="teachingSpace">
                <div class="topList" v-if="showView">
                    <template>
                        <el-table :data="teachingData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" label="发布日期" width="180">
                            </el-table-column>
                            <el-table-column prop="column_name" label="发布主题">
                            </el-table-column>
                            <el-table-column prop="content" label="发布内容">
                                <template slot-scope="scope">
                                    {{scope.row.content&&scope.row.content.match(/[\u4e00-\u9fa5]/g)?scope.row.content.match(/[\u4e00-\u9fa5]/g).join("").substring(0,200):'文章'}}

                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="发布人">
                            </el-table-column>
                            <el-table-column prop="address" label="操作">
                                <template slot-scope="scope">
                                    <span>
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1,url:'/backapi/Management/auditClass'}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span v-if="scope.row.type==1" @click="showChek(scope.row.id)"
                                        style="color:  rgb(0, 0, 238);">审核</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage1" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="bottomnewList" v-if="showArticle">
                    <template>
                        <div>
                            <div class="topseach">

                                <div class="checklist">
                                    <h3>发布的新闻</h3>
                                </div>
                                <div>
                                    <el-row :gutter="10">
                                        <el-col :span="6">
                                            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search"
                                                v-model="keyword">
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="block">
                                                <span class="demonstration">发布时间</span>
                                                <el-date-picker class="elDate" value-format="yyyy-MM-dd"
                                                    v-model="startTime" type="date" placeholder="选择日期">
                                                </el-date-picker>
                                                --

                                                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd" type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                                <el-button class="seachdate" @click="seach">查询</el-button>
                                            </div>
                                            <template>
                                                <div class="rightSlects">
                                                    <el-select v-model="schoolName" @change="getGrade" class="elInput"
                                                        placeholder="请选择">
                                                        <el-option v-for="item in schoolOptions" :key="item.id"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select v-model="gradeName" @change="getClass" collapse-tags
                                                        class="elInput" style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in gradeOptions" :key="item.value"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-select v-model="className" collapse-tags class="elInput"
                                                        style="margin-left: 20px;" placeholder="请选择">
                                                        <el-option v-for="item in classOptions" :key="item.title"
                                                            :label="item.title" :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                    <el-button class="seachdate" @click="seach">筛选</el-button>

                                                </div>

                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-table :data="teachingData" style="width: 100%" class="tableTh">
                            <el-table-column prop="image" label="发布封面" width="180">
                                <template slot-scope="scope">
                                    <el-image :key="scope.row.name" style="width: 100px; height: 100px"
                                        src="http://pic1.win4000.com/wallpaper/4/5732e68f46b50.jpg" :fit="fit">
                                    </el-image>

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
                                        <router-link
                                            :to="{path :'/home/spaceItem',query:{id:scope.row.id,type:'1',showCheck:scope.row.type==1}}">
                                            查看
                                        </router-link>
                                    </span>
                                    <span @click="deleteArt(scope.row.id)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="classHandleChange"
                            :current-page.sync="currentPage2" :page-size="psize" layout="prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>确定审核通过嘛?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkArt">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style scoped>
    @import './../assets/css/maintabcontent.css';
</style>
<script>
    import request from '@/api/request.js';
    export default {
        props: {
            showArticle: {
                default: true
            }, //显示文章列表
            showView: {
                default: false
            }
        },
        data() {
            return {
                spicialSchoolOptions:[],
                spicialSchoolName:'',
                spicialOptions:[],
                spiciaName:'',
                keyword: '',
                url: '/backapi/Management/newClass',
                dialogVisible: false,
                selectId: '',
                type: 1,//1待审核2审核通过3审核未通过
                teaching: [],
                schoolPartName:'全部',
                schoolName: '全部',
                gradeName: '全部',
                className: '全部',//班级名称
                classData: [],
                classList: [],//班级新闻
                teamData: [],
                psize: 10,
                schoolPartOptions: [],
                teamName:'',
                teamOptions:[],
                page: 1,
                total: 0,
                teachingData: [],
                spaceData: [],
                ketiData: [],
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
                currentPage4: 1,
                currentPage5: 1,
                currentPage6: 1,
                school: '1',//学校名称
                gradeData: [],//年级名称
                gradeList: [],
                spicialData: [],
                specialList: [],
                schoolOptions: [],
                gradeOptions: [],
                classOptions: [],
                classTableData: [],//班级空间数据
                startTime: '',
                endTime: '',
                activeName: 'classSpace',
                fit: 'fill',
                tableData: [
                ],

            };
        },
        mounted() {
            var url = "/backapi/Management/newClass";
            var checkingUrl = "/roomapi/Room_Class/audit";
            this.getArticles(url, 'classData');
            this.getSchools(checkingUrl, 'classData');
            this.getSpicialNames();
        },
        methods: {
            seachSpicial(){//筛选专题
                var data={
                    keyword:this.keyword,
                    page:1,
                    psize:1,
                    strtime:this.startTime,
                    endtime:this.endTime,
                    s_id:this.spicialSchoolName
                }
                this.getArticles();
            },
            getSpicialNames(){
                request.post('/backapi/Statistical/ktlb',{},(res)=>{
                    this.spicialSchoolOptions=res.data;
                    this.spicialSchoolName=res.data[0].id;
                    this.changeSpicial(this.spicialSchoolName=res.data[0].id);
                })
            },
            changeSpicial(id){
                this.spicialSchoolOptions.forEach((item)=>{
                    if(item.id==id){
                        this.spicialOptions=item.subject;
                        if(this.spicialOptions.length>0){
                            this.spiciaName=this.spicialOptions[0].id;
                        }else{
                            this.spiciaName='';
                        }
                       
                    }
                })
            },
            seachTime() { //根据开始和结束时间查询
                this.page = 1;
                var data = {
                    strtime: this.startTime,
                    endTime: this.endTime,
                    page: this.page,
                    psize: this.psize,
                    keyword: this.keyword

                }
                request.post(this.url, data, (res) => {
                    var tab = this.tab;
                    if (res.code == 0) {
                        switch (tab) {
                            case 'classSpace':
                                this.classData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'gradeSpace':
                                this.gradeData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'specialSpace':
                                this.spicialData = res.data.model;
                                this.total = res.data.total;

                                break;
                            default://默认班级
                                this.classData = res.data.model;
                                this.total = res.data.total;

                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleIconClick() {
                console.log('1212');
                var data = {
                    page: 1,
                    keyword: this.keyword
                }
                this.page = 1;
                request.post(this.url, data, (res) => {
                    var tab = this.tab;
                    if (res.code == 0) {
                        switch (tab) {
                            case 'classSpace':
                                this.classData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'gradeSpace':
                                this.gradeData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'specialSpace':
                                this.spicialData = res.data.model;
                                this.total = res.data.total;

                                break;
                            default://默认班级
                                this.classData = res.data.model;
                                this.total = res.data.total;

                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            changeType(type) {
                console.log(type);
                this.type = type;
                this.getArticles()

            },
            showChek(id) {//显示审核弹框
                this.dialogVisible = true;
                this.selectId = id;
            },
            checkArt(id) {//审核
                var url = ""
                switch (this.activeName) {
                    case 'classSpace':
                        url = "/backapi/Management/auditClass"
                        break;
                    case 'gradeSpace':
                        url = "/backapi/Management/auditClass"
                        break;
                    case 'specialSpace':
                        url = "/backapi/Management/auditProject"
                        break;
                }
                request.post(url, { id: this.selectId }, (res) => {
                    if (res.code == 0) {
                        this.$message.success('操作成功');
                        this.dialogVisible = false;
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            classHandleChange(size) {
                console.log(size);
                this.page = size;
                var data = {
                    page: size,
                    type: this.type
                }
                this.getArticles();
            },
            getSchools() {
                let url = "/backapi/Statistical/bjlb";
                request.post(url, {}, (res) => {
                    res.data.unshift({ title: '全部', id: 'all' })
                    this.schoolOptions = res.data;
                    this.schoolName =this.schoolOptions[0].id;
                   this.getSchoolPart(this.schoolOptions[0].id);
                })
            },
            getSchoolPart(tab){
                console.log(tab)
                if (tab == 'all') {
                    this.schoolPartOptions = [{ title: '全部', id: '全部', class: [{ id: '全部', title: '全部' }] }];
                    this.gradeOptions = [{ title: '全部', id: 'all', class: [{ id: 'all', title: '全部' }] }];
                    this.schoolPartName="全部";
                    this.gradeName = "全部";
                    this.className = "全部";
                } else {
                    this.schoolOptions.forEach(element => {
                        if (element.id == tab) {                          
                            this.schoolPartOptions = element.level;
                            if(this.schoolPartOptions.length>0){
                                this.schoolPartName=this.schoolPartOptions[0].id;
                                getGrade(this.schoolPartOptions[0].id)
                            }else{
                                this.gradeName="";
                            }
                            
                        }
                    });
                }
            },
            getGrade(tab) {
                console.log(tab,'grade')
                if (tab == 'all') {
                    this.gradeOptions = [{ title: '全部', id: 'all', class: [{ id: 'all', title: '全部' }] }];
                    this.gradeName = "全部";
                    this.className = "全部";
                } else {
                    this.schoolPartOptions.forEach(element => {
                        if (element.id == tab) {
                            this.gradeOptions = element.garde;
                            if(element.garde.length>0){
                                this.gradeName= this.gradeOptions[0].id;
                                getClass(this.gradeOptions[0].id)
                            }else{
                                this.className="";
                            }
                            
                        }
                    });
                }

            },
            getClass(tab) {
                console.log(tab);
                if (tab == 'all' || '') {
                    this.tab = 'tab';
                } else {
                    this.gradeOptions.forEach(element => {
                        if (element.id == tab) {
                            this.classOptions = element.class;
                        }
                    });
                }

            },
            seach() {
            
                this.page = 1;
                this.getArticles();
            },
            deleteArt(res) {
                console.log('delete', res);
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
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
            handleSizeChange(size) {

            },

            handleClick(tab, event) {
                console.log(tab, event, 'handleClick');
                this.activeName = tab.name;
                this.page = 1;
                var url = "";
                this.getArticles(url, tab.name);
            },
            getArticles() {
                //默认获取班级
                var url='';
                var tab = this.activeName;
                let data = {
                    strtime: this.startTime,
                    endtime: this.endTime,
                    // type: this.type,
                    page: this.page,
                    psize: this.psize,
                    keyword: this.keyword
                };
                switch (tab) {
                    case 'classSpace'://班级
                        if (this.showArticle) {
                            url = "/backapi/Management/newClass";
                            data.s_id=this.schoolName=="全部"?'':this.schoolName;
                            data.l_id=this.schoolPartName=="全部"?'':this.schoolPartName;
                            data.g_id=this.gradeName=="全部"?'':this.gradeName;
                            data.c_id=this.className=="全部"?'':this.className;
                        } else {
                            url = "/roomapi/Room_Class/audit";
                        }

                        break;
                    case 'gradeSpace':
                        if (this.showArticle) {//年纪
                            url = "/backapi/Management/newClass";
                        } else {
                            url = "/roomapi/Room_Class/audit";
                        }

                        break;
                    case 'specialSpace':   //专题空间
                        data.s_id=this.spicialSchoolName;
                        if (this.showArticle) {
                            url = "/backapi/Management/newProject";
                        } else {
                            url = "/backapi/Management/auditProject";
                        }

                        break;
                    case 'teamSpace':   //社团空间
                        if (this.showArticle) {
                            url = "/backapi/Management/newCommunity";
                        } else {
                            url = "/backapi/Management/auditCommunity";
                        }

                        break;
                    case 'topicSpace':   //课题空间
                        if (this.showArticle) { //showArticle 为true 为文章管理，false为文章审核
                            url = "/backapi/Management/newCommunity";//接口还没有 
                        } else {
                            url = "/backapi/Management/auditCommunity";//接口还没有 
                        }

                        break;
                    case 'teachingSpace':   //教研空间
                        if (this.showArticle) {
                            url = "/backapi/Management/newTeaching";
                        } else {
                            url = "/roomapi/Teaching/audit";
                        }
                        break;
                    default://默认班级
                        if (this.showArticle) {
                            url = '/backapi/Management/newClass';
                        } else {
                            url = "/backapi/Management/auditClass";
                        }

                }
          
                request.post(url, data, (res) => {
                    if (res.code == 0) {
                        switch (tab) {
                            case 'classSpace':
                                this.classData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'gradeSpace':
                                this.gradeData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'specialSpace':
                                this.spicialData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'topicSpace':
                                this.topicData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'teamSpace':
                                this.teamData = res.data.model;
                                this.total = res.data.total;
                                break;
                            case 'teachingSpace':
                                this.teachingData = res.data.model;
                                this.total = res.data.total;
                                break;
                            default://默认班级
                                this.classData = res.data.model;
                                this.total = res.data.total;

                        }
                    } else {
                        this.$message.error(res.message)
                    }

                })
            },
            getNewArt(key) {//获取新发布
                var url = "";
                switch (key) {
                    case 'classSpace':
                        url = "/backapi/Management/newClass";
                        break;
                    case 'gradeSpace':
                        url = "/backapi/Management/newGrade";
                        break;
                    case 'specialSpace':
                        url = "/backapi/Management/newProject";
                        break;
                    default://默认班级
                        url = '/backapi/Management/newClass';
                }
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
                    switch (key) {
                        case 'classSpace':
                            this.classList = res.data.model;
                            break;
                        case 'gradeSpace':
                            this.gradeList = res.data.model;
                            break;
                        case 'specialSpace':
                            this.specialList = res.data.model;

                            break;
                        default://默认班级
                            this.classData = res.data.model;

                    }
                })
            }
        }
    }
</script>