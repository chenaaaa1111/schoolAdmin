<!-- 查看文章详情 -->
<template>
    <div class="articleItems">
        <div>
            <el-button>编辑</el-button>
            <el-button>删除</el-button>

        </div>
        <div class="itemContainer">
            <h4>如何评价少年的你？</h4>
            <p class="gray">发布于 2019/08/22 09:23</p>
            <div class="avotor smallavotor">
                <div class="demo-image__placeholder">
                    <div class="block">

                        <el-image :src="Imgsrc" class="avotorImg"></el-image>
                        <span class="demonstration">柳子璇</span>
                    </div>
                </div>
            </div>
            <div class="content">
                sjdfasdkskdl;faksd;lfkasl;dkfalsdkflaskdlf;k
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                Imgsrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
            }
        }
    }
</script>
<style scoped>
    .content{
        padding-top: 30px;
    }
    .avotorImg {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 10px;
    }

    .articleItems {
        background: #fff;
        padding: 30px;
    }

    .itemContainer {
        width: 960px;
        margin: 0 auto;
    }
</style>