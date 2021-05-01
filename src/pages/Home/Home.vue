<template>
    <div>
        <app-header :title="address.name">
            <template slot="header_left">
                <span class="header_search">
                    <span class="item_icon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-search"></use></svg></span>
                </span>
            </template>
            <template slot="header_right">
                <span class="header_login">
                    <span class="header_login_text">登录|注册</span>
                </span>
            </template>
        </app-header>
        <slide-nav />
        <shop-list />
    </div>
</template>

<script>
    import AppHeader from '../../components/AppHeader/AppHeader'
    import SlideNav from '../../components/SlideNav'
    import ShopList from '../../components/ShopList'
    import {mapState} from 'vuex'

    export default {
        name: "home",
        components:{
            AppHeader,
            SlideNav,
            ShopList,
        },
        mounted(){
            this.$store.dispatch('getAddr',{latitude:40.057423, longitude:116.289391})
            this.$store.dispatch('categoryList')
            this.$store.dispatch({
                type:'getShops',
                latitude:40.057423,
                longitude:116.289391
            })
        },
        computed:{
            ...mapState({
                address: state => state.home.address,
            })
        },

    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixins.styl'
    .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        iconFont(#fff)
    .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
            color #fff
</style>