// pages/sentence/sentence/reviewback.js
var util = require('../../../utils/utils.js');
var Bmob = require('../../../utils/bmob.js');

const recorderManager = wx.getRecorderManager()

const innerAudioContext = wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
const innerAudioContext3 = wx.createInnerAudioContext()
Page({

  /**
   * Page initial data
   */
  data: {
    clip_list:[],
    page:1,
    limit:7,
    list:[]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    this.rdOralDatabase();

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
    var that = this;

    wx.showNavigationBarLoading()

    // this.onLoad(); //重新加载onLoad()
    setTimeout(function () {
      that.setData({
        page: 1,
        list: []
      })
      that.rdOralDatabase()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()

    }, 1500)
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.count > that.data.page * that.data.limit) {
      that.rdOralDatabase()
      that.setData({
        page: that.data.page + 1
      })
    }

    else {
      console.log("none")
    }

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  rdOralDatabase: function(){
    var that = this;
    var oralBase = Bmob.Object.extend("oral_database");
    var q = new Bmob.Query(oralBase);

    q.descending('createdAt');
    q.find({
      success: function (results) {
        console.log(results)
        for (var i = 0; i < Math.min(that.data.page * that.data.limit, results.length); i++) {
          console.log(that.data.page * that.data.limit)
          var object = results[i];
          that.data.list.push(results[i])
          console.log(results)
          var num = new Number()
          console.log(results.length)
          num = results.length
          console.log(num)
          




          that.setData({
            clip_list: that.data.list,
            // ongetUrl: imiturl,
            count: results.length

          })
        }
      },
      error: function (error) {
        console.log(111)
      }

    }

    )
  },

  goStudy:function(event){
    var that=this
    // var date = new Date()
    // var cur_year = date.getFullYear()
    // var cur_month = date.getMonth() + 1
    // var cur_day = date.getDate()
    var day = that.data.list[event.currentTarget.dataset.index].day
    var month = that.data.list[event.currentTarget.dataset.index].month
    var year = that.data.list[event.currentTarget.dataset.index].year
    // this.onGetWord(day, month, year);
    // this.rdImDatabase(day, month, year);


  },

  


})