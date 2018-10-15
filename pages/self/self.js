var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '爱多久啊可是的啦',
    subhead: 'Every girl was once an angel without tears',
    banner: [
      { thumb: '../../images/banner_1.jpg' },
      { thumb: '../../images/banner_2.jpg' },
      { thumb: '../../images/banner_3.jpg' },
      { thumb: '../../images/banner_4.jpg' }
    ]
  
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.d.yUrl + 'Api/Index/profile' + app.d.appId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //获取到的json数据
        if (res.data.status == 1) {
          that.setData(res.data.data);
          console.log(that.data);
          
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      }
    });
  }
})