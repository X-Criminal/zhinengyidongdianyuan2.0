let app = getApp( )
Page({
  data:{
    phone:"",
    code:"",
    codeText:"获取验证码",
    isCode:false
  },
  phoneConfirm( e ){
    this.setData({
      phone:e.detail.value
    })
    if(e.detail.value.length===11){
      this.setData({
        isCode : true,
      })
    }else{
      this.setData({
        isCode : false,
      })
    }
  },
  codeConfirm(e ){
     this.setData({
      code:e.detail.value
    })
  },
  getCode(){
    let _this = this;
    if(this.data.codeText!=="获取验证码") return false;
    if(this.data.phone.length===11){
      app.ajax("/powerBank/other/sendCode","post",{phone:this.data.phone,types:"2"},(res)=>{
           my.alert({
            title: res.data.message
          });
          if(res.data.code===1000){
            _this._getcode( )
          }
      })
    }else{
        my.alert({
        title: "手机号输入错误！" 
        });
    }
  },

  _getcode(){
    let time = 60;
    this.setData({
        codeText:time+"s",
    })
    let times = setInterval(()=>{
        time--
        this.setData({
          codeText:time+"s"
        })
      if(time===0){
        this.setData({
            codeText:"获取验证码",
        })
        clearInterval(times)
      }
    },1000)
  },
  defaultTap(){
      app.ajax("/powerBank/app/user/updateUserPhone","post",{code:this.data.code,phone:this.data.phone},(res)=>{
          my.alert({
            title:res.data.message
          })
          if( res.data.cod===1000){
            my.navigateBack({
              delta:1
            })
          }
      })
  }
})