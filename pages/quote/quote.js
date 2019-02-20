// pages/quote/quote.js
var Bmob = require('../../utils/bmob.js');

Page({

  /**
   * Page initial data
   */
  data: {
    imgurls:[
      "../../assets/images/quote-detail3.png",
      "../../assets/images/quote-detail2.png",
      "../../assets/images/quote-detail.png",
    ],
    current:2,
    index:3,
    status:false

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var cur_day = date.getDate()
    this.onGetQuote(cur_day, cur_month, cur_year);
    this.onCheckdk(cur_day, cur_month, cur_year);
    this.setData({
      cur_year,
      cur_month,
      cur_day

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

  },
  onSlideChangeEnd: function(e){
    var that=this;
    that.setData({
      index:e.detail.current+1
    })
  },

  onGetQuote: function (day, month, year) {
    var that = this;
    // var currentUser = Bmob.User.current();
    var WordBase = Bmob.Object.extend("quote_database");
    var q = new Bmob.Query(WordBase);
    // q.equalTo("Day", day.toString());
    // // 查询所有数据
    // q.find({
    //   success: function (results) {
    //     console.log("共查询到 " + results.length + " 条记录");
    //     // 循环处理查询到的数据
    //     for (var i = 0; i < results.length; i++) {
    //       var object = results[i];
    //       console.log(object.id + ' - ' + object.get('Translation'));
    //     }
    //   },
    //   error: function (error) {
    //     console.log("查询失败: " + error.code + " " + error.message);
    //   }
    // });

    // console.log(day)
    // console.log(month)
    // console.log(year)
    q.equalTo("Day", day.toString())
    q.equalTo("Month", month.toString())
    q.equalTo("Year", year.toString())
    q.find({
      success: function (results) {
        console.log(results.length);
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var getYear = new String();
          var getMonth = new String();
          var getDay = new String();
          var getNum = new String();
        
          var getSource = new String();
         
          var getQuote=new String();
          getYear = object.get("Year")
          getMonth = object.get("Month")
          getDay = object.get("Day")
          getQuote = object.get("Quote")
          getSource = object.get("Source")
          getNum = object.get("Num")
          that.setData({
            ongetQuote: getQuote,
            ongetSource: getSource,
            ongetYear: getYear,
            ongetMonth: getMonth,
            ongetDay: getDay,
            ongetNum: getNum
          });
        }
      },
      error: function (error) {
        console.log(111)
      }
    })
  },

  onGetCurQuote: function (Num) {
    var that = this;
    var WordBase = Bmob.Object.extend("quote_database");
    var q = new Bmob.Query(WordBase);
    
    q.equalTo("Num", Num.toString())

    q.find({
      success: function (results) {
        console.log(results.length);
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var getYear = new String();
          var getMonth = new String();
          var getDay = new String();
          var getNum = new String();
          
          var getQuote = new String();
       
          var getSource = new String();
         
          getYear = object.get("Year")
          getMonth = object.get("Month")
          getDay = object.get("Day")
         
          getSource = object.get("Source")
          getQuote = object.get("Quote")
          getNum = object.get("Num")
          that.setData({
            
            ongetQuote: getQuote,
            ongetSource: getSource,
            ongetYear: getYear,
            ongetMonth: getMonth,
            ongetDay: getDay,
            ongetNum: getNum
          });
        }
      },
      error: function (error) {
        console.log(111)
      }
    })
  },

  onPullDownRefresh: function () {
    var that = this
    var cur_num = that.data.ongetNum - 1
    // var cur_day=that.data.cur_day-1
    // var cur_month = that.data.cur_month 
    // var cur_year = that.data.cur_year
    var index = that.data.index + 1
    wx.showNavigationBarLoading()
    setTimeout(function () {
      that.onGetCurQuote(cur_num)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      that.setData({
        // cur_day,
        // cur_month,
        // cur_year,
        ongetNum: cur_num,
        index
      })
    }, 1500)
  },

  onReturnToday: function () {
    var that = this
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var cur_day = date.getDate()
    var index = 0

    that.onGetQuote(cur_day, cur_month, cur_year);
    that.setData({
      index
    })

  },

  onCheckdk: function (day, month, year) {
    var that = this
    var currentUser = Bmob.User.current();
    var usertask = Bmob.Object.extend("user_task");
    var q = new Bmob.Query(usertask);
    // console.log(that.data.status)
    q.equalTo("sss", currentUser.id)
    q.equalTo("Day", day.toString());
    q.equalTo("Month", month.toString());
    q.equalTo("Year", year.toString());
    q.find().then(res => {
      console.log(res.length)
      if (res.length != 0) {
        var status = true
        that.setData({
          status
        })
      }
    });
    
  }


})