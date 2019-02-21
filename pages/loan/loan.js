let app = getApp( )
Page({
  data:{
	  		m:"00",
			s:"00",
			chargeStandard:"",
			dayVipTime:"",
			loanDate:"",
			merchantsAdderss:"",
			orderNumber:"",
  },
  onLoad(res){
	  console.log(res)
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
  onUnload(){
	  clearInterval( this.time )
  }
})