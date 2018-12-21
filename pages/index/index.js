Page({
  data:{
    userName:"",
    initLatitude:0,
    initLongitude:0,
    TxtSearch:"",
    scale:14,
    showTop:false,
    showTop2:false,
    showTop3:false,
    showTop4:false,
    mask:false,
    position_z:[
      {name:"123",login:"小路1",id:1,latitude: 22.599546,longitude: 113.888408},
      {name:"123",login:"小路2",id:2,latitude: 22.422,longitude: 113.888408},
      {name:"123",login:"小路3",id:3,latitude: 23.6,longitude: 115.888408},
    ],
    _z:"",
    card:{
      thumb:"/img/merchants_vouchers.png",
      title:"**七折优惠劵",
      subTitle:"有效期至2019-1-30"
    },
    markers: [{
      iconPath: "/img/map_garage1.png",
      id: 10,
      latitude: 22.599546,
      longitude: 113.888408,
      width: 50,
      height: 50
    },{
      iconPath: "/img/map_garage1.png",
      id: 10,
      latitude: 22.422,
      longitude:113.888408,
      width: 50,
      height: 50
    },{
      iconPath: "/img/map_garage1.png",
      id: 10,
      latitude: 23.6,
      longitude: 115.888408,
      width: 50,
      height: 50
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
    inputStyle:"",
    endLat:0,//报错标记点
    endLng:0,//报错标记点
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    this.getLocation( )
    this.getWindowSize( )
    // 页面加载完成
  },
  /**绑定搜索框 Start*/
  onInput(e){
    this.setData({
      TxtSearch:e.detail.value
    })
  },
  /**绑定搜索框 End */
  sweep(  ){
   this.login( )
  },
  /**登陆 Start */
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
       this.Nav(
         "../center/center",
         "个人中心"
       )
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
     let arr=[]
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
    arr.push(_initPosition)
    arr.push(kefu)
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
    }
  },
  position(){
    //定位到当前位置
    this.mapCtx.moveToLocation( )
  },
  service(){
    //点击客服
    this.setData({
      showTop2:true,
    })
  },
  showTop_2(){
    //隐藏客服
    this.setData({
      showTop2: false,
    })
  },
  RegionChange(e){
    if (e.type === 'end') {
      this.setData({
        scale: e.scale
      });
    }
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
        setTimeout(()=>{
          this.setData({
            endLat:e.latitude,
            endLng:e.longitude,
            showTop3:true,
          })
        },1000)
    },
    /**点击标记点 End */
    //导航路线
    show_Route(endLat,endLng){
      this.mapCtx.showRoute({
      startLat: this.data.initLatitude,              // 起点纬度
      startLng: this.data.initLongitude,             // 起点经度
      endLat: endLat,
      endLng: endLng,              // 重点经度
      routeColor: '#FFB90F',            // 路线颜色
      iconPath: "/image/texture.png",  // 路线纹理  10.1.35
      iconWidth: 10,                    // 纹理宽度  10.1.35
      routeWidth: 10,                   // 路线宽度  
      zIndex: 4                         // 覆盖物 Z 轴坐标  10.1.35
      })
    },
   /**点击标记点 End */

  /**点击搜索 Start */
    onFOCUS(e){
      if(this.data.showTop4){
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
      };
      this.setData({
        inputStyle:"left: 10px;right: 10px; height: 40px;top: calc(50% - 20px);background-color: #F5F6F6;z-index: 998; border-radius: 30px;",
        showTop4:true,
      })
    },
    onBLUS(e){
       this.setData({
        inputStyle:""
      })
     
    },
  /**点击搜索 End*/
  /**点击地图 Start */
  clickMap(){
    this.setData({
         showTop3:false,
         inputStyle:"",
         showTop4:false,
    })
  },
  /**点击地图 End */
  /**选择地址 Start */
    positionLis(e){
      this.setData({
        _z:e.target.dataset.id,
      })
      this.mapCtx.updateComponents({
        longitude:e.target.dataset.longitude,
        latitude:e.target.dataset.latitude,
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
    this.position( );
  },
  /**查看详情 End */
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'V电',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  Nav(url,title="",color="#fff"){
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
  onError(msg) {
    console.log(msg)
  },
});
