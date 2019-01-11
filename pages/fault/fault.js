let app = getApp( )
Page({
  data:{
    code:"",
    Checkboxs:[],
    imgUrl:"",

    picture:"",
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
  }
  /**拍照 End */
})