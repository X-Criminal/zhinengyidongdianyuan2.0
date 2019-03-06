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
 onReady(){
	// this.getMerchantsByMac( )
	 this.getUserOrder( )
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
          orderId:data.id,
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
  getMerchantsByMac(){
	  app.ajax("/powerBank/app/user/getMerchantsByMac?cabinetMac="+this.data.mac,'get',null,(res)=>{
		  if(res.data.code===1000){
			  this.setData({
					dayMaxAmount:res.data.data.dayMaxAmount,
					imgUrl:res.data.data.imgUrl,
					merchantsName:res.data.data.merchantsName,
					singleAmount:res.data.data.singleAmount,
		  		})
		  }else{
			  my.alert({title:res.data.message})
			  console.log(res.data.message.indexOf('有订单未处理'))
			  if(res.data.message.indexOf('有订单未处理')>-1){
				  	app.Nav('../Order/Order','订单')
			  }
		  }
	  })
  },
  getUserOrder(){
	  app.ajax('/powerBank/app/user/getUserOrder','get',null,(res)=>{
		  if(res.data.code===3002){
			  	 my.alert({title:'您有未处理订单，请先处理！'})
				 app.Nav("../Order/Order",'订单')
			  	//有订单
		  }else if(res.data.code===3001){
			  	//没有订单
				  this.getMerchantsByMac(  )
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
		my.navigateBack({
			delta:2
		})
   //  my.redirectTo({
   //    url:"../loan/loan?queryIfLoanId="+this.data.orderId,
   //    success:()=>{
   //      my.setNavigationBar({
   //        title:"租用中",
   //      })
   //    }
   //  })
   // app.Nav("../loan/loan?orderId="+this.data.orderId,"租用中")
  },
	checkbox(value){
		this.setData({
			change:value.detail.value
		})
	}

})