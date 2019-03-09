let app = getApp( )
Page({
  data:{
    couponsuseId:"",

    couponsCode:"",
    couponsName:"",
    detailed:"",
    endDate:"",
    picture:"",
    type:"",
    useState:"",
	 typeID:"0",
  },
  onLoad(quert){
    this.setData({
      couponsuseId:quert.couponsuseId,
		typeID:quert.type
    })
  },
  onReady(){
    this.init( )
  },
  init( ){
    app.ajax("/powerBank/app/user/getCouponsByids","post",{couponsuseId:this.data.couponsuseId},(res)=>{
      if(res.data.code===1000){
        let data = res.data.data;
        this.setData({
          couponsCode:data.couponsCode,
          couponsName:data.couponsName,
          detailed:data.detailed,
          endDate:app.formattingTime(data.endDate),
          picture:data.picture,
          type:data.type,
          useState:data.useState,
        })
      }
      console.log(res)
    })
  },
  onIndex(){
	  if(this.data.typeID==0){
		  app.Nav("../chongzhi/chongzhi",'充值');
		  return false;
	  }
    my.navigateBack({
      delta:3
    })
  },
})