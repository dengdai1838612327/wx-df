// pages/myLife/myLife.js
Page({
  data: {
    msg_list: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/Home.aspx',
      data: {
        Method: 'GetAllLife',
        Sysno: '3627'//wx.getStorageSync('UserId')
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.status === 'ok' && res.data.Result !== '') {
          that.setData({
            msg_list: JSON.parse(res.data.Result)
          })
        }else{
          console.log(res.data.message)
        }
      }
    })
  },
  onReady: function () {

  }
})