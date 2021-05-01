<template>
    <!--首页头部-->
    <header class="app_header">
        <slot name="header_left"></slot>
        <span class="header_title">
            <span class="header_title_text ellipsis">{{title}}</span>
        </span>
        <slot name="header_right"></slot>
    </header>
</template>

<script>
    export default {
        name: "AppHeader",
        props:{
            title:{
                required: true,
                type: String,
                default: '定位中...'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .app_header
        background-color $primary_theme_color
        position fixed
        z-index 100
        left 0
        top 0
        width 100%
        height 45px
        .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 50%
            color #fff
            text-align center
            .header_title_text
                font-size 14px
                color #fff
                display block
</style>