let app = getApp( )
Page({
  data:{
    Lis:[],
    totalLoan:0,
    totalReturn:0,
  },
  onLoad(e){
    this.init( )
  },
  currPage:1,
  init( ){
    app.ajax("/powerBank/app/user/getOrderList","post",{size:5,currPage:this.currPage},(res)=>{
      if(res.data.code===1000){
        let app = [];
        for(let i = 0;i<res.data.data.length;i++){
          app.push(res.data.data)
        }
        this.setData({
          Lis:app,
          totalLoan:res.data.totalLoan,
          totalReturn:res.data.totalReturn
        })
      }else{
      
      }
    })
  },
  onReachBottom(){
    this.currPage+=1;
    this.init( )
  }
})