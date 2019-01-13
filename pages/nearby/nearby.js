let app = getApp( )
Page({
  data:{
    Lis:[ ]
  },
  onReady(){
    this.init( )
  },
  init(){
    let _this = this;
    my.getLocation({
      success(res) {
          app.ajax("/powerBank/app/user/getShopList","post",{latitude:+res.latitude,longitude:+res.longitude},( res )=>{
            if(res.data.code===1000){
              _this.setData({
                Lis:res.data.data
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