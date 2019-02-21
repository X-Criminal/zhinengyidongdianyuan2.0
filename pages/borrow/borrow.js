let app = getApp( )
Page({
  data:{
    mac:"",
    merchantsAdderss:"水库路147",
    isAgreement:false,
  },
  onLoad(query){
	  console.log(query)
	  this.setData({
		  mac:JSON.parse(query.data).code
	  })
  },
  onReady(){
	  	this.getMerchantsByMac( )
  },
  agreement(){
    app.Nav("../agreement/agreement","用户协议")
  },
 
  getMerchantsByMac(){
	  app.ajax("/powerBank/app/user/getMerchantsByMac?cabinetMac="+this.data.mac,'get',null,(res)=>{
		  if(res.data.code===1000){
			  this.setData({
					dayMaxAmount:res.data.data.dayMaxAmount,
					imgUrl:res.data.data.imgUrl,
					merchantsName:res.data.data.merchantsName,
					singleAmount:res.data.data.singleAmount,
		  		})
		  }else{
			  my.alert({title:res.data.message})
		  }
		  
	  })
  },
  tradePay(){
    let _this = this;
    if(!this.data.isAgreement){ my.alert({title:'请先同意用户协议'});return false;};
    app.ajax("/powerBank/app/user/fundAuthOrder","post",{address:this.data.merchantsAdderss,mac:this.data.mac},(res)=>{
      if(res.data.code===1000){
        my.tradePay({
          orderStr:res.data.data.authOrder,
          success:(res)=>{
            if(res.resultCode==="9000"){
          
              app.Nav('../zmBorrow/zmBorrow?data='+JSON.stringify({code:this.data.mac}),"租用确认")
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