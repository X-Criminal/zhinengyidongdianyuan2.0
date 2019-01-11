Page({
  data:{
      unlocks:[1,0,0,0,0,0,0],
      unlocksIng:0,
      poup:false,
      showTop:false,
  },
  enDunlock:null,
  DunlockIng:null,
  onReady(){
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
  },
  sub(){
    this.unlock( );
    setTimeout(()=>{
      clearInterval(this.enDunlock);
      this.setData({
        showTop:true,
        poup:false,
      })
    },3000)
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
      if(unlockIndex>6) unlockIndex=0;
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
  }
})