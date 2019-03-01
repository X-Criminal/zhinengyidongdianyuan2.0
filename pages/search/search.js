Page({
  data:{
    valueText:"",
    isShow : false
  },
  /**获取用户输入数据 Start*/
  getText(e){
    console.log(e.detail.value)
    this.setData({
      valueText:e.detail.value
    })
    if(e.detail.value.length>0){
        this.setData({
          isShow:true
        })
    }else{
      this.setData({
          isShow:false
        })
    }
  },
  //删除输入框
  onDele(){
    this.setData({
       valueText:"",
       isShow:false
    })
  },
  //开始搜索
  onData(){
    if(this.Data.isShow) return false;

  },
  //取消搜索
  onReturn(){
     my.navigateTo({
      url:'../index/index',
    })
  },
  /**获取用户输入数据 End*/
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onData(){
    my.chooseLocation({
      success(res){
        console.log(res)
      }
    })
  }
})