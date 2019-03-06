let app = getApp( );
Page({
  data:{
    userInfo:{
       avatar:"",
      nickName:"",
    },
    cc:false,
    newData_animation:"",
    queryIfLoan:"",
    queryIfLoanId:"",
    userName:"",
    initLatitude:0,
    initLongitude:0,
    onLat:0,
    onLong:0,
    scale:16,
    showTop2:false,
    mask:false,
    mapStyle:"width: 100%; height:calc(100% - 57px);",
    markers: [],
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
  onLoad(query){

  },
  onReady(){
    this.getWindowSize( ( )=>{
      this.getLocation( (latitude,longitude)=>{
			setTimeout(()=>{
				  app.baseUserInfo((user)=>{
                this.setData({
                  userInfo:user,
                })
                 this.queryIfLoan( );
                 this.getCouponsByCategory( );
					  this.getShopList(latitude,longitude);
					  if(app.qrCode ){
						  setTimeout(()=>{
							  this.sweepCode( )
						  },500)
					  }
              })
			},300)
      })
    })
    // 页面加载完成
  },
  /**登陆界面返回*/
  login_( res ){
    this.setData({
        userInfo:JSON.parse(res)
    })
    this.queryIfLoan( )
  },
  /**登陆 Start */
  login(){
    app.initGetuser( )
  },
  /**登陆 End */
  /**是否有新优惠劵可以领取 Start*/
  getCouponsByCategory(){
    let _this = this;
    app.ajax("/powerBank/app/user/getCouponsByCategory","post",null,(res)=>{
      if(res.data.code===1000){
        let data = res.data.data;
        my.setStorage({
          key:"Category",
          data:data,
        })
        if(data&&data.length>0&&JSON.stringify(data).indexOf('"receiveState":"0"')>-1){
            _this.setData({
              newData_animation:"newData_animation"
            })
        }else{
          _this.setData({
              newData_animation:"",
          })
        }
      }
    })
    setTimeout(()=>{
      this.setData({
        newData_animation:"",
      })
    },10000)
  },
  newDiscount(){
    app.Nav("../Coupon/coupon","优惠劵领取中心");
  },
  /**是否有新优惠劵可以领取 End*/
  /**个人中心 Start*/
  center(){
      if(app.isLogin){
        this.Nav(
         "../center/center",
         "个人中心"
        )
      }else{
         this.login( )
      }
       
  },
  /**个人中心 End */
  getLocation(cb){
    let that = this;
    my.getLocation({
      success(res) {
        that.setData({
          initLatitude:+res.latitude,
          initLongitude:+res.longitude,
          onLat:+res.latitude,
          onLong:+res.longitude,
        })
        that.mapCtx = my.createMapContext('map');
        cb&&cb(+res.latitude,+res.longitude);
		 
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败',
                    content:"请打开设备地理位置",
         });
      },
    })
  },
  getWindowSize( cb ){
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
          top:windowHeight>=724?windowHeight-357:windowHeight-320,
          width: 55,
          height:55
        },
    }
    let kefu={
        id:2,
        iconPath: '/img/map_fault.png',
        clickable:true,
        position: {
          left:windowWidth-60,
          top: windowHeight>=724?windowHeight-307:windowHeight-250,
          width: 55,
          height: 55
        },
    }
    let sm ={
      id:3,
      iconPath: '/img/position.png',
      clickable:true,
      position: {
          left:windowWidth/2-13,
          top:windowHeight/2-50-20,
          width: 26,
          height: 40
        },
    }
    arr.push(_initPosition)
    arr.push(kefu)
     arr.push(sm)
     _this.setData({
        controls:arr,
     })
     cb&&cb( )
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
         // this.sweepCode( )
          break;
    }
  },

  /**点击扫码二维码 Start*/
  sweepCode(){
    if( this.data.queryIfLoan===1000 ){
		this.scan( "1000" )
     // this.Nav( "../loan2/loan?queryIfLoanId="+this.data.queryIfLoanId ,"租借详情")
      return false;
    }
    if(app.isLogin){
      app.ajax("/powerBank/app/user/getUserdeposit","post",null,(res)=>{
        if(res.data.code===1000){
			  console.log(res.data.data)
			 switch (res.data.data.depositState){
				 case "1":
					this.scan( "1" )
				 break;
				 case "2":
					this.scan( "2" )
				 break;
				 case "3":
					this.scan( "3" )
				 break;
				 case "4":
					 my.alert({title:"申请退还押金中，暂时不可租借！"})
				 break;
				 case "1000":
					this.scan( "3" )
				 break;
				 default:
				   my.alert({title:"网络连接错误，请稍后再试"})
			 }
        }
      })
    }else{
      this.login( )
    }
  },
  //调起二维码扫描
  scan(type){
    let _this = this;
	 if(!app.qrCode){
		    my.scan({
				type: 'qr',
				success: (res) => {
						let _code =  res.code.split("imei=")[1]
					//my.alert({ title: res.code });
						if(type==="3") _this.Nav("../zmBorrow/zmBorrow?data="+JSON.stringify({code:_code}),"租用确认");
						if(type==="1") _this.Nav("../submission/submission?data="+JSON.stringify({code:_code}),"租用确认");
						if(type==="2") _this.Nav("../borrow/borrow?data="+JSON.stringify({code:_code}),"租用确认");
						if(type==='1000')   _this.Nav( "../loan2/loan?queryIfLoanId="+this.data.queryIfLoanId+'&data='+JSON.stringify({code:_code}),"租借详情");
				},
				fail:(res)=>{
					console.log(res)
				}
    		})
	 }else{
		 				if(type==="3") _this.Nav("../zmBorrow/zmBorrow?data="+JSON.stringify({code:app.qrCode}),"租用确认");
						if(type==="1") _this.Nav("../submission/submission?data="+JSON.stringify({code:app.qrCode}),"租用确认");
						if(type==="2") _this.Nav("../borrow/borrow?data="+JSON.stringify({code:app.qrCode}),"租用确认");
						if(type==='1000')   _this.Nav( "../loan2/loan?queryIfLoanId="+this.data.queryIfLoanId+'&data='+JSON.stringify({code:app.qrCode}),"租借详情");

	 }
  },

  /**点击扫码二维码 End*/
  position(){
    //定位到当前位置
     this.mapCtx.updateComponents({
        longitude:this.data.onLong,
        latitude:this.data.onLat,
      })
  },
  service(){
    //点击客服
    this.setData({
      showTop2:true,
    })
  },

  RegionChange(e){
    let _this = this;
    //移动地图
     if(e.type === "end"){
       this.setData({
         scale:e.scale,
       })
        _this.getShopList(e.latitude,e.longitude)
      }
  },
  /**客服中心 Start */
  onItemClick(e){
    switch (e.target.dataset.type){
       case "1":
        this.Nav(
          '../service/service',
          '客服中心'
          )
       break;
      case "2":
      this.Nav(
          '../explain/explain',
          '使用说明'
          )
        break;
      case "3":
         this.Nav(
          '../problem/problem',
          "常见问题"
          )
        break;
      case "4":
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
        let data = this.data.markers;
        for(let i = 0 ,idx = data.length;i<idx;i++){
          if((data[i].id)===(+e.markerId)){
            this.Nav("../detaIls/detaIls?merchantsId="+e.markerId+"&distance="+data[i].distance,"商家详情");
            return ;
          }
        }
    },
   /**点击标记点 End */

  /**点击搜索 Start */
    onFOCUS(e){
      let _this = this;
          my.chooseLocation({
            success(e){
                _this.getShopList(e.latitude,e.longitude)
            }
          })
    },
  /**点击搜索 End*/
  /**点击地图 Start */
  clickMap(){
    this.mapCtx.clearRoute()
  },
  /**点击地图 End */
  /**附近的商家 Start*/
    nearby(){
      this.Nav(
        '../nearby/nearby',
        '附近V电'
      )
    },
  /**附近的商家 End */
  /**查看详情 End */

   /**获取附近商家 Start */
    _getShopList: true,
	 ll:0,
    getShopList(lat,long){
	 this.ll += 1;
    let _this = this;
    if(!this._getShopList) { return false; }
     _this._getShopList= false;
     setTimeout(()=>{
        _this._getShopList= true
     },800)
     my.showLoading( )
	//   if(this.mapCtx){
	// 	this.mapCtx.updateComponents({
	// 		longitude:long,
	// 		latitude:lat,
   //    })
	//   }
		let position;
		if(long===0||lat===0){
			setTimeout(()=>{
				_this.getShopList(this.data.initLongitude , this.data.initLatitude)
			},500)
		}else{
			position = app.bd_encrypt(long, lat)
		}
        app.ajax("/powerBank/app/user/getShopList",
                  "post",
                  {latitude:position.lat,longitude:position.lng},
                  (res)=>{
                  if(res.data.code===1000){
                        let data = res.data.data;
                        let arr = [ ];
                        for(let i = 0,idx = data.length;i<idx;i++){
                          let position = app.bd_decrypt(data[i].longitude, data[i].latitude )
                          arr.push({
                              iconPath: "/img/map_garage1.png",
                              id:data[i].merchantsId,
                              latitude: position.lat,
                              longitude:position.lng,
                              width: 50,
                              height: 50,
                              distance:data[i].distance
                            })
                        }
                        _this.setData({
                          markers:arr,
                          initLatitude:lat,
                          initLongitude:long,
                        })
                  }
                   my.hideLoading({
                      page: _this,  //防止执行时已经切换到其它页面，page指向不准确
                  });
          },(err)=>{
            console.log(err)
          })
    },
   /**获取附近商家 End */
  /**查询是否租用  */
  queryIfLoan(){
    app.ajax("/powerBank/app/user/queryIfLoan","post",null,(res)=>{
        this.setData({
          queryIfLoan:res.data.code
        })
        if(res.data.code===1000){
          this.setData({
            queryIfLoanId:res.data.data.orderId
            })
       }
    })
  },
  fLoan(){
    this.Nav("../loan/loan?queryIfLoanId="+this.data.queryIfLoanId,'租借详情')
  },

  mast(){
    this.setData({
      showTop2:false,
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'V电',   
      desc: 'My App description',
      path: '../index/index',
    };
  },
  Nav(url,title){
       my.navigateTo({
              url:url,
              success:()=>{
                    my.setNavigationBar({
                      title:title,
                  })
                }
              })
  },
  //页面显示
  onShow(  ){
    if(this.data.cc){
        this.getCouponsByCategory()
        this.queryIfLoan( )
    }else{
      this.setData({
        cc:true,
      })
    }
  },
  onError(msg) {
    console.log(msg)
  },
});
