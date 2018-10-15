var app = getApp();
Page({
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.d.yUrl + 'Api/Index/company' + app.d.appId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(' res', res);
        if (res.data.status == 1) {
          that.setData(res.data.data);
          that.setData({ a: that.data.com_position.slice(that.data.com_position.indexOf(',') + 1) });
          that.setData({ aa: that.data.com_position.slice(0, that.data.com_position.indexOf(',')) });//35.06344403936958
          var box = {};
          box.longitude = parseFloat(that.data.a);
          box.latitude = parseFloat(that.data.aa);//35.06344403936958
          box.height = '50';
          box.width = '50';
          box.iconPath = '../../images/gpsBtn.png';
          that.setData({mapData: [box]});
          that.setData({ mapShow: true })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      }
    });
    console.log('data', this.data);
  },
  data: {
    mapShow: false,
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.telephoneNumber //仅为示例，并非真实的电话号码
    })
  },
  copy: function(){
    wx.setClipboardData({
      data: this.data.url,
    })
  },
  go: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.aa),
      longitude: parseFloat(that.data.a),
      scale: 18,
      name: '华乾大厦',
      address: '金平区长平路93号'
    })
  },
  callFirm: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.com_phone
    })
  },
  callMe: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.com_mobile
    })
  },
  copyText: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.com_weixin,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            if (res.data == that.data.com_weixin) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  copyUrl: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.com_url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            if (res.data == that.data.com_url) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    })
  }
})