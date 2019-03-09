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
  onLoad (  ) {
    this.init( )
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
  onShow() {
    this.init( )
  },
  yajin(){
	 if(this.data.depositState==='3'||this.data.depositState==='4') return false;
    if(this.data.depositState==='2'){
      app.Nav('../wallt1/wallt1','充值押金')
    }else{
      app.Nav('../refundDeposit/refundDeposit',"押金");
    }
  },
  mingxi(){
    app.Nav('../tradeDetails/tradeDetails',"交易明细");
  },
  queryBalance(){
    app.Nav('../qianbao/qianbao',"我的钱包")
  }
})