let app = getApp( )
Page({
  data:{
    imgUrls:[1,2,3,4],
    defaimg:"",
    merchantsId:"",
    showCoupon:false,
    name:"",
    couponsState:"2",
    couponsList:[],
    isget:"一键领取"
  }, 
   onLoad(query) {
    // 页面加载
  
   this.init(query.merchantsId)
  },

  init(res){
    this.setData({
     merchantsId:res
    })
    app.ajax("/powerBank/app/user/getMerchantByid","post",{merchantsId:res},(data)=>{
        if(data.data.code===1000){
          let Info = data.data.data;
          this.setData({
              url:app.url,
              name:Info.merchantsName,
              also:Info.also,
              avgConsumption:Info.avgConsumption,
              borrow:Info.borrow,
              businessHours:Info.businessHours,
              couponsState:Info.couponsState,
              latitude:Info.latitude,
              longitude:Info.longitude,
              mac:Info.mac,
              merchantsAdderss:Info.merchantsAdderss,
              imgUrls:Info.pictureList,
              couponsList:Info.couponsList,
          })
        }
    })
  },

  onGetCoupon(){
    if(this.showCoupon||this.data.isget==="已领取") return false;
    app.ajax('/powerBank/app/user/updateCouponsAll','post',{merchantsId:+(this.data.merchantsId)},(res)=>{
      if( res.data.code===1000){
        this.setData({
          isget:"已领取",
          showCoupon:true,
        })
        this.init( )
         setTimeout(()=>{
            this.setData({
              showCoupon:false,
            })
        },3000)
      }else{
        my.alert({
          title: res.data.message
        });
      }
    })
  },
  onNav(){
    let _this = this;
    my.reLaunch({
      url:'/pages/nav/nav?merchantsId='+this.data.merchantsId,
      success:()=>{
        my.setNavigationBar({
          title:_this.data.name,
        })
      }
    })
  //  app.Nav('/pages/nav/nav?merchantsId='+this.data.merchantsId,this.data.name)
  },
})