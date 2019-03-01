let app = getApp( )
Page({
  data:{
      unlocks:[1,0,0,0,0,0],
      unlocksIng:0,
      poup:false,
      showTop:false,
      n1:false,
      n2:false,
      mac:"",

      loanAdderss:"",
      loanDate:"",
      orderId:"",
      orderNumber:"",
      position:"",
      standard:"",

      dayMaxAmount:"",
      imgUrl:"",
      merchantsName:"",
      singleAmount:""
  },
  enDunlock:null,
  DunlockIng:null,
  onLoad(data){
    this.setData({
      mac:JSON.parse(data.data).code
    })
  },
  onReady(data){
    //加载完成
    // my.confirm({
    //   title:"已自动锁定",
    //   content:"未及时取走已自动锁定，请重新租借",
    //    confirmButtonText: '返回首页',
    //    cancelButtonText: '重新租借',
    //    success:(result)=>{
    //       console.log(result)
    //    }
    // })
    this.init( )
  },
  sub(){
    this.unlock( );
    app.ajax("/powerBank/app/user/loanPowerBank","post",{cabinetMac:this.data.mac,terminalType:"1"},( res )=>{
     clearInterval(this.enDunlock);
      if(res.data.code===1000){
        let data = res.data.data;
        this.setData({
          loan_date:data.loan_date,
          loanAdderss:data.loanAdderss,
          loanDate:data.loanDate,
          orderId:data.orderId,
          orderNumber:data.orderNumber,
          position:data.position,
          standard:data.standard,

          showTop:true,
          poup:false,
          unlocks:[1,0,0,0,0,0],
          unlocksIng:0,
          n2:true
        })
      }else{
        this.setData({
            n2:false,
            unlocks:[1,0,0,0,0,0],
            poup:false,
        })
        my.alert({
          title:res.data.message,
        })
      }
    })
   
    // setTimeout(()=>{
    //   clearInterval(this.enDunlock);
    //   this.setData({
    //     showTop:true,
    //     poup:false,
    //     unlocks:[1,0,0,0,0,0],
    //     unlocksIng:0,
    //     n2:true
    //   })
    // },3000)
  },
  unlock(){
    this.setData({
      poup:true
    })
  let unlockIndex=0;
  let unlocksIng=0;
  this.enDunlock = setInterval(()=>{
      let data = this.data.unlocks;
      data[unlockIndex]=0;
      unlockIndex += 1
      if(unlockIndex>=6) unlockIndex=0;
      data[unlockIndex]=1;
      this.setData({
        unlocks:data
      })
    },500)
  this.DunlockIng= setInterval(()=>{
        unlocksIng++
        if(unlocksIng<98){
          this.setData({
            unlocksIng:unlocksIng
          })
        }else{
            unlocksIng = 98;
            this.setData({
            unlocksIng:unlocksIng
          })
          clearInterval(this.DunlockIng)
        }
    },30)
  },
  loan(){
    my.redirectTo({
      url:"../loan/loan?orderId="+this.data.orderId,
      success:()=>{
        my.setNavigationBar({
          title:"租用中",
        })
      }
    })
   // app.Nav("../loan/loan?orderId="+this.data.orderId,"租用中")
  },
  init(){
    app.ajax("/powerBank/app/user/getMerchantsByMac?cabinetMac="+this.data.mac,'get',null,(res)=>{
      if(res.data.code===1000){
        let _data = res.data.data;
        this.setData({
          dayMaxAmount:_data.dayMaxAmount,
          imgUrl:_data.imgUrl,
          merchantsName:_data.merchantsName,
          singleAmount:_data.singleAmount
        })
      }else{
        my.alert({
          title: res.data.message 
        });
      }
    })
  }
})