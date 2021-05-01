<template>
    <nav class="slide_nav">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(items, index) in category" :key="index">
                    <a href="javascript:" class="link_to_food" v-for="(item, index) in items" :key="index">
                        <div class="food_container">
                            <img :src="`https://cube.elemecdn.com/${item.image_url}`">
                        </div>
                        <span>{{item.title}}</span>
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </nav>
</template>

<script>
    import Swiper, { Pagination } from 'swiper';
    import 'swiper/swiper-bundle.css';
    Swiper.use([Pagination]);
    import {mapState} from 'vuex'

    export default {
        name: "slideNav",
        computed:{
            ...mapState({
                category: state => state.home.category
            }),
        },
        watch:{
            /*  new swiper时机很重要！不然出现布局或者滑动不符合预期的现象.
                因为数据加载还没渲染好,经过几个步骤进行处理需要一定时间
             */
            category(){
                this.$nextTick(()=>{
                    new Swiper('.swiper-container',{
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        loop: true,
                    })
                })
            }
        },

    }
</script>

<style  lang="stylus" scoped >
    @import "../../common/stylus/mixins.styl"
    .slide_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                    display flex
                    justify-content center
                    align-items flex-start
                    flex-wrap wrap
                    height 100%
                    .link_to_food
                        width 25%
                        .food_container
                            display block
                            width 100%
                            text-align center
                            padding-bottom 10px
                            font-size 0
                            img
                                display inline-block
                                width 50px
                                height 50px
                        span
                            display block
                            width 100%
                            text-align center
                            font-size 13px
                            color #666
            .swiper-pagination
                >span.swiper-pagination-bullet-active
                    background #02a774
</style>