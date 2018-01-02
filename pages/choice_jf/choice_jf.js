// pages/choice_wyjf/choice_wyjf.js
Page({
  data: {
    PartyName: '',
    CompanyName: '',
    PartyMemberName: '',
    BillResult: [],
    BillAmount: [],
    amountSum: 0.00,
    isChoose: ["circle", "success"]
  },
  onLoad: function () {
    this.setData({
      PartyName: wx.getStorageSync('PartyName'),
      CompanyName: wx.getStorageSync('CompanyName'),
      PartyMemberName: wx.getStorageSync('PartyMemberName')
    })
    var that = this;
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/Bill.aspx',
      data: {
        Method: 'GetAllBill',
        PartyMemberSysNo: wx.getStorageSync('PartyMemberSysNo')
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status === 'ok') {
          var result = JSON.parse(res.data.Result)
          var bill_amount = new Array()
          console.log(result)
          for (var i = 0; i < result.length; i++) {
            bill_amount.push(result[i].BillAmount)
            that.setData({
              BillAmount: bill_amount
            })
          }
          that.setData({
            BillResult: result
          })
        } else {
          console.log('GetAllBill接口异常')
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  chooseClick: function (e) {
    this.setData({
      isChoose: this.data.isChoose.reverse()
    })
    var sum = 0;
    for (var j = 0; j < this.data.BillAmount.length; j++) {
      sum = sum + this.data.BillAmount[j]
      this.setData({
        amountSum: sum
      })
    }
  },
  chooseAllClick: function (e) {
    var sum = 0;
    for (var j = 0; j < this.data.BillAmount.length; j++) {
      sum = sum + this.data.BillAmount[j]
      this.setData({
        amountSum: sum
      })
    }
    // if (this.data.isChooseAll == "success") {
    //   this.data.isChooseArr.forEach(function (e) {
    //     this.setData({
    //       e: "circle"
    //     })
    //   })
    //   this.setData({
    //     isChooseAll: "circle"
    //   })
    // } else if (this.data.isChooseAll == "circle") {
    //   this.data.isChooseArr.forEach(function (e) {
    //     this.setData({
    //       e: "success"
    //     })
    //   })
    //   this.setData({
    //     isChooseAll: "success"
    //   })
    // }
  },
  chooseAllClick: function (e) {
    // this.data.isChooseArr.forEach(function (item) {
    //   if (this.data.isChooseAll == "success") {
    //     this.setData({ isChooseAll: "circle" })
    //   } else if (this.data.isChooseAll == "circle") {
    //     this.setData({ isChooseAll: "success" })
    //   }
    // })
  }
})