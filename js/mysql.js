var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    item:[]
  },
  methods:{
    getSubItem:function(index,subindex){
      var _this = this
    },
    getDetail:function(pid,cid){
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('data/catalog/sub_mysql.json').then((res) => {
        _this.item = res.body.result
    },(res) => {
        console.log(res)
    })
    var storage=window.localStorage
    storage.getItem('id')
  }
})