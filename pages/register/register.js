//index.js
//获取应用实例
Page({
  data: {
    mobile: '',
    inputCode: '',
    sendCode: '',
    getCodeText: '获取验证码',
    buttonDisable: false,
    myOpenid: ''
  },
  onLoad: function () {
    wx.clearStorageSync();
  },
  mobileInputEvent: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeInputEvent: function (e) {
    this.setData({
      inputCode: e.detail.value
    })
  },
  getCode: function (e) {
    if (this.data.buttonDisable) return false;
    var mobile = this.data.mobile;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(mobile)) {
      wx.showModal({
        title: '提示',
        content: '手机号有误！',
        showCancel: false,
        confirmColor: '#3c95fe'
      })
      return false;
    }
    var that = this;
    wx.request({
      url: 'https://test99.allinpaymall.com/PartyTest/Home.aspx',
      data: {
        Method: 'GetCode',
        Mobile: mobile
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.status === 'ok') {
          that.setData({
            sendCode: res.data.Result
          })
          var c = 60;
          var intervalId = setInterval(function () {
            c = c - 1;
            that.setData({
              getCodeText: c + 's后重发',
              buttonDisable: true
            })
            if (c == 0) {
              clearInterval(intervalId);
              that.setData({
                getCodeText: '获取验证码',
                buttonDisable: false
              })
            }
          }, 1000)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            confirmColor: '#3c95fe'
          })
        }
      },
      fail: function (res) {
        alert('发生意外错误！')
      }
    })
  },
  bindLogin: function () {
    if (this.data.inputCode === this.data.sendCode) {
      var that = this;
      wx.login({
        success: function (res) {
          var code = res.code;
          if (code) {
            //发起网络请求
            wx.request({
              url: 'https://test99.allinpaymall.com/PartyTest/Weixin.aspx',
              data: {
                Method: 'GetOpenid',
                Code: code,
                WXPublicId: 'wxd23dfbc1b2bed503'
              },
              method: 'POST',
              success: function (getData) {
                if (getData.data.status === 'ok') {
                  that.setData({
                    myOpenid: JSON.parse(getData.data.Result).openid
                  });
                  wx.request({
                    url: 'https://test99.allinpaymall.com/PartyTest/Home.aspx',
                    data: {
                      Method: 'Register',
                      Mobile: that.data.mobile,
                      openid: that.data.myOpenid,
                      WXPublicId: 'wxd23dfbc1b2bed503'
                    },
                    method: 'POST',
                    success: function (res) {
                      if (res.data.status === 'ok') {
                        wx.setStorageSync('userMobile', that.data.mobile);
                        wx.setStorageSync('UserId', JSON.parse(res.data.Result).UserId);
                        wx.setStorageSync('ChannelSysNo', JSON.parse(res.data.Result).ChannelSysNo)
                        wx.switchTab({
                          url: '../index/index'
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: res.data.message,
                          showCancel: false,
                          confirmColor: '#3c95fe'
                        })
                      }
                    },
                    fail: function (res) {
                      alert('发生意外错误！')
                    }
                  })
                }
                else {
                  console.log(getData.data)
                }
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.data.message)
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '验证码有误！',
        showCancel: false,
        confirmColor: '#3c95fe'
      })
    }
  }
})
