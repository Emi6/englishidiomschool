// pages/mine/feedbacks/feedbacks.js
var Bmob = require('../../../utils/bmob.js');
Page({

  /**
   * Page initial data
   */
  data: {
    submit_status: false,
  
   

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
 
 bindFormSubmit: function(e){
   var that=this
   var date = new Date()

   console.log(e.detail.value.textarea)
   that.setData({
      submit_status:true
   })

   var Feedback = Bmob.Object.extend("feedback_database");
   var feedback = new Feedback();
   // 添加数据，第一个入口参数是Json数据
   feedback.save({
     feedback: e.detail.value.textarea,
     
   }, {
       success: function (feedback) {
         // 添加成功
       },
       error: function (feedback, error) {
         // 添加失败
       }
     });
 }

  
})