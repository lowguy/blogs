var app = new Vue({
    el: '#app',
    data: {
        author: '890',
        message: '欢迎来到我的博客',
        icp: "陕ICP备16003703号",
        copyright: "Design by 890",
        menus:[],
        blogs: []
    },
    methods: {
        checkLogin: function () {
            var _this = this
            var storage = window.localStorage
            var token = storage.getItem('token')
            if(!token){
                this.$http.post('http://api.890vip.cn/api/site/login',{"user_name":"890","user_pwd":"123456"},{emulateJSON:true}).then((res) => {
                    console.log(res)
                    storage.setItem('token',res.body.result.token)
                }, (res) => {
                    console.log(res)
                })
            }

        }
    },
    mounted: function () {
        var _this = this
        _this.checkLogin()
    }
})
