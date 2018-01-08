// pages/choice_wyjf/choice_wyjf.js
Page({
  data: {
    PartyName: '',
    CompanyName: '',
    PartyMemberName: '',
    BillResult: [],
    BillAmount: [],
    amountSum: 0.00,
    isChoose: [],
    isChooseAll: 'circle'
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
          var is_choose = new Array()
          console.log(result)
          for (var i = 0; i < result.length; i++) {
            bill_amount.push(result[i].BillAmount)
            is_choose.push('circle')
            that.setData({
              BillAmount: bill_amount,
              isChoose: is_choose
            })
          }
          that.setData({
            BillResult: result,
          })
          wx.setStorage({
            key: 'BillResult',
            data: result,
          })
        } else {
          console.log('GetAllBill接口异常')
        }
      }
    })
  },
  chooseClick: function (e) {
    var index = e.currentTarget.dataset.index
    var choose_key = 'isChoose[' + index + ']'
    var sum1 = this.data.amountSum + this.data.BillAmount[index]
    var sum2 = this.data.amountSum - this.data.BillAmount[index]
    if (e.currentTarget.dataset.ischoose === 'circle') {
      this.setData({
        [choose_key]: 'success',
        amountSum: sum1
      })
      if (this.data.isChoose.indexOf('circle') === -1) {
        this.setData({
          isChooseAll: 'success'
        })
      }
    } else if (e.currentTarget.dataset.ischoose === 'success') {
      this.setData({
        [choose_key]: "circle",
        amountSum: sum2,
        isChooseAll: 'circle'
      })
    }
  },
  chooseAllClick: function (e) {
    var sum = 0
    if (e.currentTarget.dataset.ischooseall === 'circle') {
      this.setData({
        isChooseAll: 'success'
      })
      for (var i = 0; i < this.data.isChoose.length; i++) {
        var key = 'isChoose[' + i + ']'
        this.setData({
          [key]: 'success'
        })
      }
      for (var j = 0; j < this.data.BillAmount.length; j++) {
        sum = sum + this.data.BillAmount[j]
        this.setData({
          amountSum: sum
        })
      }
    } else if (e.currentTarget.dataset.ischooseall === 'success') {
      this.setData({
        isChooseAll: "circle",
        amountSum: 0.00
      })
      for (var i = 0; i < this.data.isChoose.length; i++) {
        var key = 'isChoose[' + i + ']'
        this.setData({
          [key]: 'circle'
        })
      }
    }
  },
  bindSubmit: function () {
    if (this.data.isChoose.indexOf('success') === -1) {
      wx.showModal({
        title: '提示',
        content: '请先选择账单',
        showCancel: false,
        confirmColor: '#3c95fe'
      })
    } else {
      var sel_arr = [], sel_index = [], sel_bill = []
      while (this.data.isChoose.indexOf('success', sel_arr.length) !== -1) {
        sel_arr.push(this.data.isChoose.indexOf('success', sel_arr.length))
      }
      for (var i = 0; i < sel_arr.length; i++) {
        if (sel_arr[i + 1] === sel_arr[i]) continue
        else {
          sel_index.push(sel_arr[i])
        }
      }
      for (var j = 0; j < sel_index.length; j++) {
        sel_bill.push(this.data.BillResult[sel_index[j]])
      }
      console.log(sel_bill)
      wx.setStorageSync('sel_bill', sel_bill)
      wx.navigateTo({
        url: '../dd-submit/dd-submit',
      })
    }
  }
})