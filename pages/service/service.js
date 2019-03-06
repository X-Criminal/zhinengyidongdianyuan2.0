let app = getApp( )
Page({
  data:{
    Lis:[
      {img:"../../img/artificial_iphone.png",title:"客服电话",body:"400-123-888"},
      // {img:"../../img/artificial_wechat.png",title:"",body:"v82018"},
      // {img:"../../img/artificial_qq.png",title:"",body:"10345676"},
    ],
    index:null,
    envVersion:""
  },
   onLoad(query) {
    // 页面加载
    //console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    if(query.index==="i"){
      this.setData({
        index:query.index
      })
    }
  },
  onReady(){
     this.init( );
     my.getRunScene({
       success:(res)=>{
         this.setData({
           envVersion:res.envVersion
         })
       }
     })
  },
  init(){
    app.ajax("/powerBank/app/user/getSystemStep","post",null,(res)=>{
      if(res.data.code===1000){
        let data = this.data.Lis;
        data[0].body=res.data.data.serviceHotline;
        this.setData({
          Lis:data
        })
      }
    })
  },
})