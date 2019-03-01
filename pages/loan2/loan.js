let app = getApp( )
Page({
  data:{
             orderId:"",

      chargeStandard:"",
          dayVipTime:"",
            loanDate:"",
    merchantsAdderss:"",
         orderNumber:""
  },
  onLoad(query){
    if(query.queryIfLoanId){
      this.setData({
      queryIfLoanId:query.queryIfLoanId
      })
    }
  },
  onReady(){
    
  },
  init(){
    app.ajax("/powerBank/app/user/queryLoanDetail",'post',{orderId:this.data.queryIfLoanId},(res)=>{
      if(res.data.code===1000){
        let _data = res.data.data;
        this.setData({
          chargeStandard:_data.chargeStandard,
          dayVipTime:_data.dayVipTime,
          loanDate:_data.loanDate,
          merchantsAdderss:_data.merchantsAdderss,
          orderNumber:_data.orderNumber
        })
      }else{
        my.alert({
          title: res.data.message
        });
      }
      console.log(res)
    })
  }
})