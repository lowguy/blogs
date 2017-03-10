var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    icp:"陕ICP备16003703号",
    copyright:"Design by 890",
    selected:1,
    item:[],
    detail:[]
  },
  methods:{
    getDetail:function(id){
      var _this = this
      var storage=window.localStorage
      storage.setItem('id',id)
      this.selected = id
      this.$http.get('/data/cal/'+id+'.json').then((res) => {
          _this.detail = res.body.result
      },(res) => {
          console.log(res)
      })
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('/data/catalog/sub_cal.json').then((res) => {
        _this.item = res.body.result
    },(res) => {
        console.log(res)
    })
    var storage=window.localStorage
    var id = storage.getItem('id')
    _this.selected = id
    _this.getDetail(id)
  }
})