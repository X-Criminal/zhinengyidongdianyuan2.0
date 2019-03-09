let app = getApp( )
Page({
  data:{  

  },
  type1:()=>{
    app.Nav("../problem/problem","常见问题")
  },
  type2:()=>{
    app.Nav("../service/service?index=i","关于我们")
  }
})