import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop'
import Goods from '../pages/Shop/goods'
import Ratings from '../pages/Shop/ratings'
import Info from '../pages/Shop/info'

export default [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{ showFooter: true }
    },
    {
        path:'/shop',
        component:Shop,
        redirect:'/shop/goods',
        children:[
            {
                path:'/shop/goods',
                component:Goods,
            },
            {
                path:'/shop/ratings',
                component:Ratings,
            },
            {
                path:'/shop/info',
                component:Info,
            }
        ]
    },
    {
        path:'/search',
        component:Search,
        meta:{ showFooter: true }
    },
    {
        path:'/order',
        component:Order,
        meta:{ showFooter: true }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{ showFooter: true }
    },
    {
        path:'/login',
        component: Login,
    }

]