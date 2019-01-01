let app = getApp( );
Page({
  data:{
    title:"xiaoming",
    array:"小白",
    disabled:true,
    btnStyle:"btnArea",
    delePhoneStyle:"delePhone",
    phone:"",
    code:"",
    codeText:"获取验证码",
    codeTxtStyle:"codeTxts",
    codeAlert:"codeAlert",
    LOND:"load"
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  fromData(e){
    let _this = this;
    this.setData({
      LOND:"load onLoad"
    })
    my.httpRequest({
      url:app.url+"powerBank/app/user/doLogin",
      method:"POST",
      data:{phone:this.data.phone,code:this.data.code},
      success( data ){
        console.log(data);
         _this.setData({
            LOND:"load"
          })
      },
      fail(err){
        my.alert({
          title: '网络连接错误，请稍后再试！' 
        });
        _this.setData({
            LOND:"load"
          })
      }
    })
  },
  getPhone(e){
    //获取手机号
    let value = e.detail.value;
    this.setData({
      phone:value
    })
    /**1.0 清除按钮是否展示 */
    if(value.length>0){
        this.setData({
          delePhoneStyle:"delePhones"
        })
    }else{
      this.setData({
          delePhoneStyle:"delePhone"
        })
    }
    /**2.0 判断是否可以发送验证码*/
    if(value.length===11){
      this.setData({
        codeTxtStyle:"codeTxt"
      })
    }else{
       this.setData({
        codeTxtStyle:"codeTxts"
      })
    }
    /**3.0 登录按钮是否可以点击*/
    if(this.data.code.length>0&&value.length===11){
        this.setData({
          disabled:false,
          btnStyle:"btnAreas",
        })
    }else{
      this.setData({
          disabled:true,
          btnStyle:"btnArea",
        })
    }
  },
  getCode(e){
    let _this = this;
    let value = e.detail.value;
   
    _this.setData({
      code:value
    })
    if(value.length>0&&this.data.phone.length===11){
        _this.setData({
          disabled:false,
          btnStyle:"btnAreas",
        })
    }else{
      _this.setData({
          disabled:true,
          btnStyle:"btnArea",
        })
    }

  },
  deleIcon(){
    //清除账号
    this.setData({
      phone:"",
      delePhoneStyle:"delePhone",
      codeTxtStyle:"codeTxts",
    })
  },
  sendOutCode(){
    if(this.data.codeTxtStyle!=="codeTxt") return false;
     this.codeShow( )
    // my.httpRequest({
    //   url:app.url+"powerBank/app/user/doLogin",
    //   method:"POST",
    //   data:{phone:this.data.phone},
    //   success( data ){ 
    //     this.codeShow( )
    //     console.log(data)
    //   }
    // })
  },

  codeShow(){
      let time = 60;
    this.setData({
        codeTxtStyle:"codeTxts",
        codeText:time+"s",
        codeAlert:"codeAlerts"
    })
    let times = setInterval(()=>{
        time--
        this.setData({
          codeText:time+"s"
        })
      if(time===0){
        this.setData({
            codeTxtStyle:"codeTxt",
            codeText:"获取验证码",
            codeAlert:"codeAlert",
        })
        clearInterval(times)
      }
    },1000)
  },
  /**支付宝登陆 */
  userLogin(){
     this.setData({
      LOND:"load onLoad"
    })
    app.initGetuser((res)=>{
       let userInfo = res;
           userInfo.isLogin=true,
       this.setData({
         userInfo:userInfo,
         LOND:"load"
       })
       this.Nav(`../index/index?type=1&data=${JSON.stringify(userInfo)}`)
     })
  },


  Nav(url,title="",color="#fff"){
    my.reLaunch({
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
/**手机号登陆 */
phoneLogin( res ){
  res.isLogin = true,
  this.setData({
    userInfo:res
  })
  app.phoneLoad( res )
  this.Nav( `../index/index?type=1&data=${JSON.stringify(res)}` )
},
/**页面跳转 */

  onReady() {
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
  defaultTap(){
    console.log(2)
  },

});