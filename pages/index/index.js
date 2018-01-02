// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    lifeContent: '',
    life_creatTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var PartyBranchSysNo;
    var partyInfo;
    var that = this;
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/Bill.aspx',
      data: {
        Method: 'GetAllParty',
        Mobile: '18221670642'//wx.getStorageSync('userMobile')
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.Result);
        if (res.data.status === 'ok') {
          partyInfo = JSON.parse(res.data.Result).Anonymous;
          for (var index in partyInfo) {
            PartyBranchSysNo = partyInfo[index].PartyBranchSysNo;
            var party = partyInfo[index].PartyName;
            var company = partyInfo[index].CompanyName;
            var department = partyInfo[index].DepartmentName;
            var memberName = partyInfo[index].PartyMemberName;
            var memberSysno = partyInfo[index].PartyMemberSysNo;
            wx.setStorageSync('PartyName', party)
            wx.setStorageSync('CompanyName', company)
            wx.setStorageSync('DepartmentName', department)
            wx.setStorageSync('PartyMemberName', memberName)
            wx.setStorageSync('PartyMemberSysNo', memberSysno)
          };
          wx.request({
            url: 'https://test99.allinpaymall.com/PartyTest/Home.aspx',
            data: {
              Method: 'GetAllAdv',
              Sysno: PartyBranchSysNo
            },
            method: 'POST',
            success: function (res) {
              if (res.data.status === 'ok') {
                console.log(res.data)
                var result = JSON.parse(res.data.Result)
                console.log(result.advlist)
                that.setData({
                  imgUrls: result.advlist
                })
              } else {
                console.log(res.data.message)
              }
            }
          })
          wx.request({
            url: 'https://test99.allinpaymall.com/PartyTest/Home.aspx',
            data: {
              Method: 'GetFristLife',
              Sysno: '3627'//wx.getStorageSync('UserId')
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data);
              that.setData({
                lifeContent: JSON.parse(res.data.Result).Content,
                life_creatTime: JSON.parse(res.data.Result).CreateTime
              })
            }
          })
        } else {
          alert('GetAllParty接口异常')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})