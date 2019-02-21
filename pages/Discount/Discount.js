let app = getApp( )
Page({
  data:{
    activeTab:0,
    tabs:[{title:"优惠劵"},{title:"商家劵"},{title:"失效优惠劵"}],
    arr:[[],[],[]],
    url:app.url
  },
  onLoad(){
    this.init( 0 )
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
          _data[e] = res.data.data;
          for(let i = 0 ;i<_data[e].length;i++){
              _data[e][i].endDate = app.formattingTime(_data[e][i].endDate);
          }
          this.setData({
            arr:_data,
          })
      }
    })
  },
  DetaIls(e){
    app.Nav("../discountDetaLis/discountDetaLis?couponsuseId="+e.currentTarget.dataset.couponsuseId,'优惠劵详情')
  }
})