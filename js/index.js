var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    icp:"陕ICP备16003703号",
    copyright:"Design by 890",
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
      console.log(this.items[pid]['subindex'])
      console.log(cid)
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
  }
})