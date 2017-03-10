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
    subitem:[]
  },
  methods:{
    getSubItem:function(index,subindex){
      var _this = this
      _this.selected = index
      this.$http.get('data/catalog/sub_'+ subindex +'.json').then((res) => {
          _this.subitem = res.body.result
      },(res) => {
          console.log(res)
      })
    },
    getDetail:function(pid,cid){
      window.location.href = "/"+this.items[pid]['subindex']
      var storage=window.localStorage
      storage.setItem('id',cid)
    },
    timeShow:function(t){
       clearTimeout(this.t);//清除定时器
       dt = new Date();
       var y = dt.getFullYear()
       var month = dt.getMonth()
       var d = dt.getDay()
       var h=dt.getHours()
       var m=dt.getMinutes()
       this.timeStr =  y + "年" + month + "月" + d +"号"+h+":"+m+"分";
       t = setTimeout(this.timeShow,1000); //设定定时器，循环执行  
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('data/catalog/item.json').then((res) => {
        _this.items = res.body.result.list
        _this.getSubItem(0,'php');
    },(res) => {
        console.log(res)
    })
    this.t = setTimeout(this.timeShow,1000);//开始执行
  }
})