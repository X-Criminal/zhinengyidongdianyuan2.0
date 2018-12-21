Page({
  data:{
    imgUrls:[1,2,3,4]
  },
   onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
})