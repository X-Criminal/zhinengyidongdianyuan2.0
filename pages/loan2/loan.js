let app = getApp( )
Page({
  data:{
             orderId:"",
       queryIfLoanId:"",
       currentDate:"",
       originalPrice:0,
       m:"00",
       s:"00",

showTop1:false,
setSub:"1",

      chargeStandard:"",
          dayVipTime:"",
            loanDate:"",
    merchantsAdderss:"",
         orderNumber:""
  },
  onLoad(query){
      this.setData({
        queryIfLoanId:query.queryIfLoanId
      })
  },
  currentDate:0,
  startTime:0, 
  onReady(){
      this.init(()=>{
        this.getCurrentDate(()=>{
          this.setTime( )
        })
      })
    },

  setTime(){
    let date = this.currentDate-this.startTime;
    setInterval(()=>{
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
    app.ajax("/powerBank/app/user/getOrders",'post',{orderId:this.data.queryIfLoanId},(res)=>{
      if(res.data.code===1000){
        let _data = res.data.data;
        this.setData({
          loanDate:app.___formattingTime(_data.loanDate),
          merchantsName:_data.merchantsName,
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

  }
})