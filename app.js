App({
  userInfo:{},
  token:"",
  url:"https://172.16.10.68:8952/",
  
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    //this.initGetuser( )
  },
  onShow(query,path) {

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
   onHide() {
    // 小程序隐藏
  },
  /**获取用户信息 Start */
  initGetuser(cb){
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
            success:(userInfo) => {
                  userInfo.isLogin=true;
                  this.userInfo=userInfo;
                  cb&&cb(userInfo);
            }
        })
      },
    });
  },
  /**获取用户信息 End */

  /**手机号登陆 Start */
  phoneLoad( res  ){
      this.userInfo=res;
  },
  /**手机号登陆 End */
   onError(msg) {
    console.log(msg)
  },
});
