Page({
  data:{
    userName:"",
    initLatitude:"",
    initLongitude:"",
    scale:14,
    markers: [{
      iconPath: "../../img/map_garage1.png",
      id: 10,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 50,
      height: 50
    }],
    controls:[]
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    this.mapCtx = my.createMapContext('map');
    this.getLocation( )
    this.getWindowSize( )
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  sweep(  ){
   this.login( )
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
        iconPath: '../../img/map_current.png',
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
        iconPath: '../../img/map_fault.png',
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
    console.log("客服")
  },

  RegionChange(e){
    if (e.type === 'end') {
      this.setData({
        scale: e.scale
      });
    }
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'V电',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  }
});
