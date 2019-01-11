App({
  userInfo:{},
  url:"https://www.vdiankeji.com",
  code:"",
  token:"",
  headUrl:"",
  balance:"",
  isLogin:false,
  onLaunch(options) {
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
        _this.isLogin = true,
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
    let _data ={ 
      url:this.url+url,
     
      method:type,
      success:(res)=>{
          success&&success(res )
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
});
