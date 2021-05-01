<template>
    <section class="profile">
        <app-header title="我的" />
        <section class="profile-number">
            <a href="javascript:" class="profile-link">
                <div class="profile_image">
                    <span class="icon-user-header"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-huabanfuben"></use></svg></span>
                </div>
                <div class="user-info" @click="toLogin">
                    <p v-if="!user.phone" class="user-info-top">{{user.name ? user.name : '登录/注册'}}</p>
                    <p v-if="!user.name">
                        <span class="icon-phone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-phone"></use></svg></span>
                        <span class="icon-mobile-number">{{user.phone ? user.phone : '暂无绑定手机号'}}</span>
                    </p>
                </div>
                <span class="icon-user-info">
                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-1201youjiantou"></use></svg>
                </span>
            </a>
        </section>
        <section class="profile_info_data border-1px">
            <ul class="info_data_list">
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0.00</span>元</span>
                    <span class="info_data_bottom">我的余额</span>
                </a>
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0</span>个</span>
                    <span class="info_data_bottom">我的优惠</span>
                </a>
                <a href="javascript:" class="info_data_link">
                    <span class="info_data_top"><span>0</span>分</span>
                    <span class="info_data_bottom">我的积分</span>
                </a>
            </ul>
        </section>
        <section class="profile_my_order border-1px">
            <!-- 我的订单 -->
            <a href="javascript:" class="my_order">
                <span>
                  <svg class="icon" aria-hidden="true"><use xlink:href="#icon-144"></use></svg>
                </span>
                <div class="my_order_div">
                    <span>我的订单</span>
                    <span class="my_order_icon">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-1201youjiantou"></use></svg>
                    </span>
                </div>
            </a>
            <!-- 积分商城 -->
            <a href="javascript:" class="my_order">
                <span>
                  <svg class="icon" aria-hidden="true"><use xlink:href="#icon-wodejifen"></use></svg>
                </span>
                <div class="my_order_div">
                    <span>积分商城</span>
                    <span class="my_order_icon">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-1201youjiantou"></use></svg>
                    </span>
                </div>
            </a>
            <!-- 硅谷外卖会员卡 -->
            <a href="javascript:" class="my_order">
                <span>
                  <svg class="icon" aria-hidden="true"><use xlink:href="#icon-huabanfuben2"></use></svg>
                </span>
                <div class="my_order_div">
                    <span>硅谷外卖会员卡</span>
                    <span class="my_order_icon">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-1201youjiantou"></use></svg>
                    </span>
                </div>
            </a>
        </section>
        <section class="profile_my_order border-1px">
            <!-- 服务中心 -->
            <a href="javascript:" class="my_order">
                <span>
                  <svg class="icon" aria-hidden="true"><use xlink:href="#icon-fuwuzhongxin"></use></svg>
                </span>
                <div class="my_order_div">
                    <span>服务中心</span>
                    <span class="my_order_icon">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-1201youjiantou"></use></svg>
                    </span>
                </div>
            </a>
        </section>
        <section v-show="user._id" class="profile_my_order border-1px">
            <div class="my_order_div" >
                <mt-button @click="logout" type="danger" style="width:100%">退出登录</mt-button>
            </div>
        </section>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import { LOGOUT } from '../../model/mutation-types'
    import AppHeader from '../../components/AppHeader/AppHeader'
    import {MessageBox, Toast} from "mint-ui";
    export default {
        name: "Profile",
        components:{
            AppHeader,
        },
        methods:{
            toLogin(){
                //判断用户是否登录 this._id
                !!this.user._id || this.$router.replace('/login')
            },

            logout(){
                MessageBox.confirm('确定退出账号么').then(res => {
                    this.$store.commit(LOGOUT)
                    Toast('退出成功')
                })
            }
        },
        computed:{
            ...mapState({
                user: state => state.user_info
            })
        }
    }
</script>

<style lang="stylus" >
    @import "../../common/stylus/mixins.styl"
    .profile //我的
        width 100%
        overflow hidden
        .profile-number
            margin-top 43px
            .profile-link
                clearFix()
                position relative
                display block
                background $primary_theme_color
                padding 20px 10px
                .profile_image
                    float left
                    width 60px
                    height 60px
                    border-radius 50%
                    overflow hidden
                    vertical-align top
                    background #f2f2f2
                    .icon-user-header svg
                        width 60px;
                        height 60px;
                    .icon-person_round_fill
                        background #e4e4e4
                        font-size 62px
                .user-info
                    float left
                    margin-top 8px
                    margin-left 15px
                    p
                        font-weight: 700
                        font-size 18px
                        color #fff
                        &.user-info-top
                            padding-bottom 8px
                        .icon-phone svg
                            vertical-align top
                            width 20px
                            height 20px
                            .icon-mobile
                                font-size 16px
                                vertical-align middle
                        .icon-mobile-number
                            font-size 14px
                            color #fff
                .icon-user-info svg
                    width 14px
                    height 14px
                    position absolute
                    right 15px
                    top 40%
                    fill: #fff
        .profile_info_data
            bottom-border-1px(#e4e4e4)
            width 100%
            background #fff
            overflow hidden
            .info_data_list
                clearFix()
                .info_data_link
                    float left
                    width 33%
                    text-align center
                    border-right 1px solid #f1f1f1
                    .info_data_top
                        display block
                        width 100%
                        font-size 14px
                        color #333
                        padding 15px 5px 10px
                        span
                            display inline-block
                            font-size 30px
                            color #f90
                            font-weight 700
                            line-height 30px
                    .info_data_bottom
                        display inline-block
                        font-size 14px
                        color #666
                        font-weight 400
                        padding-bottom 10px
                .info_data_link:nth-of-type(2)
                    .info_data_top
                        span
                            color #ff5f3e
                .info_data_link:nth-of-type(3)
                    border 0
                    .info_data_top
                        span
                            color #6ac20b
        .profile_my_order
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .my_order
                display flex
                align-items center
                padding-left 15px
                >span
                    display flex
                    align-items center
                    width 20px
                    height 20px
                    >.iconfont
                        margin-left -10px
                        font-size 30px
                    .icon-order-s
                        color #02a774
                    .icon-jifen
                        color #ff5f3e
                    .icon-vip
                        color #f90
                    .icon-fuwu
                        color #02a774
                .my_order_div
                    width 100%
                    border-bottom 1px solid #f1f1f1
                    padding 18px 10px 18px 0
                    font-size 16px
                    color #333
                    display flex
                    justify-content space-between
                    span
                        display block
                    .my_order_icon
                        svg
                            &.icon
                                width 10px
                                height 10px
</style>