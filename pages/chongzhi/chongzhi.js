let app = getApp( )
Page({
  data:{
    cType:"",
    showLis2:false,
    couponscuseId:"",
  },
  getType(e){
    this.setData({
      cType:e.target.dataset.type
    })
  },
  showLis2(){
    this.setData({
      showLis2:!this.data.showLis2
    })
  },
  cz(){
    if(this.data.cType.length<=0) return false;
    let data = {
        amounts:this.data.cType,
        couponscuseId:this.data.couponscuseId,
        payType:"1",
        type:"3"
    }
    app.ajax("/powerBank/app/user/userRecharge","post",data,(res)=>{
        if(res.data.code===1000){
          my.tradePay({
            orderStr:'tradeNO', //完整的支付参数拼接成的字符串，从服务端获取
            success: (res) => {
                console.log(res)
            },
            fail: (res) => {
              my.alert({
                content: JSON.stringify(res),
              });
            }
          });
        }else{
          my.alert({
            title: res.data.message 
          });
        }
    })
    console.log(1)
  }
})