Page({
  data:{
    code:"",
    Checkboxs:[],
    imgUrl:"",
  },
  /**多选框 Start */
  onCheckBox(e){
    this.setData({
      Checkboxs:e.detail.value
    })
  }
   /**多选框 End */
})