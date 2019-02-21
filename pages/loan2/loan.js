let app = getApp( );
import {billingTime} from "../time.js"
Page({
  data:{
             orderId:"",
       queryIfLoanId:"",
       currentDate:"",
       originalPrice:0,
       m:"00",
       s:"00",

		ByuserIdList:[],
showTop1:false,
showTop2:false,
setSub:"1",

      chargeStandard:"",
          dayVipTime:"",
            loanDate:"",
    merchantsAdderss:"",
         orderNumber:"",
		returnCabinetId:"",
	abcdefg:0,
	toView: 'red',
  },
  onLoad(query){
      this.setData({
        queryIfLoanId:query.queryIfLoanId,
		  returnCabinetId:JSON.parse(query.data).code
      })
  },
  currentDate:0,
  startTime:0, 
  onReady(){
      this.init(()=>{
        this.getCurrentDate(()=>{
          this.setTime( )
			 this.getUser(()=>{
				 setTimeout(()=>{
					 let a ;
					 	 if(this.data.vipState==4){
										a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount});
								}else{
										a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount,c:this.data.dayVipTime});
								}
							this.setData({
								 abcdefg:Math.ceil(a.a),
								_abcdefg:Math.ceil(a.a-this.data.ByuserId.amount<0?0:a.a-this.data.ByuserId.amount)
							})
				 },800)
			 })
        })
      });
		this.getCouponsDeviceList( )
    },
	 getUser(cb){
		 app.ajax("/powerBank/app/user/getUser",'post',null,(res)=>{
			 if(res.data.code===1000){
					this.setData({
							vipState:res.data.data.vipState
			 	})
			 }
				cb&&cb( )
		 })
	 },
	time:"",
  setTime(){
    let date = this.currentDate-this.startTime;
    this.time = setInterval(()=>{
      date+=1000;
      let m = Math.floor(date/1000/60);
      let s = Math.floor( (date/1000/60 - m)*60);
      s = s<10?"0"+s:s;
      this.setData({
        m:m,
        s:s
      })
    },1000)
  },
  init(cb){
    app.ajax("/powerBank/app/user/queryLoanDetail",'post',{orderId:this.data.queryIfLoanId},(res)=>{
      if(res.data.code===1000){
        let _data = res.data.data;
        this.setData({
			 chargeStandard:_data.chargeStandard,
			 dayVipTime:_data.dayVipTime,
			 singleAmount:_data.singleAmount,
			 dayMaxAmount:_data.chargeStandard,
          loanDate:app.___formattingTime(_data.loanDate),
          merchantsAdderss:_data.merchantsAdderss,
          originalPrice:_data.originalPrice,
        })
        this.startTime=_data.loanDate,
        cb&&cb( )
      }else{
        my.alert({
          title: res.data.message
        });
      }
    })
  },
  getCurrentDate(cb){
    my.getServerTime({
      success:(res)=>{
        this.currentDate=res.time
        cb&&cb( )
      }
    })
  }, 
  setType(){
    this.setData({
      showTop1:true,
    })
  },
  onPopupClose(){
    this.setData({
      showTop1:false,
		showTop2:false,
    })
  },
  onSetSubm(value){
    this.setData({
      setSub:value.target.dataset.type,
      showTop1:false,
    })
  },
  /**获取优惠卷 */
  getCouponsDeviceList(){
	  let data = {
		  currPage:1,
		  size:99,
		  type:1,
	  }
	  	app.ajax("/powerBank/app/user/getCouponsByuserIdList",'post',data,( res )=>{
			  if(res.data.code===1000&&res.data.data){
				  this.setData({
							ByuserIdList:res.data.data,
							ByuserId:res.data.data[0],
			  		})
			  }
		})
  },
  setByuser(){
	  this.setData({
		  showTop2:true,
	  })
  },
  setB(){
	  	this.setData({
		  showTop2:false,
	  })
  },
  setB(e){
	  this.setData({
		  ByuserId:this.data.ByuserIdList[e.currentTarget.dataset.index],
		  showTop2:false,
	  })
  },
  Lis5(){
	  this.getCurrentDate( )
	  my.showLoading( )
	  let a ; 
	  if(this.data.vipState==4){
		    a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount});
	  }else{
		    a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount,c:this.data.dayVipTime});
	  }
	  let data ={
		  billingTime:Math.ceil((this.data.vipState==4?this.currentDate-this.startTime+"":this.currentDate-this.startTime-this.data.dayVipTime)/1000/60)+"",
		  couponscuseId:this.data.ByuserId.couponsuseId,
		  dayuseTime:a.b+"",
		  leaseTime:Math.ceil((this.currentDate-this.startTime)/1000/60)+"",
		  orderId:+this.data.queryIfLoanId,
		  originalPrice:Math.ceil(a.a),
		  payType:this.data.setSub,
		  realPayPrice:a.a-this.data.ByuserId.amount<0?0:a.a-this.data.ByuserId.amount,
		  cabinetMac:this.data.returnCabinetId,
	  }
	  app.ajax("/powerBank/app/user/returnPowerBank",'post',data,(res)=>{
		  	  my.hideLoading({
               page: this,  //防止执行时已经切换到其它页面，page指向不准确
				});
				if(res.data.code===1000){
						my.tradePay({
							tradeNO:res.data.data.orderInfo,
							success:(res)=>{
								if(res.resultCode==='9000'){
									my.redirectTo({
										url:'../loab4/loan?orderId'+this.data.orderId
									})
								}
							}
						})
				}
			 
	  })
  },
  onUnload(){//关闭小程序触发
	  clearInterval( this.time )
  },
})