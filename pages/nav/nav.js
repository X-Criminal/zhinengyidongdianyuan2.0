let app = getApp( );
Page({
  data:{
    initLongitude:0,
    initLatitude:0,
    onlat:0,
    olon:0,
    mapStyle:"width:100%;height:calc(100% - 188rpx);",
    controls:[],
    markers: [],
    merchantsName:"",
    merchantsAdderss:"",
  },
  mapCtx2:null,
  onReady() {
    this.getLocation( )
    // 页面加载完成
  },
  onLoad(query){
    this.init(query.merchantsId)
  },

  init(id){
    app.ajax('/powerBank/app/user/getMerchantByid','post',{merchantsId:id},(res)=>{
        if(res.data.code===1000){
          let data = res.data.data;
          this.setData({
              initLongitude:data.longitude,
              initLatitude:data.latitude,
              merchantsName:data.merchantsName,
              merchantsAdderss:data.merchantsAdderss,
              markers:[{latitude:data.latitude,longitude:data.longitude,id:id}]
          })
        }
    })
  },

  getLocation(){
    let _this = this;
    my.getLocation({
      success(res) {
        _this.setData({
          onlat:res.latitude,
          olon:res.longitude,
          initLongitude:res.longitude,
          initLatitude:res.latitude,
        })
        _this.mapCtx2 = my.createMapContext('map2');
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败',
                    content:"请打开设备地理位置",
         });
      },
    })

  },
  clickControlTap( e ){
       this.mapCtx2.moveToLocation( )
  },
  onMarkerTap(){
    this.show_Route(this.data.markers[0].latitude,this.data.markers[0].longitude)
  },
 //导航路线
  show_Route(endLat,endLng){
      this.mapCtx2.showRoute({
      startLat: this.data.onlat,              // 起点纬度
      startLng: this.data.olon,             // 起点经度
      endLat: endLat,
      endLng: endLng,              // 重点经度
     // routeColor:'#FFB90F',            // 路线颜色
      iconPath: "/img/merchants_location.png",  // 路线纹理  10.1.35
      iconWidth: 10,                    // 纹理宽度  10.1.35
      routeWidth: 10,                   // 路线宽度  
      zIndex: 998                         // 覆盖物 Z 轴坐标  10.1.35
      })                             // 覆盖物 Z 轴坐标  10.1.35
   },
})