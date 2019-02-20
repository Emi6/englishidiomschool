// pages/mine/mine.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  login: function () {
    wx.login({
      success: function (res) {
        console.log(11111);
        console.log('success', res);
        var user = new Bmob.User();
        user.loginWithWeapp(res.code).then(function (user) {
          if (user.get("nickName")) {
            wx.setStorageSync('openid', user.get('openid'))
          } else {
            
            wx.getUserInfo({
              success: function (result) {
                var userInfo = result.userInfo;
                console.log(userInfo);
                var nickName = userInfo.nickName;
                var avatarUrl = userInfo.avatarUrl;
                var language = userInfo.language;
                var u = Bmob.Object.extend("_User");
                var query = new Bmob.Query(u);
                query.get(user.id, {
                  success: function (result) {
                    result.set('nickName', nickName);
                    result.set('userPic', avatarUrl);
                    // result.set('openid', openid);
                    result.set('language', language);
                    result.save();
                  }
                })
              }, function(err) {
                console.log(err, 'errr');
              }
            })

          }

        })


      },
      fail: function (res) {
        console.log(22222)
        console.log('failed', res);
      },

    })

    


  },

  calendars: function (e) {
    wx.navigateTo({
      url: 'calendars/calendars'
    })
  },

  feedbacks:function(e){
    wx.navigateTo({
      url:'feedbacks/feedbacks'
    })
  }
})