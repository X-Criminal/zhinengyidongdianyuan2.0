let app = getApp( )
Page({
  data:{
    isLogin:true,
    userImg : "",
    userName: "",
    vipState:0,
    deposit:0,
    balance:0,
    depositState:0,
    vipTime:"",
	 phone:"",
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
    this.init( )
  },
  
  init( ){
    let token = app.token;
    app.ajax(
      "/powerBank/app/user/getUser",
      "post",
      null,
      (res)=>{
        if(res.data.code===1000){
          let _data = res.data.data
          this.setData({
            userImg:_data.headUrl,
            userName:_data.userName,
            vipState:_data.vipState,
            vipTime:_data.vipTime,
            depositState:_data.depositState,
            deposit:_data.deposit,
            balance:_data.balance,
				phone:_data.phone,
          })
          my.setStorage({
            key:"userInfo",
            data:{
              userImg:_data.headUrl,
              userName:_data.userName,
              vipState:_data.vipState,
              vipTime:_data.vipTime,
              depositState:_data.depositState,
              deposit:_data.deposit,
              balance:_data.balance
            },
            success:(res)=>{
             
            }
          })
        }
      },
      (err)=>{

      }
      )
  },
  /**点击列表 */
  onItemClick( e ){
    switch(e.index){
      case 0:
        app.Nav('../vipCenter/vipCenter',"会员中心")
      break;
      case 1:
        app.Nav("../bindingPhone/bindingPhone","绑定手机号")
      break;
      case 2:
        app.Nav('../wallet/wallet','我的钱包')
      break;
      case 3:
        app.Nav('../Order/Order','订单')
      break;
      case 4:
        app.Nav('../Discount/Discount',"查看优惠劵")
      break;
      case 5:
        app.Nav('../enBug/enBug',"更多")
      break;
    }
  }

})