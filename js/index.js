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
      this.$http.get('data/catalog/sub_nav.json').then((res) => {
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
        _this.getSubItem(0,'php');
    },(res) => {
        console.log(res)
    })
    this.t = setTimeout(this.timeShow,1000);//开始执行
  }
})
Vue.component("page",{
      template:"#page",
        data:function(){
          return{
            current:1,
            showItem:5,
            allpage:13
          }
        },
        computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
      methods:{
        goto:function(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
        }
      }
    })