var app = new Vue({
  el: '#app',
  data: {
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
      this.$http.get('http://api.890vip.cn/api/blog/detail/id/'+id).then((res) => {
          _this.detail = res.body.result
      },(res) => {
          console.log(res)
      })
      _this.getComment(id)
    },
    getComment:function(id){
      var _this = this
      this.$http.get('http://api.890vip.cn/api/blog/comment/id/'+id).then((res) => {
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
          var storage=window.localStorage
          var id = storage.getItem('id')
          var _this = this
          comments = {"author":this.author,"content":this.contents,"comment_time":comment_time}
          this.$http.post('http://api.890vip.cn/api/blog/comments',{"id":id,"author":this.author,"content":this.contents},{emulateJSON:true}).then((res) => {
              _this.comment.push(comments)
              _this.iscomment = !_this.iscomment
              _this.author = ''
              _this.contents = ''
          },(res) => {
              console.log(res)
          })
         
        }
      }else{
        this.comment_title = "提交"
        this.iscomment = !this.iscomment
      }
    }
  },
  mounted:function(){
    var id =  this.$route.query.id;
    if(!id){
        var storage=window.localStorage
        var id = storage.getItem('id')
    }
    this.getDetail(id)
  }
})
