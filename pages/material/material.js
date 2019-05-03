// pages/material/material.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * Page initial data
   */
  data: {
    boknum:[],
    z:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that=this;
    var z=[]
    this.rdDataBase();
 
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
    var newset = new Set();
    var array = []
 
    
    
    q.find({
      
      success: function (results) {
        console.log(results)
        
        for (var i = 0; i < results.length; i++) {
         
          var object = results[i];

          var getBookType = new String();     
          var getBookNum = new String();  
          var getBookImg = new String()  
       
          getBookType = object.get("bookTypes")
          getBookNum = object.get("bookNum")
          getBookImg=object.get("bookImg")
          console.log(getBookType)
          console.log(getBookNum)
          newset.add(getBookType)
         
          
          console.log(newset)
          var items = newset;
          array = Array.from(items);
          
          console.log(array)

          if (i == (results.length-1)){
            console.log(i)
            for (var t=0;t<array.length;t++){
            that.checknum(array[t])
            }
            
          }
  
          
          that.setData({
           results,
           newset,
          
           
          });
        
        

        }
        
      
      },
      error: function (error) {
        console.log(111)
      }
   
      
    },
  
 

    )
    
   
  

    
  },

  checknum: function(array){
    var that = this;
    var z=[]
    var WordBase = Bmob.Object.extend("material_database");
    var q = new Bmob.Query(WordBase);
    
    console.log(array)
    var boknum = []

    
      
      var t = q.equalTo("bookTypes", array) 
    
      console.log(array)
      t.find({
        success: function (results) {
          console.log(results)
          console.log(results[0].get("bookTypes"))
         
          console.log(results.length)

          var obj = {
            booktype: results[0].get("bookTypes"),
            booknum: results.length,
            bookimg: results[0].get("bookImg")
          }
          console.log(obj)

          that.data.z.push(obj)
         
          
          
          // console.log(Object.values(that.data.z))
          // console.log(Object.keys(that.data.z))
          var values = Object.keys(that.data.z).map(e => that.data.z[e])
          var byNum = values.slice(0)

          // var byNum = Object.values(that.data.z).slice(0);
          byNum.sort(function (a, b) {
            return b.booknum-a.booknum ;
          });
          console.log('by Num:');
          console.log(byNum);
      
          
          
         
          that.setData({
            z: that.data.z,
            byNum
          }) 
          
         
        }
         
         
        })
      
      
  },
 



 
  
  
})

// sort material

// https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value