Page({
  data: {
    party: '',
    company: '',
    department: '',
    memberName: ''
  },
  onLoad: function () {
    console.log(wx.getStorageInfoSync());
    this.setData({
      party: wx.getStorageSync('PartyName'),
      company: wx.getStorageSync('CompanyName'),
      department: wx.getStorageSync('DepartmentName'),
      memberName: wx.getStorageSync('PartyMemberName')
    })
  },
  bindWaiting: function () {
    wx.navigateTo({
      url: '../choice_jf/choice_jf',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})