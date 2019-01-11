let app = getApp( )
Page({
  data:{
         userImg:"",
         userName:"",
         vipState:"",
         vipTime:"",
         depositState:"",
         deposit:"",
         balance:""
  },
  onLoad(){
    this.init( );
    
  },
  init( ){
     my.getStorage({
       key:"userInfo",
       success:(res)=>{
         this.setData({
          userImg:res.data.userImg,
          userName:res.data.userName,
          vipState:res.data.vipState,
          vipTime:res.data.vipTime,
          depositState:res.data.depositState,
          deposit:res.data.deposit,
          balance:res.data.balance
         })
       },
       fail:(error)=>{
          console.log(error)
       }
     })
  },
  Recharge(){
    app.Nav('../chongzhi/chongzhi',"我的钱包")
  },
})