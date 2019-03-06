let app = getApp( )
Page({
  data:{
    code:"",
   
    imgUrl:"",

    picture:"",
    code:"",
    Checkboxs:"",
    faultDescription:"",
    terminalType:"1",
    upData:['充电宝充电线损坏','机柜状态异常','二维码脱落','设备外观损坏','扫码后设备无反应','充电宝无法正常插入归还','订单计费异常','其他']
  },
  /**多选框 Start */
  onCheckBox(e){
    let arr = '';
    let data= e.detail.value;
    let upData = this.data.upData;
    for(let i = 0 ;i<data.length;i++){
      arr +=upData[ data[i]-1]+'、';
    }
    this.setData({
      Checkboxs:arr
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
                _this.setData({
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
            code:res.code.split("imei=")[1]
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
    };
	 if(data.cabinetMac.length<=0){
		 my.alert({
			 title:"请先扫描机柜二维码！"
		 })
		 return;
	 }
	 if(data.faultDescription.length<=0){
		 my.alert({
			 title:"请描述故障原因！"
		 })
		  return;
	 }
	 if(data.faultType.length<=0){
		 my.alert({
			 title:"请选择故障原因！"
		 })
		  return;
	 }
    app.ajax("/powerBank/app/user/insertRepair","post",data,(res)=>{
      if(res.data.code===1000){
        my.alert({
          title: '上报成功！',
          success(){
            my.navigateBack({
              delta:1
            })
          }
        });
      }else{
        my.alert({
          title: '请稍后再试！' 
        });
      }
    })
  }
})