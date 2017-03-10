var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    selected:1,
    item:[]
  },
  methods:{
    getDetail:function(id){
      var storage=window.localStorage
      storage.setItem('id',id)
      this.selected = id
      console.log(id)
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('/data/catalog/sub_mysql.json').then((res) => {
        _this.item = res.body.result
    },(res) => {
        console.log(res)
    })
    var storage=window.localStorage
    var id = storage.getItem('id')
    _this.selected = id
  }
})