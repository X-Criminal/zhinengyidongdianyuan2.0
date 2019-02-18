let app = getApp( );
Page({
  data:{
	 poup:false,
	 n2:false,
	 unlocks:[1,0,0,0,0,0],
    unlocksIng:0,
	 mac:"",
	 change:false,

	loan_date:"",
   loanAdderss:"",
   loanDate:"",
   orderId:"",
   orderNumber:"",
   position:"",
   standard:"",
  },
 onLoad(query){
	 this.setData({
		 mac:JSON.parse(query.data).code
	 })
 },
 Start(){
	 if(!this.data.change) return false;
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
	checkbox(value){
		this.setData({
			change:value.detail.value
		})
	}

})