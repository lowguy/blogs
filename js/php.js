var app = new Vue({
  el: '#app',
  data: {
    author: '890',
    message: '欢迎来到我的博客',
    icp:"陕ICP备16003703号",
    copyright:"Design by 890",
    selected:1,
    iscomment:false,
    placeholder_author:"请输入您的笔名",
    comment_title:"评论",
    author_name:'',
    contents:'',
    item:[],
    detail:[],
    comment:[]
  },
  methods:{
    getDetail:function(id){
      var _this = this
      var storage=window.localStorage
      storage.setItem('id',id)
      this.selected = id
      this.$http.get('/data/php/'+id+'.json').then((res) => {
          _this.detail = res.body.result
      },(res) => {
          console.log(res)
      })
      _this.getComment(id)
    },
    getComment:function(id){
      var _this = this
      this.$http.get('/data/php/comment/'+id+'.json').then((res) => {
          _this.comment = res.body.result
      },(res) => {
          console.log(res)
      })
    },
    commentSub:function(){
      if(this.iscomment){
        if(this.author && this.contents){
          this.comment_title = "评论"
          var myDate = new Date();
          var year = myDate.getFullYear()
          var month = myDate.getMonth()
          var day = myDate.getDate()
          var comment_time = year +"-"+ month +"-"+ day
          comments = {"author":this.author,"content":this.contents,"comment_time":comment_time}
          this.comment.push(comments)
          this.iscomment = !this.iscomment
          var storage=window.localStorage
          var id = storage.getItem('id')
          //var fso = new ActiveXObject("Scripting.FileSystemObject")
          //var file = fso.GetFile("/data/php/comment/"+id+'.json')
          //var ts = file.OpenAsTextStream(this.comment,true)
          //file.Close()
          this.author = ''
          this.contents = ''
        }
      }else{
        this.comment_title = "提交"
        this.iscomment = !this.iscomment
      }
    }
  },
  mounted:function(){
    var _this = this
    this.$http.get('/data/catalog/sub_php.json').then((res) => {
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