var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    copyright:"blogs.890vip.cn",
    items:[]
  },
  methods:{
    getSubItem:function(index,subindex){
      var _this = this
      this.$http.get('data/sub_'+ subindex +'.json').then((res) => {
          _this.items[index]["subitem"] = res.body.result
      },(res) => {
          console.log(res)
      })
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('data/item.json').then((res) => {
        _this.items = res.body.result.list
    },(res) => {
        console.log(res)
    })
  }
})