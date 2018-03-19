// pages/jfdetail/jfdetail.js
Page({
  data: {
    order_id: '',
    order_amount: '',
    order_status: '',
    order_address: '',
    creat_time: '',
    order_items: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/AllOrder.aspx',
      data: {
        Method: 'GetOrderDetail',
        OrderId: wx.getStorageSync('sel_order')
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.status === 'ok') {
          var result = JSON.parse(res.data.Result)
          that.setData({
            order_id: result.OrderID,
            order_amount: result.ExpressOrderAmount,
            order_status: result.Status,
            order_address: result.OrderAddress,
            creat_time: result.CreatTime,
            order_items: JSON.parse(result.OrderItems)
          })
        } else {
          console.log(res.data.message)
        }
      }
    })
  },
  onReady: function () {
  }
})