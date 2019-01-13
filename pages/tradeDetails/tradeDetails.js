let app = getApp( )
Page({
  data:{
    Lis:[ ],
  },
  currPage:1,
  onReady(){
    this.init( )
  },
  onReachBottom( ){
    this.currPage+=1;
      this.init( )
    },
  init(){
    app.ajax("/powerBank/app/user/getOrderByUidList","post",{size:10,currPage:this.currPage},(res)=>{
      if(res.data.code===1000){
        let Lis = this.data.Lis;
        let data = res.data.data;
        for(let i = 0;i<data.length;i++){
            data[i].createDate = app.formattingTime( data[i].createDate );
            Lis.push( data[i] )
        }
        this.setData({
          Lis:Lis
        })
      }
      console.log(res)
    })
  },
})