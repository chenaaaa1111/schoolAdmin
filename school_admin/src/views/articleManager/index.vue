<template>
    <div>
            <MainTabContent :showArticle="showArticle" :showView="showView"></MainTabContent>
    </div>
</template>
<script>
        import MainTabContent from "@/components/TabsCompnents.vue"

    export default{
        data(){
            return {
                showArticle:true,
                showView:false
            }
        },
        components:{
            MainTabContent
        }
    }
</script>