// pages/word/word.js
var util = require('../../utils/utils.js')
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * Page initial data
   */
  data: {
    imgurls: [
      "../../assets/images/word3.png",
      "../../assets/images/word2.png",
      "../../assets/images/word.png",
    ],
    current: 2,
    index: 0,
    status: false,
    
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var cur_day=date.getDate()
    this.onGetWord(cur_day,cur_month,cur_year);
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
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
  },

  onGetWord: function (day,month,year) {
    var that = this;
    // var currentUser = Bmob.User.current();
    var WordBase = Bmob.Object.extend("word_database");
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
          var getMonth= new String();
          var getDay = new String();
          var getNum = new String();
        var getTranslation = new String();
        var getWord = new String();
        var getParagraph = new String();
        var getSource = new String();
        var getCategory = new String();
        getYear = object.get("Year")
        getMonth = object.get("Month")
        getDay = object.get("Day")
        getWord = object.get("Word")
        getTranslation = object.get("Definition")
        getParagraph = object.get("Example")
        getSource = object.get("Source")
        getCategory = object.get("Tag")
        getNum = object.get("Num")
        that.setData({
          ongetWord: getWord,
          ongetTranslation: getTranslation,
          ongetParagraph: getParagraph,
          ongetSource: getSource,
          ongetCategory: getCategory,
          ongetYear: getYear,
          ongetMonth:getMonth,
          ongetDay:getDay,
          ongetNum:getNum
        });
        }
      },
      error: function (error) {
        console.log(111)
      }
    })
  },

  onGetCurWord: function (Num) {
    var that = this;
    // var currentUser = Bmob.User.current();
    var WordBase = Bmob.Object.extend("word_database");
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
          var getTranslation = new String();
          var getWord = new String();
          var getParagraph = new String();
          var getSource = new String();
          var getCategory = new String();
          getYear = object.get("Year")
          getMonth = object.get("Month")
          getDay = object.get("Day")
          getWord = object.get("Word")
          getTranslation = object.get("Definition")
          getParagraph = object.get("Example")
          getSource = object.get("Source")
          getCategory = object.get("Tag")
          getNum=object.get("Num")
          that.setData({
            ongetWord: getWord,
            ongetTranslation: getTranslation,
            ongetParagraph: getParagraph,
            ongetSource: getSource,
            ongetCategory: getCategory,
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
  
  onPullDownRefresh:function(){
    var that=this
    var cur_num = that.data.ongetNum-1
    // var cur_day=that.data.cur_day-1
    // var cur_month = that.data.cur_month 
    // var cur_year = that.data.cur_year
    var index=that.data.index+1
    wx.showNavigationBarLoading()
    setTimeout(function(){
      that.onGetCurWord(cur_num)
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
      that.setData({
        // cur_day,
        // cur_month,
        // cur_year,
        ongetNum: cur_num,
        index
      })
    },1500)
  },

  onReturnToday:function(){
    var that=this
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var cur_day = date.getDate()
    var index=0

    that.onGetWord(cur_day, cur_month, cur_year);
    that.setData({
      index
    })

  },

  onDaKa: function () {
    var that = this;
    var currentUser = Bmob.User.current();
    console.log(currentUser)
    var date = new Date();
    var daka_year = date.getFullYear();
    var daka_month = date.getMonth() + 1;
    var daka_day = date.getDate();
    var user_task = Bmob.Object.extend("user_task");
    var q = new user_task();
    q.set("Year", daka_year.toString())
    q.set("Month", daka_month.toString())
    q.set("Day", daka_day.toString())
    q.set("sss", currentUser.id)
    q.save().then(function (result) {
      console.log("添加成功")
    },
      function (error) {
        console.log("添加失败")
      }
    )
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    console.log(hour);
    console.log(minute);
    console.log(second);
    var time = date.getTime();
    console.log(time);

    var strtime = daka_year + '/' + daka_month + '/' + daka_day + ' ' + hour + ':' + (minute + 2) + ':' + second

    console.log(strtime);

    var strdate = new Date(strtime)
    var sttime = strdate.getTime();
    console.log(sttime)
    var diff = sttime - time
    console.log(diff)

    that.setData({
      status: true

    })

    setTimeout(function () {
      that.setData({
        status: false

      })

    }, diff)
  },

  onCheckdk:function(day,month,year){
    var that=this
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
      if(res.length!=0){
      var status = true
      that.setData({
        status
      }) 
      }
    });
  //   if (q.equalTo("sss", "==", currentUser.id) && q.equalTo("Day", "==", day.toString()) && q.equalTo("Month", "==", month.toString()) && q.equalTo("Year", "==",year.toString())){
  //     var status = true
  //     that.setData({
  //       status
  //     }) 
  //   }else{
  //     var status = false
  //     that.setData({
  //       status
  //     }) 

  //   }
  //   // console.log(that.data.status)
  }

})