

var app = new Vue({
  el: '#app',
  data: {
      domain:'http://api.890vip.cn/',
      icp:"陕ICP备16003703号",
      detail:[]
  },
  directives: {
    highlight: function(el, binding) {
        if (binding.value) {
            let value = null
            if (typeof(binding.value) === "string") {
                value = binding.value
            } else {
                value = JSON.stringify(binding.value, null, 4)
            }
            el.innerHTML = hljs.highlight("json", value, true).value
        }
    }
  },
  methods:{
    getDetail:function(id){
      var _this = this
      this.$http.get(_this.domain+'blog/detail/id/'+id).then((res) => {
          _this.detail = res.body.result
      },(res) => {
          console.log(res)
      })
    }
  },
  created:function(){
      var storage=window.localStorage
      id = storage.getItem('id')
      this.getDetail(id);
  },
  mounted:function(){

  }
})
