let app = getApp( )
Page({
  data:{

  },
  onLoad(res){
    
  },
  onReady(){
	  this.init( )
  },
  init(){
     app.ajax("/powerBank/app/user/queryLoanDetail","post",null,(res)=>{
       if(res.data.code===1000){
         let data = res.data.data;
         this.setData({
           chargeStandard:data.chargeStandard,
           dayVipTime:data.dayVipTime,
           loanDate:data.loanDate,
           merchantsAdderss:data.merchantsAdderss,
           orderNumber:orderNumber,
         })
       }
     })
     
  }
})