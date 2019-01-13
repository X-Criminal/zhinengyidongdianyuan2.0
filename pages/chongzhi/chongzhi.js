let app = getApp( )
Page({
  data:{
    cType:"",
    showLis2:false,
    couponscuseId:"",
    CouponsByuserId:[],
    gb:[],
    key:0,
  },
  onLoad(){
    this.getCouponsDeviceList( )
  },
  getType(e){
    this.setData({
      cType:e.target.dataset.type
    })
  },
  showLis2(){
    this.setData({
      showLis2:!this.data.showLis2
    })
  },
  cz(){
    if(this.data.cType.length<=0) return false;
    let data = {
        amounts:this.data.cType,
        couponscuseId:this.data.couponscuseId,
        payType:"1",
        type:"2"
    }
    app.ajax("/powerBank/app/user/userRecharge","post",data,(res)=>{
        if(res.data.code===1000){
          my.tradePay({
            tradeNO:res.data.data.orderInfo, //完整的支付参数拼接成的字符串，从服务端获取
            success: (res) => {
                console.log(res)
            },
            fail: (res) => {
              my.alert({
                content: JSON.stringify(res),
              });
            }
          });
        }else{
          my.alert({
            title: res.data.message 
          });
        }
    })
  },
  getCouponsDeviceList(){
    app.ajax("/powerBank/app/user/getCouponsByuserIdList","post",{currPage:"1",size:"99",type:"1"},(res)=>{
      if(res.data.code===1000){
        this.setData({
            CouponsByuserId:res.data.data,
        })
      }
      console.log(res)
    })
  },
  setCB( e ){
    let app =[];
    app.push(this.data.CouponsByuserId[e.currentTarget.dataset.key])
    this.setData({
      key :e.currentTarget.dataset.key,
      gb  :app
    })
  },
})