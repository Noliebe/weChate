var app = getApp();
Page({
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.yUrl + 'Api/Index/app' + app.d.appId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //获取到的json数据
        if (res.data.status == 1) {
          // console.log(that.data);
          var box = res.data.data.bgm;
          that.setData({musicSrc: box});
          that.audioCtx = wx.getBackgroundAudioManager('myAudio')
          that.audioCtx.src = that.data.musicSrc
          that.audioCtx.title = that.data.musicTitle
          that.audioCtx.epname = that.data.epname
          that.audioCtx.singer = that.data.author
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      }
    });
    wx.request({
      url: app.d.yUrl + 'Api/Index/index' + app.d.appId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //获取到的json数据
        if (res.data.status == 1) {
          // console.log(that.data);
          that.setData(res.data.data);
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
          });
        }
      }
    });
  },
  music:function(){
    this.data.muT = !this.data.muT;
    if (this.data.muT){
      this.audioCtx.pause();
      this.setData({muStyle: ''});      
    }else{
      this.audioCtx.play();
      this.setData({ muStyle: 'playM' });   
    }
  },
  inputValue: '',
  data: {
    muStyle: 'playM',
    yUrl: app.d.yUrl,
    appId: app.d.appId,
    muT: 'true',
    musicTitle: 'BackgroundMusic',
    epname: 'BackgroundMusic',
    author: '无名氏',
    paddingLeft: wx.getSystemInfoSync().windowWidth/10*7.6,
    musicSrc: '',
    banner: [
      { thumb: '../../images/banner_1.jpg'},
      { thumb: '../../images/banner_2.jpg'},
      { thumb: '../../images/banner_3.jpg'},
      { thumb: '../../images/banner_4.jpg'}
    ],
    glist: [{
      "id": "7",
      "type": "list",
      "content": "24963,23768,23515,23448",
      "displayorder": "3",
      "thumb": "../../images/banner_3.jpg",
      "pagesize": "4",
      "explain": null,
      "goodslist": [{
        "id": "23515",
        "thumb": "../../images/banner_1.jpg",
        "text": "433.00",
        }, {
          "id": "23515",
          "thumb": "../../images/banner_1.jpg",
          "text": "433.00",
        }, {
          "id": "23515",
          "thumb": "../../images/banner_1.jpg",
          "text": "433.00",
        }, {
          "id": "23515",
          "thumb": "../../images/banner_1.jpg",
          "text": "433.00",
        }, {
          "id": "23515",
          "thumb": "../../images/banner_1.jpg",
          "text": "433.00",
      }]
    }]
  }
})