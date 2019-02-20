var util = require('../../../utils/utils.js')
var Bmob = require('../../../utils/bmob.js');
// pages/mine/mine.js
Page({

  /**
   * Page initial data
   */
  data: {

    days: [],
    count: 0,
    signUpMonth: [],
    signUpYear: [],
    signUpDay: [],
    daysArr: [],
    status: false,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var weeks_cn = ['日', '一', '二', '三', '四', '五', '六']
    // console.log(cur_year)
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.onGetSignUp();
    this.onJudgeTime();
    this.setData({
      cur_year,
      cur_month,
      weeks_cn,

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

  handleCalendar: function (e) {
    var handle = e.currentTarget.dataset.handle;
    if (handle == 'prev') {
      var newMonth = this.data.cur_month - 1;
      var newYear = this.data.cur_year;
      if (newMonth == 0) {
        var newMonth = 12;
        var newYear = newYear - 1
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
    }

    if (handle == 'next') {
      var newMonth = this.data.cur_month + 1;
      var newYear = this.data.cur_year;
      if (newMonth == 13) {
        var newMonth = 1;
        var newYear = newYear + 1
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
    }
    this.setData({
      cur_year: newYear,
      cur_month: newMonth

    })

  },

  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  calculateDays: function (year, month) {
    var that = this;
    var thisMonthDays = this.getThisMonthDays(year, month);
    for (var i = 1; i <= thisMonthDays; i++) {
      var myobj = {
        date: i,
        isSign: false
      }
      that.data.days.push(myobj);
    }
    this.setData({ days: that.data.days })
  },

  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  calculateEmptyGrids: function (year, month) {
    var that = this;
    that.setData({ days: [] });
    var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    for (var i = 0; i < firstDayOfWeek; i++) {
      var obj = {
        date: null,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });

  },

  onGetSignUp: function () {
    var that = this;
    var currentUser = Bmob.User.current();
    var task_user = Bmob.Object.extend("user_task");
    var q = new Bmob.Query(task_user);
    q.equalTo("sss", currentUser.id)
    q.find({
      success: function (results) {
        // console.log(results[0]);
        // console.log(results[1]);
        var signupmonth = new Array();
        var signupyear = new Array();
        var signupday = new Array();
        for (var i = 0; i < results.length; i++) {

          signupmonth[i] = results[i].get("Month");
          signupyear[i] = results[i].get("Year");
          signupday[i] = results[i].get("Day");


          that.setData({
            signUpMonth: signupmonth,
            signUpYear: signupyear,
            signUpDay: signupday,
            count: signupday.length,
          });


        }
        that.onJudgeSign();



      },
      error: function (error) {
      }
    })
  },
  onJudgeSign: function () {
    var that = this;
    var daysArr = that.data.days;
    for (var i = 0; i < that.data.signUpYear.length; i++) {
      var year = that.data.signUpYear[i];
      var month = that.data.signUpMonth[i];
      var day = that.data.signUpDay[i];
      for (var j = 0; j < daysArr.length; j++) {
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day) {
          daysArr[j].isSign = true;

        }
      }

      that.setData({ days: daysArr });

    }



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

  onJudgeTime: function () {
    var that = this;
    var date = new Date();
    var daka_year = date.getFullYear();
    var daka_month = date.getMonth() + 1;
    var daka_day = date.getDate();
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var time = date.getTime();
    var strtimemin = daka_year + '/' + daka_month + '/' + daka_day + ' ' + hour + ':' + (minute + 1) + ':' + second
    var strtimemax = daka_year + '/' + daka_month + '/' + daka_day + ' ' + hour + ':' + (minute + 2) + ':' + second


    var strdate = new Date(strtimemin);
    var sttime = strdate.getTime();
    var diff = sttime - date.getTime();
    console.log(diff)

    var strdate2 = new Date(strtimemax);
    var sttime2 = strdate2.getTime();
    var diff1 = sttime2 - date.getTime();
    console.log(diff1)

    setTimeout(function () {
      that.setData({
        status: true

      })

    }, diff)

    setTimeout(function () {
      that.setData({
        status: false

      })

    }, diff1)


  }




})