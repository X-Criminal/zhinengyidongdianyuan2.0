let app = getApp( );
Page({
  data:{
    userInfo:{
       avatar:"",
      nickName:"",
      isLogin:false,
    },
    userName:"",
    initLatitude:0,
    initLongitude:0,
    TxtSearch:"",
    scale:16,
    showTop2:false,
    showTop3:false,
    mask:false,
    _z:"",
    mapStyle:"width: 100%; height:calc(100% - 57px);",
    markers: [{
      iconPath: "/img/map_garage1.png",
      id: 11,
      latitude: 22.599546,
      longitude: 113.888408,
      width: 50,
      height: 50,
    },{
      iconPath: "/img/map_garage1.png",
      id: 9,
      latitude: 22.610322,
      longitude:113.887555,
      width: 50,
      height: 50,
    }],
    List:[
      {
        icon: '/img/service_artificial.png',
        text: '客服中心',
      },
      {
        icon: '/img/service_instructions.png',
        text: '使用说明',
      },
      {
        icon: '/img/service_problem.png',
        text: '常见问题',
      },
      {
        icon: '/img/service_fault.png',
        text: '故障上报',
      }
    ],
    controls:[],
    endLat:0,//报错标记点
    endLng:0,//报错标记点
  },
  onLoad(query) {
    // 页面加载
    if(query.type){
      switch(query.type){
        case "1":
          this.login_(JSON.parse(query.data))
        break;
      }
    }
    
    //  app.initGetuser((res)=>{
    //    let userInfo = res;000000000
    //        userInfo.isLogin=true,
    //    this.setData({
    //      userInfo:userInfo
    //    })
    //    console.log(userInfo)
    //  })
  },
  onReady() {
    this.getLocation( )
    this.getWindowSize( )
    // 页面加载完成
  },
  /**登陆界面返回*/
  login_( res ){
    res.isLogin=true,
    this.setData({
        userInfo:res,
    })
  },
  /**绑定搜索框 Start*/
  onInput(e){
    this.setData({
      TxtSearch:e.detail.value
    })
  },
  login(){
    my.navigateTo({
       url:'../login/login',
       success:()=>{
            my.setNavigationBar({
              title:"登陆",
              backgroundColor:"#000",
              borderBottomColor:"#000",
          })
        }
       })
  },
  /**登陆 End */
  /**个人中心 Start*/
  center(){
      if(this.data.userInfo.isLogin){
        this.Nav(
         "../center/center",
         "个人中心"
        )
      }else{
         this.login( )
      }
       
  },
  /**个人中心 End */
  getclick(e) {
    console.log('control tap', e);
  },
  getLocation(){
    let that = this;
    my.getLocation({
      success(res) {
        that.setData({
          initLatitude:+res.latitude,
          initLongitude:+res.longitude
        })
        that.mapCtx = my.createMapContext('map');
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败',
                    content:"请打开设备地理位置",
         });
      },
    })
  },
  // mapPosition(event){
  //     console.log(event)
  // },
  getWindowSize(){
  let _this = this;
   my.createSelectorQuery( ).select( )
   .selectViewport().boundingClientRect()
   .exec((res)=>{
     let windowWidth  = res[0].width;
     let windowHeight = res[0].height;
     let arr=[];
     let _initPosition={
        id:1,
        iconPath: '/img/map_current.png',
        clickable:true,
        position: {
          left:windowWidth-60,
          top: windowHeight-300,
          width: 40,
          height: 40
        },
    }
    let kefu={
        id:2,
        iconPath: '/img/map_fault.png',
        clickable:true,
        position: {
          left:windowWidth-60,
          top: windowHeight-250,
          width: 40,
          height: 40
        },
    }
    let sm ={
      id:3,
      iconPath: '/img/sm.png',
      clickable:true,
      position: {
          left:(windowWidth-344.7)/2,
          top: windowHeight-150,
          width: 344.7,
          height: 46
        },
    }
    arr.push(_initPosition)
    arr.push(kefu)
    arr.push(sm)
     _this.setData({
        controls:arr,
     })
  });
  },
  clickControlTap(e){
    switch(e.controlId){
          case 1:
          this.position( )
          break;
          case 2:
          this.service( )
          break;
          case 3:
          this.sweepCode( )
          break;
    }
  },

  /**点击扫码二维码 Start*/
  sweepCode(){
    if(this.data.userInfo.isLogin){
      this.scan((res)=>{
        console.log(res)
      })
    }else{
      this.login( )
    }
  },
  //调起二维码扫描
  scan(cb){
    my.scan({
        type: 'qr',
        success: (res) => {
          //my.alert({ title: res.code });
          cb&&cb(res)
        },
    })
  },
  /**点击扫码二维码 End*/
  position(){
    //定位到当前位置
    this.mapCtx.moveToLocation( )
  },
  service(){
    //点击客服
    this.setData({
      showTop2:true,
      showTop3:false,
      mapStyle:"width: 100%; height:calc(100% - 265px);",
    })
  },
  RegionChange(e){
    //移动地图
  },
  /**客服中心 Start */
  onItemClick(e){
    switch (e.detail.index){
       case 0:
        this.Nav(
          '../service/service',
          '客服中心'
          )
       break;
      case 1:
      this.Nav(
          '../explain/explain',
          '客服中心'
          )
        break;
      case 2:
         this.Nav(
          '../problem/problem',
          "常见问题"
          )
        break;
      case 3:
        this.Nav(
          '../fault/fault',
          "故障上报"
          )
        break;
    }
  },
   /**客服中心 End */

   /**点击标记点 Start */
    getMarKer(e){
        if(!this.showTop3) this.setData({showTop3:false});
        this.mapCtx.clearRoute()
        this.Nav("../detaIls/detaIls")
    },
   

    //导航路线
    show_Route(endLat,endLng){
      this.mapCtx.showRoute({
      startLat: this.data.initLatitude,              // 起点纬度
      startLng: this.data.initLongitude,             // 起点经度
      endLat: endLat,
      endLng: endLng,              // 重点经度
     // routeColor:'#FFB90F',            // 路线颜色
      iconPath: "/img/merchants_location.png",  // 路线纹理  10.1.35
      iconWidth: 10,                    // 纹理宽度  10.1.35
      routeWidth: 10,                   // 路线宽度  
      zIndex: 998                         // 覆盖物 Z 轴坐标  10.1.35
      })                     // 覆盖物 Z 轴坐标  10.1.35
    },
   /**点击标记点 End */

  /**点击搜索 Start */
    onFOCUS(e){
           my.navigateTo({
            url:'../search/search',
            success:()=>{
                  my.setNavigationBar({
                    title:"搜索",
                    backgroundColor:"#fff",
                    borderBottomColor:"#fff",
                })
              }
            })
    },
  /**点击搜索 End*/
  /**点击地图 Start */
  clickMap(){
    this.mapCtx.clearRoute()
    this.setData({
         showTop2: false,
         showTop3: false,
         mapStyle:"width: 100%; height:calc(100% - 57px);",
    })
  },
  /**点击地图 End */
  /**选择地址 Start */
    positionLis(e){
      this.setData({
        _z:e.markerId,
      })
      this.mapCtx.updateComponents({
        longitude:e.longitude,
        latitude:e.latitude,
      })
    },
  /**选择地址 End */

  /**查看详情 Start*/
  onDetails(e){
    console.log("查看详情")
    this.Nav(
      '../detaIls/detaIls',
      '商家详情'
      )
  },
  getRoute( ){
    //路线导航
    console.log("路线导航");
    this.show_Route(this.data.endLat,this.data.endLng );
  },
  /**查看详情 End */
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'V电',
      desc: 'My App description',
      path: '../index/index',
    };
  },
  Nav(url,title,color){
       my.navigateTo({
              url:url,
              success:()=>{
                    my.setNavigationBar({
                      title:title,
                      backgroundColor:color,
                      borderBottomColor:color,
                  })
                }
              })
  },

  //页面显示
  onShow(  ){
    
  },
  onError(msg) {
    console.log(msg)
  },
});
