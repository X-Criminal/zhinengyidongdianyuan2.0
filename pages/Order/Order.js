let _app = getApp( )
Page({
  data:{
    Lis:[],
    totalLoan:0,
    totalReturn:0,
    srting:false,
  },
  onLoad(e){
    this.init( )
  },
  currPage:1,
  init( ){
    _app.ajax("/powerBank/app/user/getOrderList","post",{size:5,currPage:this.currPage},(res)=>{
      if(res.data.code===1000){
        let app = this.data.Lis;
        let arr = res.data.datas.orderList
        for(let i = 0;i<arr.length;i++){
          if( arr[i].alsoDate) arr[i].alsoDate =  _app.___formattingTime(res.data.datas.orderList[i].alsoDate )
          if( arr[i].payDate)   arr[i].payDate  = _app.___formattingTime(res.data.datas.orderList[i].payDate )
          app.push( res.data.datas.orderList[i])
        }
        this.setData({
          Lis:app,
          totalLoan:res.data.datas.totalLoan,
          totalReturn:res.data.datas.totalReturn,
          srting:true
        })
      }else{
      
      }
    })
  },
  onReachBottom(){
    this.currPage+=1;
    this.init( )
  },

  settlement(e){
    let _this = this;
    if(e.currentTarget.dataset.payState==='2') return false;
    let id = e.currentTarget.dataset.orderNumber;
    _app.ajax("/powerBank/app/user/settlement","post",{payType:"1",orderId:id},(res)=>{
      if(res.data.code===1000){
        my.tradePay({
          tradeNO:res.data.data.orderInfo,
          success:(res)=>{
              if(res.resultCode===9000){
                 _this.init( )
              }
          }
        })
      }else{
        my.alert({
          title: res.data.message
        });
      }
    },(error)=>{
      my.alert({
        title: '网络连接错误，请稍后再试！' 
      });
    })
  }
})