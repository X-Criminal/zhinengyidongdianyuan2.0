let app = getApp( )
Page({
  data:{
    index:"",
  },
  vipType(e){
    this.setData({
      index:e.target.dataset.type
    })
  },
  userRecharge(){
    app.ajax(
      "/powerBank/app/user/userRecharge",
      "post",
      {payType:"1",type:"3",vipState:this.data.index},
      (res)=>{
        if(res.data.code===1000){
          my.tradePay({
            tradeNO: res.data.data.orderInfo,  // 即上述服务端已经加签的orderSr参数
            success: (res) => {
              switch (res.resultCode){
                case "9000":
                  /**支付成功 */
                   my.setStorage({
                      key:"isUp",
                      data:true,
                    })
                  my.navigateBack({
                      delta:1
                  })
                break;
                case "6002":
                  /**付款失败 */
                  my.alert({
                    title: '网络连接出错！请稍后再试' 
                  });
                break;
                default:
                  /**付款取消 */

                ;
              }
            },
            fail:(res)=>{
            
              console.log(res)
            },
        });
        }
      },
      (error)=>{
        my.alert("网络连接错误，请稍后再试")
        console.log(error)
      }
    )
  }
})