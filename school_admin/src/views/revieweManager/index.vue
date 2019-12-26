<template>
    <div>
            <MainTabContent :showArticle="false" :showView="true"></MainTabContent>
    </div>
</template>
<script>
        import MainTabContent from "@/components/TabsCompnents.vue"

    export default{
        data(){
            return {

            }
        },
        components:{
            MainTabContent
        }
    }
</script>