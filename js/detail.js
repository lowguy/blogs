
var app = new Vue({
  el: '#app',
  data: {
      domain:'http://api.890vip.cn/',
      icp:"陕ICP备16003703号",
      detail:[]
  },
  methods:{
    getDetail:function(id){
      var _this = this
      this.$http.get(_this.domain+'blog/detail/id/'+id).then((res) => {
          _this.detail = res.body.result
          hljs.initHighlightingOnLoad();
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
