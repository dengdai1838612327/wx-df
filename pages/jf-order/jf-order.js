// pages/dsorder/dsorder.js
Page({
  data: {
    order_list: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/AllOrder.aspx',
      data: {
        Method: 'GetOrderList',
        UserId: '3627',//wx.getStorageSync('UserId')
        BillType: 5
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.status === 'ok') {
          that.setData({
            order_list: JSON.parse(res.data.Result)
          })
        } else {
          console.log(res.data.message)
        }
      }
    })
  },
  onReady: function () {
  },
  bindDetail: function (e) {
    wx.setStorageSync('sel_order', e.currentTarget.dataset.orderid)
    wx.navigateTo({
      url: '../jfdetail/jfdetail',
    })
  }
})