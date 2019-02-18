import {itme} from "./pages/time"
App({
  userInfo:{},
  url:"https://www.vdiankeji.com",
  code:"",
  token:"",
  headUrl:"",
  balance:"",
  qrCode:null,
  isLogin:false,
  onLaunch(options) {
	  if(options.query){
			this.qrCode = JSON.stringify(options.query.qrCode).split("imei=")[1].replace('"','');
			this.qrCode = this.qrCode.replace('=','');
	  }
    // 第一次打开
    // options.query == {number:1}
    //this.initGetuser( )
    //this.baseUserInfo( )
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
    let code;
    let _this = this;
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        _this.code = code = res.authCode;
         my.getAuthUserInfo({
           success:(getUserInfo)=>{
                    my.httpRequest({
                      url:_this.url+"/powerBank/other/aliAuthLogin",
                      method:"get",
                      data:{code:code},
                      success( res ){
                        let data =res.data;
                        if(data.code===1000){
                            _this.token = data.data.token;
                            _this.balance = data.data.balance;
                            _this.isLogin = true,
                            _this.userInfo={
                              userName:getUserInfo.nickName,
                              avatar:getUserInfo.avatar
                            }
                            cb&&cb( _this.userInfo )
                        }
                      },
              })
           }
         })
      },
      fail:(res)=>{
        console.log(res)
      }
    });
  },

  //静默授权
  baseUserInfo(cb){
    let code;
    let _this = this;
     my.getAuthCode({
         scopes: 'auth_user',
         success:(res)=>{
             _this.code = code = res.authCode;
         my.getAuthUserInfo({
           success:(getUserInfo)=>{
                    my.httpRequest({
                      url:_this.url+"/powerBank/other/aliAuthLogin",
                      method:"get",
                      data:{code:code},
                      success( res ){
                        let data =res.data;
                        if(data.code===1000){
                            _this.token = data.data.token;
                            _this.balance = data.data.balance;
                            _this.isLogin = true,
                            _this.userInfo={
                              userName:getUserInfo.nickName,
                              avatar:getUserInfo.avatar
                            }
                            cb&&cb(_this.userInfo)
                      }
                },
              })
           }
         })
         },fail:(res)=>{
        console.log(res)
      }
     })
  },
  /**获取用户信息 End */

  /**手机号登陆 Start */
  phoneLoad( res,cb){
    let _this = this;
     let data =res.data;
     if(data.code===1000){
        _this.token = data.data.token;
        _this.balance = data.data.balance;
        _this.isLogin = true;
        _this.isPhone = true;
        _this.userInfo={
          userName:data.data.userName||data.data.phone,
          avatar:data.data.headUrl
        }
      cb&&cb( _this.userInfo )
      }
  },
  /**手机号登陆 End */
   onError(msg) {
    console.log(msg)
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

  ajax(url,type,data,success,err){
    let _url     = url,
        _type    = type,
        _Data    = data,
        _success = success;
    let _this = this;
    let _data ={
      url:this.url+url,
      method:_type,
      success:(res)=>{
          if(res.data.message.indexOf("登录超时")<=-1){
              success&&success( res )
          }else{
             _this.initGetuser(( )=>{
               if(_this.isPhone){ 
                 my.alert({
                   title:res.data.message 
                 });
                  this.Nav("../login/login","登陆");
                  };
               _this.ajax(_url,_type,_Data,_success);
             })
          }
      },
      fail:( error )=>{
        err&&err( error )
      }}
      if(this.token.length>0){
        _data.headers={'content-type': 'application/json',"token":this.token}
      }else{
         _data.headers={'content-type': 'application/json'}
      }
      if(data){
         _data.data=JSON.stringify(data)
      }
    my.httpRequest(_data)
  },
  /**格式化时间 */
  formattingTime(item){
    var date =new Date( item ) ;
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    //         + " " + date.getHours() + seperator2 + date.getMinutes()
    //         + seperator2 + date.getSeconds();
     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
  },
   /**格式化时间2.0 */
  ___formattingTime(item){
    if(!item) return false; 
    var date =new Date( item ) ;
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
  },

  /**百度地图坐标转换高德地图坐标 lng*/
   bd_decrypt(bd_lng, bd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = bd_lng - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return {lng: gg_lng, lat: gg_lat}
  },
  /**高德坐标转换为百度坐标 */
   bd_encrypt(gg_lng, gg_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gg_lng, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {lat: bd_lat,lng: bd_lng}
   }
});
