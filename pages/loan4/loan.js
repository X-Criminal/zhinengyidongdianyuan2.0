let app = getApp( )
Page({
  data:{
		orderId:"",
				  alsoDate:"",
				  leaseTime:"",
				  loanDate:'',
				  merchantsName:"",
				  orderNumber:"",
				  originalPrice:"",
				  payDate:' ',
				  payType:"",
				  powerMac:"",
				  realPayPrice:"",
				  standard:"",
				  state:"",
  },
  onLoad(res){
	  console.log(res)
	  this.setData({
		  orderId:res.orderId
	  })
  },
  onReady(){
	  this.init( )
  },
  init(){
	  app.ajax("/powerBank/app/user/getOrders",'post',{orderId:this.data.orderId},(res)=>{
		  if(res.data.code===1000){
			  let data = res.data.data;
			  this.setData({
				  alsoDate:app.___formattingTime(data.alsoDate),
				  leaseTime:data.leaseTime,
				  loanDate:app.___formattingTime(data.loanDate),
				  merchantsName:data.merchantsName,
				  orderNumber:data.orderNumber,
				  originalPrice:data.originalPrice,
				  payDate:app.___formattingTime(data.payDate),
				  payType:data.payType,
				  powerMac:data.powerMac,
				  realPayPrice:data.realPayPrice,
				  standard:data.standard,
				  state:data.state,
		  		})
		  }
	  })
  }
})