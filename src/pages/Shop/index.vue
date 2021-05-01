<template>
    <section>
        <ShopHeader />
        <div class="shopTabs">
            <div class="tabItem"><router-link to="/shop/goods">订餐</router-link></div>
            <div class="tabItem"><router-link to="/shop/ratings">评价</router-link></div>
            <div class="tabItem"><router-link to="/shop/info">商家</router-link></div>
        </div>
        <router-view></router-view>
    </section>
</template>
<script>
    import ShopHeader from '../../components/ShopHeader'
    export default {
        name: "index",
        components:{
            ShopHeader,
        },
        methods:{

        },
        computed:{

        }
    }
</script>

<style lang="stylus" >
@import "../../common/stylus/mixins.styl"
.shopTabs
    display flex
    justify-content space-around
    font-size 15px
    background-color #fff
    .tabItem
        flex 1
        text-align center
        height 40px
        line-height 40px
        position relative
        a.router-link-active
            color $primary_theme_color
            &:after
                position absolute
                left 50%
                bottom 0
                margin-left: -20px
                content ''
                display block
                width 40px
                height 2px
                background $primary_theme_color
                /* 物理1像素的边框 transform scaleY(.5) */
</style>
