let app = getApp( )
Page({
  data:{
    Lis:[
      {img:"../../img/artificial_iphone.png",title:"服务热线",body:"400-123-888"},
      {img:"../../img/artificial_wechat.png",title:"微信",body:"v82018"},
      {img:"../../img/artificial_qq.png",title:"QQ",body:"10345676"},
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
        data[1].body=res.data.data.weChat;
        data[2].body=res.data.data.qq;
        this.setData({
          Lis:data
        })
      }
       
    })
  },
  // onclick(e){
  //   my.alert({
  //     title:this.data.Lis[e.index].body
  //   });
  // }
})