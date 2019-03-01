let app = getApp( )
Page({
  data:{
    orderId:"",
  },
  refundDeposit(){
      app.ajax("/powerBank/app/user/refundDeposit","post",null,(res)=>{
          if(res.data.code===1000){
              my.alert({
                title:"申请成功！",
                success:()=>{
                    my.navigateBack({
                      delta:1
                    })
                }
              })
          }else if(res.data.code===3002){
            my.alert({
              title:"有订单未处理,请先处理！",
              success:()=>{
                 app.Nav('../loan2/loan2?type=1&orderId='+res.data.data.orderId,"订单详情")
              }
            })
          }
      })
  }
})