<template>
    <footer class="app_footer">
        <a class="guide_item" :class="{on: $route.path === '/home'}" @click.prevent="goPath('/home')">
            <span class="item_icon">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon-test"></use></svg>
            </span>
            <span>外卖</span>
        </a>
        <a class="guide_item" :class="{on: $route.path === '/search'}" @click.prevent="goPath('/search')">
            <span class="item_icon">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-search"></use></svg>
            </span>
            <span>搜索</span>
        </a>
        <a class="guide_item" :class="{on: $route.path === '/order'}" @click.prevent="goPath('/order')">
            <span class="item_icon">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-order"></use></svg>
            </span>
            <span>订单</span>
        </a>
        <a class="guide_item" :class="{on: $route.path === '/profile'}" @click.prevent="goPath('/profile')">
            <span class="item_icon">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-face-profile"></use></svg>
            </span>
            <span>我的</span>
        </a>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter",
        methods:{
            goPath(path){
                path !== this.$route.path && this.$router.push(path)
            },
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .app_footer
        top-border-1px(#e4e4e4)
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        background-color #fff
        width 100%
        height 50px
        display flex
        .guide_item
            display flex
            flex 1
            text-align center
            flex-direction column
            align-items center
            margin 5px
            color #999999
            &.on
                color $primary_theme_color
            .item_icon
                .icon
                    width 28px
                    height 28px
                    vertical-align -0.15em
                    fill currentColor
                    overflow hidden
</style>