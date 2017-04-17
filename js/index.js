var app = new Vue({
    el: '#app',
    data: {
        domain:'http://api.890vip.cn/',
        author: '890',
        message: '欢迎来到我的博客',
        icp: "陕ICP备16003703号",
        copyright: "Design by 890",
        menus:[],
        blogs: []
    },
    methods: {
        getMenus: function () {
            var _this = this
            this.$http.get(_this.domain+'menu/menulist').then((res) => {
                _this.menus = res.body.result
            }, (res) => {
                console.log(res)
            })
        },
        getBlogs: function () {
            var _this = this
            this.$http.get(_this.domain+'blog/index').then((res) => {
                _this.blogs = res.body.result
            }, (res) => {
                console.log(res)
            })
        },
        getDetail: function (id) {
            window.location.href = "/detail/"
            var storage = window.localStorage
            storage.setItem('id', id)
        }
    },
    mounted: function () {
        var _this = this
        _this.getMenus();
        _this.getBlogs();
    }
})
