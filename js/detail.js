var app = new Vue({
  el: '#app',
  data: {
    icp:"陕ICP备16003703号",
    detail:[]
  },
  methods:{
    getDetail:function(id){
      var _this = this
      this.$http.get('http://api.890vip.cn/api/blog/detail/id/'+id).then((res) => {
          _this.detail = res.body.result
      },(res) => {
          console.log(res)
      })
    }
  },
  mounted:function(){
    var storage=window.localStorage
    id = storage.getItem('id')
    this.getDetail(id)
  }
})
