// pages/word/word.js
var util = require('../../utils/utils.js');
var Bmob = require('../../utils/bmob.js');
const innerAudioContext = wx.createInnerAudioContext();

Page({

  /**
   * Page initial data
   */
  data: {
    
    index: 0,
    status: false,
    showModalStatus: false,
    
    
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
    var WordBase = Bmob.Object.extend("word_database");
    var q = new Bmob.Query(WordBase);
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
    var WordBase = Bmob.Object.extend("word_database");
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
    var index=that.data.index+1
    wx.showNavigationBarLoading()
    setTimeout(function(){
      that.onGetCurWord(cur_num)
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
      that.setData({
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

  onDaKa: function (e) {
    var that = this;
    var currentUser = Bmob.User.current();
    console.log(currentUser)
    if (currentUser!=null){
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
    }else{
      this.powerDrawer(e)
      console.log(111)
    }
  },

  onCheckdk:function(day,month,year){
    var that=this
    var currentUser = Bmob.User.current();
    if (currentUser!=null){
    var usertask = Bmob.Object.extend("user_task");
    var q = new Bmob.Query(usertask);
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
    }
  },

  popwindow: function () {
    wx.showModal({ title: '提示', content: '这是一个实例', success: function (res) { if (res.confirm) { console.log('用户点击确认') } } })

  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    console.log(currentStatu)
    this.util(currentStatu)
  },

  util: function (currentStatu) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });

    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)


    if (currentStatu == "close") {
      this.setData(
        {
          showModalStatus: false
        }
      );
    }





    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }


      );

    }
  },

  playaudio:function(){
    var that=this;
    // innerAudioContext.src = "http://media.shanbay.com/audio/us/{{that.data.ongetWord}}.mp3";
    console.log(innerAudioContext.src)
    const b = that.data.ongetWord
    const url ='http://media.shanbay.com/audio/us/'+b+'.mp3'
    innerAudioContext.src =url
    console.log(that.data.ongetWord)
    innerAudioContext.play();
  }

})