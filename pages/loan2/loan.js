let app = getApp( );
import {billingTime} from "../time.js"
Page({
  data:{
       orderId:"",
       queryIfLoanId:"",
       currentDate:"",
       originalPrice:0,
		 h:'00',
       m:"00",
       s:"00",

		ByuserIdList:[],
		ByuserId:{
			amount:"",

		},
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
	_abcdefg:0,
	toView: 'red',
  },
  onLoad(query){
      this.setData({
        queryIfLoanId:query.queryIfLoanId,
		  returnCabinetId:JSON.parse(query.data).code
      })
		my.showLoading( );
  },
  currentDate:0,
  startTime:0, 
  onReady(){
	  let _this= this;
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
								 //_abcdefg:Math.ceil(a.a-this.data.ByuserId.amount<0?0:a.a-this.data.ByuserId.amount)
					})
					setTimeout(()=>{
						this.getCouponsDeviceList( )
					},500)
				 },800)
			 })
        })
      });
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
		let h = Math.floor(date/1000/60/60);
      let mm = Math.floor((date/1000/60/60-h)*60);
      let m = Math.floor(date/1000/60);
      let s = Math.floor( (date/1000/60 - m)*60);
      s = s<10?"0"+s:s;
		mm = mm<10?"0"+mm:mm;
		// if(m<5){
		// 	this.setData({
		// 		abcdefg:0,
		// 		_abcdefg:0,
		// 	})
		// }

		 	let a ,b1,b2;
			if(this.data.vipState==4){
				a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount});
			}else{
				a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount,c:this.data.dayVipTime});
			}
			if(m<5){
				b1 = 0;
				b2 = 0;
			}else{
				b1 = Math.ceil(a.a);
				if(this.data.ByuserId.amount.indexOf("优惠劵")<=-1){
					b2 = b1 - this.data.ByuserId.amount;
				}else{
					b2 = b1;
				}
			}
      this.setData({
			h:h,
			mm:mm,
			m:m,
         s:s,

			abcdefg:b1,
			_abcdefg:b2,
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
		  type:2,
	  }
	  	app.ajax("/powerBank/app/user/getCouponsByuserIdList",'post',data,( res )=>{
			  if(res.data.code===1000&&res.data.data){
				  let Monet = this.data.abcdefg - Number(res.data.data[0].amount);
				  this.setData({
							ByuserIdList:res.data.data,
							ByuserId:res.data.data[0],
							_abcdefg:Monet>0?Monet:0,
			  		})
			  }else{
				  this.setData({
					  ByuserId:{amount:"暂无可用优惠劵"},
					  ByuserIdList:[]
				  })
			  }
		})
		my.hideLoading({
			page: this,  //防止执行时已经切换到其它页面，page指向不准确
		});
  },
  setByuser(){
	  if(this.data.ByuserIdList.length>0){
		   this.setData({
		  		showTop2:true,
	  		})
	  }
  },
  setA(){
	  	this.setData({
		  showTop2:false,
	  })
  },
  setB(e){
	  let Byuser = this.data.ByuserIdList[e.currentTarget.dataset.index],
	  		Byuser2 =this.data.abcdefg - Number( Byuser.amount );
	  this.setData({
		  _abcdefg:Byuser2>0?Byuser2:0,
		  ByuserId:Byuser,
		  showTop2:false,
	  })
  },
  Lis5(){
	  let _this = this;
	  this.getCurrentDate( )
	  my.showLoading( )
	  let a ; 
	  if(this.data.vipState==4){
		    a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount});
	  }else{
		    a =  billingTime( new Date(  app.___formattingTime(this.startTime)),new Date(app.___formattingTime(this.currentDate) ) ,{a:this.data.singleAmount,b:this.data.dayMaxAmount,c:this.data.dayVipTime});
	  }
	  let data ={
		  billingTime:Math.ceil((_this.data.vipState==4?_this.currentDate-_this.startTime+"":_this.currentDate-_this.startTime-_this.data.dayVipTime)/1000/60)+"",
		  dayuseTime:a.b+"",
		  leaseTime:Math.ceil((_this.currentDate-_this.startTime)/1000/60)+"",
		  orderId:+_this.data.queryIfLoanId,
		  originalPrice:Math.ceil(a.a),
		  payType:_this.data.setSub,
		  realPayPrice:_this.data._abcdefg,
		  cabinetMac:_this.data.returnCabinetId,
	  };
	  if(_this.data.ByuserId){
		 data.couponscuseId=_this.data.ByuserId.couponsuseId;
	  }
	  app.ajax("/powerBank/app/user/returnPowerBank",'post',data,(res)=>{
		  	  my.hideLoading({
               page: _this,  //防止执行时已经切换到其它页面，page指向不准确
				});
				if(res.data.code===1000){
					if(res.data.data){
							my.tradePay({
							tradeNO:res.data.data.orderInfo,
							success:(res)=>{
								if(res.resultCode==='9000'){
									my.redirectTo({
										url:'../loan4/loan?orderId='+_this.data.queryIfLoanId
									})
								}
							}
						})
						return false;
					}
					my.redirectTo({
						url:'../loan4/loan?orderId='+_this.data.queryIfLoanId
					})
				}else{
					my.alert({title:res.data.message})
				}
	  },()=>{
		  my.hideLoading({
               page: _this,  //防止执行时已经切换到其它页面，page指向不准确
			});
	  })
  },
  onUnload(){//关闭小程序触发
	  clearInterval( this.time )
  },
})