let app = getApp( )
Page({
  data:{
    Lis:[ ]
  },
  onReady(){
      this.init()
  },

   insertCouponsUser(data){
     app.ajax("/powerBank/app/user/insertCouponsUser","post",{couponsId:data.currentTarget.dataset.ID},(res)=>{
       if(res.data.code===1000){
        //  let data = this.data.Lis;
        //  for(let i =0;i<data.length;i++){
        //    if(data[i].couponsId===data.currentTarget.dataset.ID){
        //      data[i].receiveState="1";
        //      this.setData({
        //        Lis:data
        //      })
        //    }
        //  }
         my.alert({
           title:"领取成功！"
         })
        this.init( )
       }else{
         my.alert({
           title:res.data.message
         })
       }
     })
   },

  init(){
    my.getStorage({
      key:"Category",
      success:(res)=>{
        let data = res.data;
        for(let i=0;i<data.length;i++){
          data[i].endDate=app.formattingTime(data[i].endDate)
        }
        this.setData({
          Lis:data
        })
      },
      fail:()=>{
        this._init( )
      }
    })
  },
  _init(){
     app.ajax("/powerBank/app/user/getCouponsByCategory","post",null,(res)=>{
      if(res.data.code===1000){
        let data = res.data.data;
        for(let i=0;i<data.length;i++){
          data[i].endDate=app.formattingTime(data[i].endDate)
        }
        this.setData({
          Lis:data
        })
      }
    })
  }
})