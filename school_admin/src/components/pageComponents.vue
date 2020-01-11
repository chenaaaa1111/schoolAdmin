<templates>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
    </div>
</templates>