
 let formattingTime= (item)=>{
    var date =new Date( item ) ;
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
  };

let _obj;
let billingTime = (startTime,endTime,obj)=>{
	 _obj  = obj;
	 if(!_obj.c) _obj.c = 0;
    let _startTime = startTime.getTime( );
    let _endTime = endTime.getTime( );
    let oneDay=86400000,//一天毫秒数
        Days=1,
        FA = 0,LA = 0;

     let StartY = startTime.getFullYear();//年
     let StartM = startTime.getMonth()+1;//月
     let StartD = startTime.getDate();//日
     let ML = new Date(StartY,StartM,0).getDate(); //租借月份最后

// /**开始时间  */

// /**结束时间  */
    let endY = endTime.getFullYear();//年
    let endM = endTime.getMonth()+1;//月
    let endD = endTime.getDate();//日
  /**获取租借第一天最晚时间 */
    let firstAay =new Date( StartY+"-"+StartM+"-"+StartD+" 23:59:59" )//第一天时间
    let lastDay = new Date( endY+"-"+endM+"-"+endD+" 23:59:59"  )//最后一天时间
    let firstAay_num = firstAay.getTime( );

   

    if(firstAay_num < endTime){
        if(StartM===endM&&endD-StartD<=1){
            FA = _endTime - _startTime;
            console.log( "次日归还" )
            return type3(FA,firstAay-_startTime);
        };
        if(StartM===endM){
            Days = endD - StartD+1;
           // Days =Math.ceil((_endTime -_startTime)/oneDay)+1;//使用天数
            FA = firstAay_num - _startTime;//第一天用时
            LA = (_endTime - _startTime) - ((Days-2)*oneDay) - FA;//最后一天使用时间
            console.log('当月多日归还');
            return type1(FA,LA,Days);
        };

        if(StartM!==endM){
            // Days =Math.ceil((_endTime -_startTime)/oneDay);//使用天数
            Days =ML-StartD+endD+1
            FA = firstAay_num - _startTime;//第一天用时
            LA = (_endTime - _startTime) - ((Days-2)*oneDay) - FA;//最后一天使用时间
            if(ML-StartD!==0){
                console.log('次月多日1')
                return type1(FA,LA,Days)
            }else if(endD!==1){
                console.log('次月多日2')
                return type1(FA,LA,Days)
            }else{
                console.log('次月次日');
                FA = _endTime - _startTime;
                return type2(FA,firstAay-_startTime)
            }
        }
        // if()||(StartM!==endM&&(ML-StartD===0&&endD!==1))){
        //     console.log('次日归还');
        // }else{
        //     console.log("多日归还")
        // }
        //隔天归还 
    }else{
      console.log("当天归还")
      return type3(_endTime - _startTime)
    }
  }

  let type1 = (time1,time2,num)=>{
	  let a = Math.ceil(((time1-_obj.c)/1000/60/60))*_obj.a;
	  if(a<=0) a=0;
	  if(a>=_obj.b) a= _obj.b;
	  let b = Math.ceil(((time2-_obj.c)/1000/60/60))*_obj.a;
	  if(b<=0) a=0;
	  if(b>=_obj.b) b = _obj.b;
	  let c = num*_obj.a;
	  let d;
	  if(time2<obj.c){
		  d=obj.c-time2;
	  }else{
		  d=0;
	  }
	  return{a:a + b + c,b:d} ;
  }
  let type2 = (time1,time2)=>{
      let a = time-time2;
		let one = (Math.ceil((time2 - _obj.c)/1000/60/60) - _obj.c)*_obj.a;
		if(one<=0) one = 0;
		if(one>=_obj.b) one = _obj.b;
		let two = (Math.ceil((a- _obj.c)/1000/60/60))*_obj.a;
		if(two<=0 ) two=0;
		if(two>=_obj.b) two = _obj.b;
		let b;
		if(a<_obj.c){
				b = _obj.c-a
		}else{
			   b = 0;
		}
		return {a:one + two,b:b }
    }
  let type3 = ( time ) =>{
		// let a = time-time2;
		// let one = (Math.ceil((time2 - _obj.c)/1000/60/60) - _obj.c)*_obj.a;
		// if(one<=0) one = 0;
		// if(one>=_obj.b) one = _obj.b;
		// let two = (Math.ceil((a- _obj.c)/1000/60/60))*_obj.a;
		// if(two<=0 ) two=0;
		// if(two>=_obj.b) two = _obj.b;
		// return one + two;
		if(time<_obj.c){
			return {a:0,b:_obj.c-time}
		}else{
			return {a:Math.ceil(time-_obj.c)/1000/60/60*_obj.a,b:0}
		}
  }
    
export {billingTime , formattingTime }
