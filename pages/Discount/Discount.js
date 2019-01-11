let app = getApp( )
Page({
  data:{
    activeTab:0,
    tabs:[{title:"优惠劵"},{title:"商家卷"},{title:"失效优惠劵"}],
    arr:[[{}],[],[]],
    url:app.url
  },
  handleTabClick( e ){
    this.setData({
      activeTab:e.index
    })
    this.init(e.index)
  },
  activeTab2(e){
     this.setData({
      activeTab:e.index
    })
    this.init(e.index)
  },
  init(e){
    let data = {
      currPage:1,
      size:99,
      type:e+1
    }
    app.ajax("/powerBank/app/user/getCouponsByuserIdList","post",data,(res)=>{
      if(res.data.code===1000){
          let _data = this.data.arr;
          _data[e-1] = res.data.data;
          this.setData({
            arr:_data,
          })
      }
        console.log(res)
    })
  }
})