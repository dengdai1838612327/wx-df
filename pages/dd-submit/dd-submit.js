// pages/dd-submit/dd-submit.js
Page({
  data: {
    PartyName: '',
    CompanyName: '',
    PartyMemberName: '',
    BillList: [],
    SubBillList: '',
    AmountSum: 0
  },
  onLoad: function () {
    this.setData({
      PartyName: wx.getStorageSync('PartyName'),
      CompanyName: wx.getStorageSync('CompanyName'),
      PartyMemberName: wx.getStorageSync('PartyMemberName'),
      BillList: wx.getStorageSync('sel_bill')
    })
    var sub_bill_list = []
    for (var index = 0; index < this.data.BillList.length; index++) {
      sub_bill_list[index] = new Object()
      sub_bill_list[index].BillSysNo = this.data.BillList[index].BillSysNo
      sub_bill_list[index].BillAmount = this.data.BillList[index].BillAmount
      sub_bill_list[index].BillName = this.data.BillList[index].BillName
      sub_bill_list[index].BillType = this.data.BillList[index].BillType
      sub_bill_list[index].ChargeItemName = this.data.BillList[index].ChargeItemName
      sub_bill_list[index].ChargeItemSysNo = this.data.BillList[index].ChargeItemSysNo
      sub_bill_list[index].PartyMemberSysNo = this.data.BillList[index].PartyMemberSysNo
      sub_bill_list[index].MerchantSysNo = this.data.BillList[index].MerchantSysNo
      sub_bill_list[index].OrganSysNo = this.data.BillList[index].OrganSysNo
    }
    this.setData({
      SubBillList: sub_bill_list
    })
    var amount_sum = 0
    for (var i = 0; i < this.data.BillList.length; i++) {
      amount_sum = amount_sum + this.data.BillList[i].BillAmount
    }
    this.setData({
      AmountSum: amount_sum
    })
  },
  submitBill: function () {
    var that = this
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/Bill.aspx',
      data: {
        Method: 'SubmitBill',
        BillAddress: that.data.PartyName + ' ' + that.data.CompanyName + '-' + that.data.PartyMemberName,
        BillData: JSON.stringify(that.data.SubBillList)
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status === 'ok') {
          wx.request({
            url: 'https://test99.allinpaymall.com/PartyTest/Bill.aspx',
            data: {
              Method: 'SubmitH5Order',
              UserId: '3627',//wx.getStorageSync('UserId')
              Mobile: '18221670642',//wx.getStorageSync('userMobile')
              ChannelSysNo: '18',//wx.getStorageSync('ChannelSysNo')
              BillData: res.data.Result
            },
            method: 'POST',
            success: function (getData) {
              if (getData.data.status === 'ok') {
                console.log(getData.data.Result)
                that.setData({
                  formData: getData.data.Result
                })
                formSubmit()
              } else {
                console.log(getData.data)
              }
            }
          })
        } else {
          console.log(res.data.message)
        }
      }
    })
  },
  formSubmit: function () {
    wx.request({
      url: 'http://test.allinpay.com/h5pay/index.do',
      data: {},
      method: 'POST',
      success: function (res) { }
    })
  }
})