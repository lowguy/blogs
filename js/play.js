var app = new Vue({
    el: '#app',
    data: {
        author: '890',
        message: '欢迎来到我的博客',
        icp: "陕ICP备16003703号",
        copyright: "Design by 890",
        user_name_p:'请输入账号',
        user_name:'',
        user_pwd_p:'请输入密码',
        user_pwd:'',
        isLogin:false,
        menus:[],
        blogs: []
    },
    methods: {
        checkLogin: function () {
            var storage = window.localStorage
            var token = storage.getItem('token');
            if(!token){
                this.isLogin = !this.isLogin;
            }
        },
        login:function () {
            var storage = window.localStorage
            this.$http.post('http://api.890vip.cn/api/site/login',{"user_name":this.user_name,"user_pwd":this.user_pwd},{emulateJSON:true}).then((res) => {
                storage.setItem('token',res.body.token)
            }, (res) => {
                console.log(res)
            })
        }
    },
    mounted: function () {
        var _this = this
        _this.checkLogin()
    }
})
