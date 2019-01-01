App({
  userInfo:"小白.png",

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
  initGetuser(){
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
            success:(userInfo) => {
                console.log(userInfo)
            }
        })
      },
    });
  },
   onError(msg) {
    console.log(msg)
  },
});
