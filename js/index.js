var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    copyright:"blogs.890vip.cn",
    items:[]
  },
  methods:{
    getSubItem:function(index){
      this.items[index]['subitem'] = [
        {title:'sdsd'},
        {title:'sdsd'},
        {title:'sdsd'}
      ]
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('data/item.json').then((res) => {
        console.log(res)
        //this.items = res.body.result
    },(res) => {
        console.log(res)
    })
  }
})