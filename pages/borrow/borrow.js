let app = getApp( )
Page({
  data:{
    mac:"E152AD2C3D00",
    merchantsAdderss:"水库路147",
    isAgreement:false,
  },
  onLoad(query){
  },
  agreement(){
    app.Nav("../agreement/agreement","用户协议")
  },
  tradePay(){
    let _this = this;
    if(!this.data.isAgreement) return false;
    app.ajax("/powerBank/app/user/fundAuthOrder","post",{address:this.data.merchantsAdderss,mac:this.data.mac},(res)=>{
      if(res.data.code===1000){
        my.tradePay({
          orderStr:res.data.data.authOrder,
          success:(res)=>{
            if(res.resultCode==="9000"){
              console.log(res)
              app.Nav('../zmBorrow/zmBorrow',"租用确认")
            }
          },
          fail:(res)=>{
              console.log(res)
          }
        })
      }else{
        my.alert({
          title: res.data.message 
        });
      }
    })
  },
  Pay(){
    app.Nav("../wallt1/wallt1","支付押金")
  },
  isAgreement( e ){
    this.setData({
      isAgreement:e.detail.value
    })
  },
})