let app = getApp( )
Page({
  data:{
	  		h:"00",
	  		m:"00",
			mm:"00",
			s:"00",
			chargeStandard:"",
			dayVipTime:"",
			loanDate:"",
			merchantsAdderss:"",
			orderNumber:"",
  },
  onLoad(res){
	  	my.showLoading( )
      this.setData({
        queryIfLoanId:res.queryIfLoanId
      })
  },
  onReady(){
	  this.init(( )=>{
			this.getCurrentDate(()=>{
					this.setTime( )
			})
	  })
  },
  startTime:0,
  currentDate:0,
  init( cb ){
     app.ajax("/powerBank/app/user/queryLoanDetail","post",{orderId:this.data.queryIfLoanId},(res)=>{
       if(res.data.code===1000){
         let data = res.data.data;
         this.setData({
           chargeStandard:data.chargeStandard,
           dayVipTime:data.dayVipTime,
           loanDate:app.___formattingTime(data.loanDate),
           merchantsAdderss:data.merchantsAdderss,
           orderNumber:data.orderNumber,
         })
			this.startTime=data.loanDate,
			 cb&&cb()
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
  time:"",
  setTime(){
	let _this = this;
    let date = this.currentDate-this.startTime;
    this.time = setInterval(()=>{
      date+=1000;
		let h = Math.floor(date/1000/60/60);
      let mm = Math.floor((date/1000/60/60-h)*60);
		let m = Math.floor(date/1000/60);
      let s = Math.floor( (date/1000/60 - m)*60);
      s = s<10?"0"+s:s;
		mm = mm<10?"0"+mm:mm;
      this.setData({
		  mm:mm,
        m:m,
        s:s,
		  h:h
      })
    },1000)
	 setTimeout(()=>{
 		my.hideLoading({
         page:_this,
     	});
	 },1500)
	
  },
  onUnload(){
	  clearInterval( this.time )
  }
})