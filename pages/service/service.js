Page({
  data:{
    Lis:[
      {img:"../../img/artificial_iphone.png",title:"服务热线",body:"770-767-798"},
      {img:"../../img/artificial_wechat.png",title:"微信",body:"770-767-798"},
      {img:"../../img/artificial_qq.png",title:"QQ",body:"770-767-798"},
    ]
  },
   onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
})