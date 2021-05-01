<template>
    <section class="AppContainer">
        <router-view></router-view>
        <app-footer v-if="$route.meta.showFooter"></app-footer>
    </section>
</template>

<script>
    import AppFooter from "./components/AppFooter/AppFooter";
    import { SAVE_USER_INFO } from './model/mutation-types'
    export default {
        name: 'App',
        props:['noFooter'],
        components:{
          AppFooter,
        },
        async mounted(){
            //自动登录，解决刷新vuex数据丢失，重新根据用户识别信息token请求数据
            const result = await this.$API.auto_login()
            this.$store.commit(SAVE_USER_INFO, result.data)
        }
    }
</script>

<style lang="stylus">
    .AppContainer
        width 100%
        height 100%
        background #f5f5f5
        position relative
</style>