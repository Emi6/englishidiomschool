// pages/material/booklist/bookdetail/bookdetail.js
Page({

  /**
   * Page initial data
   */
  data: {
    
    // bookList:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (params) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5c116c6ab45e5d3babb4fc8e/itsme/sharewithme",
      success: function (res) {
        // console.log(res.data.data.material[params.id].bookList[params.id].bookcontent);
        that.setData({
          bookcontent: res.data.data.material[params.id].bookList[params.id].bookcontent,
          bookimg: res.data.data.material[params.id].bookList[params.id].bookimg
        })
      }
    })


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

  }
})