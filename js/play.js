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
        alertMsg:'',
        isLogin:false,
        menus:[],
        images: []
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
            var _this = this
            var storage = window.localStorage
            if(_this.user_name == ''){
                _this.user_name_p = '用户账户不能为空'
                return false;
            }
            if(_this.user_pwd == ''){
                _this.user_pwd_p = '用户密码不能为空'
                return false;
            }
            this.$http.post('http://api.890vip.cn/api/site/login',{"user_name":this.user_name,"user_pwd":this.user_pwd},{emulateJSON:true}).then((res) => {
                if(res.body.status == 1){
                    _this.isLogin = false
                    storage.setItem('token',res.body.token)
                    _this.getMenus();
                    _this.getLists();
                }else{
                    _this.alertMsg = res.body.message
                }

            }, (res) => {
                console.log(res)
            })
        },
        getMenus: function () {
            var _this = this
            this.$http.get('http://api.890vip.cn/api/menu/menulist').then((res) => {
                _this.menus = res.body.result
            }, (res) => {
                console.log(res)
            })
        },
        getLists:function () {
            var storage = window.localStorage
            var token = storage.getItem('token');
            this.$http.post('http://api.890vip.cn/api/play/lists',{"token":token},{emulateJSON:true}).then((res) => {
                _this.images = res.body.result

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
