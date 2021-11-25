//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: []
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      }
    });

  }
});
