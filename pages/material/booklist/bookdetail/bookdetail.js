// pages/material/booklist/bookdetail/bookdetail.js
var Bmob = require('../../../../utils/bmob.js');
Page({

  /**
   * Page initial data
   */
  data: {
    bookDetail:[]
    // bookList:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (params) {
    var that = this;
    this.rdBookDetail(params.bookname);
    




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

  rdBookDetail: function (name) {
    var that = this;
    var WordBase = Bmob.Object.extend("material_database");
    var q = new Bmob.Query(WordBase);
   
    q.equalTo("bookName", name)

    q.find({

      success: function (results) {
        console.log(results)

        that.setData({
          bookDetail: results
        })

      },
    })
  }
})