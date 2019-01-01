let app = getApp( )
Page({
  data:{
    isLogin:true,
    Lis:[
      {name:"会员中心",   img:"../../img/center_members.png"},
      {name:"绑定手机号", img:"../../img/center_.png"},
      {name:"我的钱包",   img:"../../img/center_wallet.png"},
      {name:"我的订单",   img:"../../img/center_order.png"},
      {name:"优惠劵",     img:"../../img/center_vouchers.png"},
      {name:"更多",       img:"../../img/center_more.png"},
    ]
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
})