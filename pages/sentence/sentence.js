// pages/sentence/sentence.js
var util = require('../../utils/utils.js');
var Bmob = require('../../utils/bmob.js');

const recorderManager=wx.getRecorderManager()

const innerAudioContext =wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
Page({

  /**
   * Page initial data
   */
  data: {
    
    
    playstatus_1:0,
    playstatus_2:0 

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var date = new Date()
    var cur_year = date.getFullYear()
    var cur_month = date.getMonth() + 1
    var cur_day = date.getDate()
    this.onGetWord(cur_day, cur_month, cur_year);
    // this.onCheckdk(cur_day, cur_month, cur_year);
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

  start:function(){
    const options = {
      duration:10000,
      sampleRate:44100,
      numberOfChannels:1,
      encodeBitRate:192000,
      format:'aac',
      frameSize:50
          }
    recorderManager.start(options);
recorderManager.onStart(()=>{
  console.log('recorder start')
});
recorderManager.onError((res)=>
{
  console.log(res);
})      

  },

  stop:function(){
    recorderManager.stop();
    recorderManager.onStop((res)=>{
      this.tempFilePath=res.tempFilePath
      console.log('recorder stop',res)
      const{tempFilePath}=res
    })
  },

  play:function(){
    innerAudioContext.autoplay=true
    innerAudioContext.src = this.tempFilePath,
    innerAudioContext.onPlay(()=>{
      console.log('开始播放')
    })
    innerAudioContext.onError((res)=>{
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  onPlayRecord:function(url){
    console.log(22222222)
    var that=this
    innerAudioContext.play()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = that.data.src,
    innerAudioContext.src = url,
    console.log(url)
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    
    


  },

 

  onStopRecord: function (url) {

    innerAudioContext.pause()
  
    innerAudioContext.onPause(() => {
      console.log('暂停播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  
    
  },


  onPlayRecord2: function (url) {
    console.log(3333322222222)
    var that = this
    innerAudioContext2.play()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = that.data.src,
    innerAudioContext2.src = url,
      console.log(url)
    innerAudioContext2.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext2.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })




  },



  onStopRecord2: function (url) {

    innerAudioContext2.pause()

    innerAudioContext2.onPause(() => {
      console.log('暂停播放')
    })
    innerAudioContext2.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })



  },

  onCheckStatus:function(event){
    var that=this;
    var url = 'http://bmob-cdn-22880.b0.upaiyun.com/' + event.currentTarget.dataset.url
    if(event.currentTarget.dataset.type==1)
    {
 
    var tempstatus= that.data.playstatus_1+1;
    console.log(tempstatus)
    if(tempstatus%2==0){
      this.onStopRecord(url);
      console.log(tempstatus)
      // this.onPlayRecord();
      this.setData({
        playstatus_1: tempstatus
      });
   
    }
    else{
      console.log(tempstatus)
      this.onPlayRecord(url);
      this.setData({
        playstatus_1: tempstatus
      });

  
  
      
    }
    }
    else{
     
      var tempstatus = that.data.playstatus_2 + 1;
      console.log(tempstatus)
      if (tempstatus % 2 == 0) {
        this.onStopRecord2(url);
        console.log(tempstatus)
        // this.onPlayRecord();
        this.setData({
          playstatus_2: tempstatus
        });

      }
      else {
        console.log(tempstatus)
        this.onPlayRecord2(url);
        this.setData({
          playstatus_2: tempstatus
        });




      }

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
          var getSpeakUrl =new String();
          var getExplainUrl=new String();

          getSpeakUrl = object.get("speakurl")
          getExplainUrl = object.get("explainurl")
          
          that.setData({
            ongetSpeakUrl: getSpeakUrl,
            ongetExplainUrl: getExplainUrl,
           
          });
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  },
})

