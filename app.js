App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
   
  },
  onShow(query,path) {

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
   onHide() {
    // 小程序隐藏
  },
   onError(msg) {
    console.log(msg)
  },
});
