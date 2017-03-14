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
    allSubItem:[],
    subItem:[],
    currentPage:1,
    showItem:5,
    allPage:10
  },
  methods:{
    getAllSubItem:function(index,subindex){
      var _this = this
      _this.selected = index
      this.$http.get('data/catalog/sub_nav.json').then((res) => {
          _this.allSubItem = res.body.result
      },(res) => {
          console.log(res)
      })
    },
    pages:function(p){
      var pad = []
      if(this.currentPage < this.showItem){
          var i = Math.min(this.showItem,this.allPage)
          while(i){
            pag.unshift(i--)
          }
      }else{
          var middle = this.currentPage - Math.floor(this.showItem / 2 ),
              i = this.showItem;
          if( middle >  (this.allpage - this.showItem)  ){
             middle = (this.allpage - this.showItem) + 1
          }
          while(i--){
             pag.push( middle++ );
          }
      }
      return pag
    },
    getByPage:function(index){
      if(index == this.currentPage){
          return
      }
      this.currentPage = index

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
    this.$http.get('data/catalog/item.json').then((res) => {
        _this.items = res.body.result.list
        _this.getAllSubItem();
    },(res) => {
        console.log(res)
    })
    this.t = setTimeout(this.timeShow,1000);//开始执行
  }
})
