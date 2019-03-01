let app = getApp( )
Page({
  data:{
    Lis:[ ],
    message:"加载中......"
  },
  onReady(){
    this.init( )
  },
  Nav(e){
    app.Nav("../detaIls/detaIls?merchantsId="+e.currentTarget.dataset.merchantsId+"&distance="+e.currentTarget.dataset.distance,"商家详情");
  },
  init(){
    let _this = this;
    my.getLocation({
      success(res) {
          app.ajax("/powerBank/app/user/getShopList","post",{latitude:+res.latitude,longitude:+res.longitude},( res )=>{
            if(res.data.code===1000){
              _this.setData({
                Lis:res.data.data,
              })
            }else{
              _this.setData({
                message:"附近暂无街电...."
              })
            }
          })
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败',
                    content:"请打开设备地理位置",
         });
      },
    })


    
  }
})