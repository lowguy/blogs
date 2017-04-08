var app = new Vue({
    el: '#app',
    data: {
        author: '890',
        message: '欢迎来到我的博客',
        icp: "陕ICP备16003703号",
        copyright: "Design by 890",
        blogs: []
    },
    methods: {
        getBlogsByType: function (type, index) {
            var _this = this
            _this.selected = index
            this.$http.get('http://api.890vip.cn/api/blog/lists/type/' + type).then((res) => {
                _this.blogs = res.body.result.list
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
        _this.getBlogsByType(1);
    }
})
