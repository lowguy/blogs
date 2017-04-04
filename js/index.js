var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    icp:"陕ICP备16003703号",
    copyright:"Design by 890",
    timeStr:"2017年3月10号 16:50",
    t:null,
    selected:0,
    items:[],
    blogs:[],
  },
  methods:{
    getBlogsByType:function(type,index){
      var _this = this
      _this.selected = index
      this.$http.get('http://api.890vip.cn/api/blog/lists/type/'+type).then((res) => {
          _this.blogs = res.body.result.list
      },(res) => {
          console.log(res)
      })
    },
    getDetail:function(id){
      window.location.href = "/detail/"
      var storage=window.localStorage
      storage.setItem('id',id)
    },
    timeShow:function(t){
       clearTimeout(this.t);//清除定时器
       dt = new Date();
       var y = dt.getFullYear()
       var month = dt.getMonth()
       month++
       var d = dt.getDate()
       var h=dt.getHours()
       var m=dt.getMinutes()
       var s=dt.getSeconds();
       this.timeStr =  y + "年" + month + "月" + d +"号"+h+":"+m+":"+s;
       t = setTimeout(this.timeShow,1000); //设定定时器，循环执行  
    }
  },
  mounted:function(){
    var _this = this
    _this.getBlogsByType(1);
    // this.$http.get('http://api.890vip.cn/api/blog/index').then((res) => {
    //     _this.items = res.body.result.list
    //     _this.getBlogsByType(1);
    // },(res) => {
    //     console.log(res)
    // })
    this.t = setTimeout(this.timeShow,1000);//开始执行
  }
})
