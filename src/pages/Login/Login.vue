<template>
        <section class="loginContainer">
            <div class="loginInner">
                <div class="login_header">
                    <h2 class="login_logo">饿了么外卖</h2>
                    <div class="login_header_title">
                        <a href="javascript:;" @click="inWhatFrom='message'" :class="{on:inWhatFrom === 'message'}">短信登录</a>
                        <a href="javascript:;" @click="inWhatFrom='username'" :class="{on:inWhatFrom === 'username'}">密码登录</a>
                    </div>
                </div>

                <div class="login_content">
                    <form>
<!--                        <div :class="{on: inWhatFrom === 'message'}">-->
                        <validation-observer  ref="mes_form" tag="div" :class="{on: inWhatFrom === 'message'}">
                            <section class="login_message">
                                <ValidationProvider rules="required|phone" v-slot="{ errors }" >
                                    <input v-model="phone" type="tel" maxlength="11" placeholder="手机号">
                                    <!-- 表达式后的 !rightPhoneNumber || countDownTime 你以为会自动将数字转换为布尔值其实是错的，需要一个明确返回布尔值的表达式: countDownTime > 0 -->
                                    <!-- disable是个坑，|| && 短路运算， ||是遇到前面表达式true短路，&& 前面表达式false短路 -->
                                    <!--  disabled 只看布尔值，任意字符串都识别为禁用状态，true为禁用，false为不禁用 -->
                                    <button class="get_verification"
                                            @click.prevent="sendCode"
                                            :disabled="!rightPhoneNumber || countDownTime > 0"
                                            :class="{rightPhone:rightPhoneNumber}">{{countDownTime ? `还有${countDownTime}s重新获取` : '获取验证码'}}</button>
                                    <span >{{errors[0]}}</span>
                                </ValidationProvider>
                            </section>
                            <section class="login_verification">
                                <ValidationProvider rules="required|captcha" v-slot="{ errors }">
                                    <input v-model="captcha" type="tel" maxlength="8" placeholder="验证码">
                                    <span>{{errors[0]}}</span>
                                </ValidationProvider>
                            </section>
                            <section class="login_hint">
                                温馨提示：未注册的手机号，登录时将自动注册，且代表已同意
                                <a href="javascript:;">《用户服务协议》</a>
                            </section>
                        </validation-observer>
<!--                        <div :class="{on: inWhatFrom === 'username'}">-->
                        <validation-observer ref="usr_form" tag="div" :class="{on: inWhatFrom === 'username'}" >
                            <section class="login_message">
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="username" type="text" placeholder="手机/邮箱/用户名">
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </section>
                            <section class="login_verification">
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input  v-model="pwd" :type="isShowPwd ? 'tel' : 'password'" maxlength="8" placeholder="密码">
                                    <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                                        <div class="switch_circle" :class="{on: isShowPwd}"></div>
                                        <span class="switch_text">{{ isShowPwd ? 'abc' : '...' }}</span>
                                    </div>
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </section>
                            <section class="login_message">
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="captcha" type="text" maxlength="11" placeholder="验证码">
                                    <img ref="captcha" @click="refreshCaptcha"  class="get_verification" src="http://192.168.0.100:4000/captcha" alt="captcha">
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </section>
                        </validation-observer>
                        <button class="login_submit" @click.prevent="handleSubmit">登录</button>
                    </form>
                    <a href="javascript:;" class="about_us">关于我们</a>
                </div>
                <a href="javascript:" class="go_back">
                    <i class="iconfont icon-jiantouzuo"></i>
                </a>
            </div>
        </section>
</template>

<script>
    import {extend, ValidationProvider, ValidationObserver} from 'vee-validate'
    import { required, email } from 'vee-validate/dist/rules';

    import { sendCode } from '../../api'

    extend('email', email)
    extend('required',{
        ...required,
        message:'必须填写内容'
    })

    extend('phone',{
        validate: (value) => {
            return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
        },
        message: '手机号格式不正确'
    })

    extend('captcha',{
        validate: (value) => {
            return /^\d{4,6}$/.test(value)
        },
        message: '验证码格式不正确'
    })

    export default {
        name: "Login",
        components:{
            ValidationProvider,
            ValidationObserver
        },
        data(){
            return {
                inWhatFrom: 'username',
                isShowPwd: false,
                phone:'',
                countDownTime:0,
                captcha:'',
                username:'',
                pwd:'',
            }
        },
        methods:{
            refreshCaptcha(){
                // let sj = Math.floor(Math.random() * 10000000)
                let sj = Date.now()
                this.$refs.captcha.src="http://localhost:4000/captcha?sj=" + sj
            },

            //发送短信验证码（手机登录）
            async sendCode(){
                this.countDownTime = 5
                let intervalId = setInterval(()=>{
                    this.countDownTime --
                    if(this.countDownTime === 0){
                        clearInterval(intervalId)
                    }
                },1000)

                let result = await sendCode({phone: this.phone})
            },

            //登录
            async handleSubmit(){
                //表单验证状态 true | false
                let status = false;
                //后端返回的登录状态
                let response = null;
                const {
                    username,
                    pwd,
                    phone,
                    captcha,
                } = this
                //表单检查登录方式（用户名登录 | 手机号登录）
                if(this.inWhatFrom === 'username'){
                    status = await this.$refs.usr_form.validate()
                    if(status){
                        response = await this.$API.loginWithUserName({username, pwd, captcha})
                    }
                }else{
                    status = await this.$refs.mes_form.validate()
                    if(status){
                        response = await this.$API.loginWithPhoen({phone, captcha})
                    }
                }
                //后台返回数据code进行登录判断
                //注意：需要启用后台返回token（jwt）
                if(response.code === 0){
                    alert('登录成功')
                    this.$router.replace('/profile')
                    this.$store.dispatch('getUserInfoAction',response.data)
                }else if(response.code === 1){
                    alert(response.msg)
                }else{
                    alert('登录失败')
                }

                console.log(response)


            }
        },
        computed:{
            rightPhoneNumber(){
                return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
            }
        }

    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixins.styl'
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color $primary_theme_color
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color $primary_theme_color
                            font-weight 700
                            border-bottom 2px solid $primary_theme_color
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid $primary_theme_color
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.rightPhone
                                    color $primary_theme_color
                        .login_verification
                            position relative
                            margin-top 24px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 10px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 20px
                                line-height 20px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background $primary_theme_color
                                >.switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 20px
                                    height 20px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.on
                                        transform translateX(25px)
                        .login_hint
                            margin-top 24px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color $primary_theme_color
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background $primary_theme_color
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>