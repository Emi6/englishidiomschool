// pages/material/material.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * Page initial data
   */
  data: {
    material:[],
    array:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that=this;
    this.rdDataBase();
   
    
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5c116c6ab45e5d3babb4fc8e/itsme/sharewithme",
    //   success:function(res){
    //     // console.log(res.data.data.bookList);
    //     console.log(res);
    //     that.setData({
    //       material:res.data.data.material,
    //       // id: res.data.data.material.bookList
    //     })
    //           }
    // })
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

  rdDataBase: function () {
    var that = this;
    var WordBase = Bmob.Object.extend("material_database");
    var q = new Bmob.Query(WordBase);
    // q.equalTo("Day", day.toString())
    // q.equalTo("Month", month.toString())
    // q.equalTo("Year", year.toString())
    q.find({
      success: function (results) {
        console.log(results)
        const s = new Set();
        

      
  
        // console.log(results.bookTypes);
        for (var i = 0; i < results.length; i++) {
         
          var object = results[i];

          var getBookType = new String();     
          var getBookNum = new String();    
       
  

        //   var getMonth = new String();
        //   var getDay = new String();
        //   var getNum = new String();

        //   var getSource = new String();

          // var getQuote = new String();
          getBookType = object.get("bookTypes")
          getBookNum = object.get("bookNum")
          console.log(getBookType)
          console.log(getBookNum)
          s.add(getBookType)
         
          
          console.log(s)
          var items = s;
          var array = Array.from(items);
          
          // console.log(array)

     
        //   getMonth = object.get("Month")
        //   getDay = object.get("Day")
        //   getQuote = object.get("Quote")
        //   getSource = object.get("Source")
        //   getNum = object.get("Num")
          that.setData({
           results,
           s,
           array,
           
          });
        }
      },
      error: function (error) {
        console.log(111)
      }
    })
    
    // this.checkNum(this.array)
  },

  // checkNum: function (array) {
  //   console.log(array)
  //   var l = new Array()
  //   for (var i = 0; i < array.length; i++) {
  //     q.equalTo("bookTypes", array[i].toString())
  //     q.find({
  //       success: function (results) {
  //         l.join(results.length)
  //         console.log(l)
  //       }
  //     })
  //   }
  // }
})



