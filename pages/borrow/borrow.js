let app = getApp( )
Page({
  data:{
    mac:"E152AD2C3D00",
    merchantsAdderss:"水库路147",
  },
  onLoad(query){
    console.log(query)
  },
  agreement(){
    app.Nav("../agreement/agreement","用户协议")
  },
  tradePay(){
    app.ajax("/powerBank/app/user/fundAuthOrder","post",{address:this.data.merchantsAdderss,mac:this.data.mac},(res)=>{
      console.log(res)
      if(res.data.code===1000){
        my.tradePay({
          orderStr:res.data.data.authOrder,
          success:(res)=>{
            if(res.resultCode==="9000"){
              
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
})