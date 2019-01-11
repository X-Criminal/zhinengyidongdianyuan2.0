let app = getApp( )
Page({
  data:{
    code:"",
   
    imgUrl:"",

    picture:"",
    code:"",
    Checkboxs:"123",
    faultDescription:"",
    terminalType:"1"
  },
  /**多选框 Start */
  onCheckBox(e){
    this.setData({
      Checkboxs:e.detail.value
    })
  },
   /**多选框 End */

  /**拍照 Start */
  chooseImage(){
    let _this = this;
    my.chooseImage({
      success(res){
          _this.setData({
            imgUrl:res.apFilePaths[0]
          })
          my.uploadFile({
            url:app.url+"/powerBank/web/communal/uploadFile",
            fileName:"file",
            fileType:"image",
            filePath:res.apFilePaths[0],
            success(res){
              let data = JSON.parse(res.data);
              if(data.code = 1000){
                this.setData({
                  picture:data.data
                })
              }
            },
            fail(res){
              //console.log(res)
            }
          })
      }
    })
  },
  /**拍照 End */

  /**二维码扫描 */
  getCode(  ){
    let _this = this;
    my.scan({
      type:"qr",
      success( res ){
          _this.setData({
            code:res.code
          })
      }
    })
  },
  /**描述 */
  change(data){
    this.setData({
      faultDescription:data.detail.value
    })
  },
  upData(){
    let data={
      cabinetMac:this.data.code,
      faultDescription:this.data.faultDescription,
      faultType:this.data.Checkboxs,
      picture:this.data.picture,
      terminalType:this.data.terminalType
    }
    app.ajax("/powerBank/app/user/insertRepair","post",data,(res)=>{
      console.log(res)
    })
  }
})