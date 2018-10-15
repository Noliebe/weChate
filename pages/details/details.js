var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      { thumb: '../../images/banner_1.jpg' },
      { thumb: '../../images/banner_2.jpg' },
      { thumb: '../../images/banner_3.jpg' },
      { thumb: '../../images/banner_4.jpg' }
    ]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.yUrl + 'Api/Index/goods' + '?appid=' + options.appid + '&id=' + options.id,
      success: function (res) {
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
  },
})