//index.js
//获取应用实例
Page({
  data: {
    user_mobile: ''
  },
  onLoad: function () {
    this.setData({
      user_mobile: '18221670642'//wx.getStorageSync('userMobile')
    })
  }
})
