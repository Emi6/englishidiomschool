// pages/sentence/sentence.js
var util = require('../../../../utils/utils.js');
var Bmob = require('../../../../utils/bmob.js');

const recorderManager = wx.getRecorderManager()

const innerAudioContext = wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
const innerAudioContext3 = wx.createInnerAudioContext()
Page({

  /**
   * Page initial data
   */
  data: {


    playstatus_1: 0,
    playstatus_2: 0,
    // playstatus_3: [],
    updateTime: 0,
    onLike: false,
    showModalStatus: false,
    showUserStatus: false,
    onPraise: false,
    page: 1,
    limit: 5,
    list: [],
    praise_status: false




  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {


    // wx.stopPullDownRefresh()
   
    var cur_year = options.year
    var cur_month = options.month
    var cur_day = options.day
    console.log(cur_year)
    console.log(cur_month)
    console.log(cur_day)
    this.onGetWord(cur_day, cur_month, cur_year);
    this.rdImDatabase(cur_day, cur_month, cur_year);


    // this.onClipDuration(url)






    // this.onCheckdk(cur_day, cur_month, cur_year);
    this.setData({
      cur_year,
      cur_month,
      cur_day

    })
    innerAudioContext2.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext2.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    innerAudioContext2.onPause(() => {
      console.log('暂停播放')
    })
    innerAudioContext2.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    innerAudioContext2.onTimeUpdate((res) => {

      console.log(innerAudioContext2.currentTime)

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
    var that = this;

    wx.showNavigationBarLoading()

    // this.onLoad(); //重新加载onLoad()
    setTimeout(function () {
      that.setData({
        page: 1,
        list: []
      })
      that.rdImDatabase(that.data.cur_day, that.data.cur_month, that.data.cur_year)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()

    }, 1500)
    // this.rdImDatabase(that.data.day,that.data.month,that.data.year)
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.count > that.data.page * that.data.limit) {
      that.rdData(that.data.cur_day, that.data.cur_month, that.data.cur_year)
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

  onRecord: function () {
    var that = this;
    var currentUser = Bmob.User.current();
    console.log(currentUser)
    if (currentUser == null) {
      this.setData({
        showUserStatus: true
      });
    } else {

      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }
      recorderManager.start(options);
      recorderManager.onStart(() => {
        console.log('recorder start')
      });
      recorderManager.onError((res) => {
        console.log(res);
      })
    }

  },

  cancel: function () {
    var that = this
    this.setData({
      showUserStatus: false
    });
  },

  login: function () {
    var that = this
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
        that.setData({
          showUserStatus: false,

        })

      },
      fail: function (res) {
        console.log(22222)
        console.log('failed', res);
      },

    })




  },

  stopRecord: function () {
    var that = this
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath
      console.log('recorder stop', res)
      const { tempFilePath } = res
      console.log(tempFilePath)



      this.setData({
        showModalStatus: true,
        tempFilePath

      });












    })
  },

  upload: function () {
    var that = this
    var name = "audioFile.mp3";//上传的图片的别名，建议可以用日期命名
    var temp = this.data.tempFilePath
    var file = new Bmob.File(name, [temp]);
    file.save().then(function (res) {
      console.log(res.url());
      that.addToDatabase(res.url());
    }, function (error) {
      console.log(error);
    })
  },

  addToDatabase: function (url) {
    var that = this;

    var i1 = url.indexOf(".com/")

    url = url.substring(i1 + 5)
    console.log(url)

    var currentUser = Bmob.User.current();
    console.log(currentUser)
    console.log(currentUser.get("avatarUrl"))



    if (currentUser != null) {
      var date = new Date();
      var daka_year = date.getFullYear();
      var daka_month = date.getMonth() + 1;
      var daka_day = date.getDate();
      var imitate_database = Bmob.Object.extend("imitate_database");
      var q = new imitate_database();
      q.set("year", daka_year.toString())
      q.set("month", daka_month.toString())
      q.set("day", daka_day.toString())
      q.set("user", currentUser.get("nickName"))
      q.set("avatar", currentUser.get("userPic"))
      q.set("like_status", 'false')
      q.set("url", url)
      q.set("likenum", 0)

      q.save().then(function (result) {
        console.log("添加成功")

      },
        function (error) {
          console.log("添加失败")
        }
      )
    } else {
      console.log("users need to log in");
    }
    that.setData({
      showModalStatus: false
    });
  },

  onemore: function () {
    var that = this
    this.setData({
      showModalStatus: false
    });
  },

  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  onPlayRecord: function (url) {



    console.log("loops in onPlayRecord" + url)
    var that = this

    // var audio=wx.createInnerAudioContext()
    // audio.autoplay = true;
    var version = wx.getSystemInfoSync();
    console.log("当前基础库版本:" + version.SDKVersion);
    // audio.src = url;
    setTimeout(function () {

      console.log("playing")
      // innerAudioContext3.play()
      innerAudioContext.play()
    }, 30)

    // innerAudioContext.autoplay = true
    innerAudioContext.src = url,

      console.log("play" + url)





  },





  onStopRecord: function (url) {

    innerAudioContext.pause()





  },


  onPlayRecord2: function (url) {
    if (this.data.onCurrentTime === this.data.tTime) {
      var tempcur = new Number()
      tempcur = "0" + "0" + ":" + 0 + 0
      this.setData({
        onCurrentTime: tempcur,
        updateTime: 0
      }

      )
    }

    console.log(3333322222222)
    setTimeout(function () {
      innerAudioContext2.play()
    }, 30)
    var that = this
    // innerAudioContext2.play()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = that.data.src,
    innerAudioContext2.src = url,
      console.log(url)





  },



  onStopRecord2: function (url) {

    innerAudioContext2.pause()





  },

  onCheckStatus: function (event) {
    var that = this;
    var url = 'http://bmob-cdn-22880.bmobcloud.com/' + event.currentTarget.dataset.url



    var tempstatus = that.data.playstatus_1 + 1;
    console.log(tempstatus)
    if (tempstatus % 2 == 0) {

      this.onStopRecord(url);
      console.log(tempstatus)
      // this.onPlayRecord();
      this.setData({
        playstatus_1: tempstatus
      });

    }
    else {
      console.log(tempstatus)
      this.onPlayRecord(url);
      this.setData({
        playstatus_1: tempstatus
      });
    }
  },


  onCheckStatus2: function (event) {
    var that = this;
    var url = 'http://bmob-cdn-22880.bmobcloud.com/' + event.currentTarget.dataset.url



    var tempstatus = that.data.playstatus_2 + 1;
    console.log(tempstatus)


    if (tempstatus % 2 == 0) {
      this.onStopRecord2(url);

      that.onSecondFormatCur(that.data.updateTime)

      console.log(tempstatus)
      // this.onPlayRecord();
      this.setData({
        playstatus_2: tempstatus,


      });

    }
    else {
      console.log(tempstatus)
      this.onPlayRecord2(url);

      var interval = setInterval(function () {

        that.data.updateTime += 1
        console.log(that.data.updateTime)
        that.onSecondFormatCur(that.data.updateTime)

        if ((that.data.playstatus_2) % 2 == 0) {
          clearInterval(interval);
          console.log('停止')
          return
        }

        if (that.data.updateTime == Math.ceil(that.data.duration)) {
          clearInterval(interval);
          console.log('停止')
          that.setInit()
          return
        }
      }, 1000)

      // console.log(getUpdateTime)
      this.setData({
        playstatus_2: tempstatus,


      });
    }
  },



  onGetWord: function (day, month, year) {
    var that = this;
    var OralBase = Bmob.Object.extend("oral_database");
    var q = new Bmob.Query(OralBase);
    q.equalTo("day", day.toString())
    q.equalTo("month", month.toString())
    q.equalTo("year", year.toString())
    q.find({
      success: function (results) {
        console.log(results.length);
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var getSpeakUrl = new String();
          var getExplainUrl = new String();
          var getSentence = new String();
          var getCNtrans = new String();
          var getYear = new String();
          var getMonth = new String();
          var getDay = new String();
          var getTeacher = new String();
          var url = new String()
          var duration = new Number()
          var currentTime = new String()
          var getPraiseNum = new Number()
          var getAvatar=new String()

          currentTime = "0" + "0" + ":" + 0 + 0

          getSpeakUrl = object.get("speakurl")
          getExplainUrl = object.get("explainurl")
          getSentence = object.get("sentence")
          getCNtrans = object.get("CNtrans")
          getYear = object.get("year")
          getMonth = object.get("month")
          getDay = object.get("day")
          getTeacher = object.get("teacher")
          getPraiseNum = object.get("likenum")
          getAvatar = object.get("avatar")

          var getAvatarUrl = 'http://bmob-cdn-22880.bmobcloud.com/' + getAvatar
          url = 'http://bmob-cdn-22880.bmobcloud.com/' + getExplainUrl
          console.log(url)
          innerAudioContext2.src = url

          // innerAudioContext2.onCanplay(() => {
          //   setTimeout(function () {

          //     var duration
          //     console.log(innerAudioContext2.duration);
          //     duration = innerAudioContext2.duration;
          //     console.log(duration)
          //     that.onSecondFormat(duration)


          //   }, 100)})

          innerAudioContext2.onCanplay(() => {
            that.updateTime()


          })













          that.setData({
            ongetSpeakUrl: getSpeakUrl,
            ongetExplainUrl: getExplainUrl,
            onSentence: getSentence,
            onCNtrans: getCNtrans,
            onYear: getYear,
            onMonth: getMonth,
            onDay: getDay,
            onTeacher: getTeacher,
            onCurrentTime: currentTime,
            onPraiseNum: getPraiseNum,
            teacherAvatar: getAvatarUrl






          });
        }
      },
      error: function (error) {
        console.log(error)
      }
    })

  },


  updateTime: function () {

    var that = this;

    setTimeout(function () {

      var duration = innerAudioContext2.duration;

      console.log('时长' + duration)

      if (duration == 0) {

        that.updateTime();


      } else {

        that.onSecondFormat(duration)

      }

    }, 100);

  },




  onSecondFormatCur: function (s) {
    var t = new String();
    if (s > -1) {
      var min = Math.floor(s / 60);
      var sec = Math.ceil(s % 60);
      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;

    }



    this.setData({
      onCurrentTime: t,

    });

  },

  onSecondFormat: function (s) {
    var t = new String();
    if (s > -1) {
      var min = Math.floor(s / 60);
      var sec = Math.ceil(s % 60);
      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
      console.log("I am calculating the time" + t)

    }



    this.setData({
      tTime: t,
      duration: s
    });

  },


  setInit: function () {
    console.log('成功')
    var temp = new Number()
    temp = this.data.playstatus_2 + 1


    this.setData({
      playstatus_2: temp

    });
  },

  rdImDatabase: function (day, month, year) {

    var that = this;
    var like_status = []
    var playstatus_3 = []
    var imitBase = Bmob.Object.extend("imitate_database");
    var q = new Bmob.Query(imitBase);


    q.find({
      success: function (results) {
        for (var i = 0; i <= results.length; i++) {


          like_status[i] = false
          playstatus_3[i] = 0
          // like_status.push(false)

        }
        that.setData({
          like_status,
          playstatus_3

        })
      }
    })



    q.equalTo("day", day.toString())
    q.equalTo("month", month.toString())
    q.equalTo("year", year.toString())
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

          // var imiturl = new String()

          // imiturl = object.get("url")

          // console.log("播放网址为"+imiturl)
          // console.log("finish refreshing")



          that.setData({
            imitations: that.data.list,
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

  onImitation: function (event) {
    // var that = this;
    var url = 'http://bmob-cdn-22880.bmobcloud.com/' + event.currentTarget.dataset.imiturl
    console.log(url)
    var temp_imit = this.data.playstatus_3[event.currentTarget.dataset.index] + 1
    // var temp_imit = this.data.playstatus_3 + 1
    if (temp_imit % 2 == 0) {
      this.onStopRecord3(url);
      this.data.playstatus_3[event.currentTarget.dataset.index] = temp_imit
      this.setData({
        playstatus_3: this.data.playstatus_3
      });
    } else {
      this.onPlayRecord(url);
      console.log("onPlayRecord" + url)
      this.data.playstatus_3[event.currentTarget.dataset.index] = temp_imit
      this.setData({
        playstatus_3: this.data.playstatus_3
      });
    }




  },


  onStopRecord3: function (url) {

    innerAudioContext.stop()





  },

  clickLike: function (event) {
    var that = this;
    var imitBase = Bmob.Object.extend("imitate_database");
    var q = new Bmob.Query(imitBase);



    q.equalTo("clip_id", event.currentTarget.dataset.clipid)


    q.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(results)


          if (that.data.like_status[event.currentTarget.dataset.index] == false) {
            console.log("true")
            var templikenum = object.get("likenum") + 1


            // this.data.imitations[0].get("likenum")=templikenum
            //   console.log(this.data.imitations[0].get("likenum"))
            console.log(templikenum)
            object.set("likenum", templikenum)
            object.save()
            that.data.like_status[event.currentTarget.dataset.index] = true
            that.data.imitations[event.currentTarget.dataset.index].attributes.likenum = templikenum
            console.log(that.data.like_status[event.currentTarget.dataset.index])
            console.log(that.data.imitations)
            console.log(that.data.imitations[event.currentTarget.dataset.index].attributes.likenum)
            var t = true
            that.setData({
              onLike: t,
              like_status: that.data.like_status,
              imitations: that.data.imitations

            })


          } else {
            var templikenumm = object.get("likenum") - 1
            // this.data.imitations[0].get("likenum") = templikenum
            object.set("likenum", templikenumm)
            object.save()
            that.data.like_status[event.currentTarget.dataset.index] = false

            that.data.imitations[event.currentTarget.dataset.index].attributes.likenum = templikenumm

            var t = false
            that.setData({
              onLike: t,
              like_status: that.data.like_status,
              imitations: that.data.imitations


            })

          }


          // console.log(that.data.imitations[0].day)
          // that.rdlike(that.data.cur_day,that.data.cur_month,that.data.cur_year)


        }
      },
      error: function (error) {
        console.log("can't find the entry")
      }



    }

    )

    // setTimeout(function () {
    //   that.rdlike(that.data.cur_day, that.data.cur_month, that.data.cur_year)
    // },1000)


    console.log(this.data.imitations[0].get("likenum"))





  },

  rdlike: function (day, month, year) {
    var that = this;
    var imitBase = Bmob.Object.extend("imitate_database");
    var q = new Bmob.Query(imitBase);

    q.equalTo("day", day.toString())
    q.equalTo("month", month.toString())
    q.equalTo("year", year.toString())
    q.find({
      success: function (results) {
        that.setData({
          imitations: results

        })

      },
      error: function (error) {
        console.log("can't find the entry")
      }
    })

  },

  clickPraise: function (event) {
    var that = this;
    var day = event.currentTarget.dataset.day;
    var month = event.currentTarget.dataset.month;
    var year = event.currentTarget.dataset.year;
    var oralBase = Bmob.Object.extend("oral_database");
    var q = new Bmob.Query(oralBase);



    q.equalTo("day", day.toString())
    q.equalTo("month", month.toString())
    q.equalTo("year", year.toString())

    q.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(results)


          if (that.data.onPraise == false) {
            console.log("true")
            var templikenum = object.get("likenum") + 1



            console.log(templikenum)
            object.set("likenum", templikenum)
            object.save()




            that.setData({

              onPraise: true,
              onPraiseNum: templikenum,
              praise_status: true

            })


          } else {
            var templikenumm = object.get("likenum") - 1

            object.set("likenum", templikenumm)
            object.save()
            that.setData({

              onPraise: false,
              onPraiseNum: templikenumm,
              praise_status: false


            })

          }



        }
      },
      error: function (error) {
        console.log("can't find the entry")
      }



    }

    )











  },

  rdData: function (day, month, year) {
    var that = this;
    var imitBase = Bmob.Object.extend("imitate_database");
    var q = new Bmob.Query(imitBase);
    q.equalTo("day", day.toString())
    q.equalTo("month", month.toString())
    q.equalTo("year", year.toString())
    q.descending('createdAt');
    q.find({
      success: function (results) {
        for (var i = (that.data.page - 1) * that.data.limit; i < Math.min((that.data.page) * that.data.limit, that.data.count); i++) {



          var object = results[i];
          that.data.list.push(results[i])


          // var imiturl = new String()

          // imiturl = object.get("url")

          // console.log("播放网址为" + imiturl)




          that.setData({
            imitations: that.data.list,

            // ongetUrl: imiturl,
            // count: results.length

          })
        }
      },
      error: function (error) {
        console.log(111)
      }

    }

    )


  },

  reviewBack: function () {


  }





})

