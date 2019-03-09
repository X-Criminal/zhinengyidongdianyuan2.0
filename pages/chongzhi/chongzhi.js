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
    
  },
  onReady(){
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
    let _this = this;
    if(this.data.cType.length<=0) return false;
    let data = {
        amounts:this.data.cType,
        couponscuseId:this.data.gb[0].couponsuseId,
        payType:"1",
        type:"2"
    }
    app.ajax("/powerBank/app/user/userRecharge","post",data,(res)=>{
        if(res.data.code===1000){
          my.tradePay({
            tradeNO:res.data.data.orderInfo, //完整的支付参数拼接成的字符串，从服务端获取
            success: (res) => {
                if(res.resultCode==="9000"){
                    _this.init(()=>{
                      my.navigateBack({
                        delta:1
                      })
                    })
                }
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
			let _gb = []
			if(res.data.data.length>0){
				_gb.push(res.data.data[0]);
			}
			this.setData({
					CouponsByuserId:res.data.data,
					gb:_gb,
			})
      }
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
    init( cb ){
      app.ajax(
      "/powerBank/app/user/getUser",
      "post",
      null,
      (res)=>{
        if(res.data.code===1000){
         let _data = res.data.data
          this.setData({
            userImg:_data.headUrl,
            userName:_data.userName,
            vipState:_data.vipState,
            vipTime:_data.vipTime,
            depositState:_data.depositState,
            deposit:_data.deposit,
            balance:_data.balance
          })
          my.setStorage({
            key:"userInfo",
            data:{
              userImg:_data.headUrl,
              userName:_data.userName,
              vipState:_data.vipState,
              vipTime:_data.vipTime,
              depositState:_data.depositState,
              deposit:_data.deposit,
              balance:_data.balance
            },
            success:(res)=>{
              console.log(res)
            }
          })
          cb&&cb( )
        }
      },
      (err)=>{
      }
      )
  },
})