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
 
   
    // this.getNum();
   
    
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
    var newset = new Set();
    var array = []
 
    // q.equalTo("Day", day.toString())
    // q.equalTo("Month", month.toString())
    // q.equalTo("Year", year.toString())
    
    q.find({
      
      success: function (results) {
        console.log(results)
        // const s = new Set();
        

        
  
        // console.log(results.bookTypes);
        for (var i = 0; i < results.length; i++) {
         
          var object = results[i];

          var getBookType = new String();     
          var getBookNum = new String();  
          var getBookImg = new String()  
       
  

        //   var getMonth = new String();
        //   var getDay = new String();
        //   var getNum = new String();

        //   var getSource = new String();

          // var getQuote = new String();
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
            // that.checknum('雅思')
            // that.checknum('托福')
            // that.checknum('杂书')
          }
  
          // that.data.array.push(array)

          // var l=[5,4]
          // console.log(l)

          // var z = [{ booktype:array[0], booknum:l[0] }, { booktype:array[1], booknum:l[1]}]
          // console.log(z)


     
        //   getMonth = object.get("Month")
        //   getDay = object.get("Day")
        //   getQuote = object.get("Quote")
        //   getSource = object.get("Source")
        //   getNum = object.get("Num")
          that.setData({
           results,
           newset,
          //  array
          //  z
           
          });
        
        

        }
        // console.log(array)
        // that.checknum(array)
      
      },
      error: function (error) {
        console.log(111)
      }
   
      
    },
  
 

    )
    
   
  

    // console.log(this.data['array'])
    
    // return s
    // this.checkNum(this.array)

    
    // var items = this.data.s;
    // var array = Array.from(items);

    // console.log(array[1])

    // var l = [5, 4]
    // console.log(l)

    // var z = [{ booktype: array[0], booknum: l[0] }, { booktype: array[1], booknum: l[1] }]
    // console.log(z)
    // that.setData({
    //   z
    // })

  },

  checknum: function(array){
    var that = this;
    var z=[]
    var WordBase = Bmob.Object.extend("material_database");
    var q = new Bmob.Query(WordBase);
    
    console.log(array)
    var boknum = []

    // while (i < array.length){
    // for(var i=0;i<array.length;i++){
      // console.log(array[i])
      
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
         
          
          // boknum.push(results.length)
          console.log(Object.values(that.data.z))
          console.log(Object.keys(that.data.z))

          var byNum = Object.values(that.data.z).slice(0);
          byNum.sort(function (a, b) {
            return b.booknum-a.booknum ;
          });
          console.log('by Num:');
          console.log(byNum);
      
          
          
          // that.data.boknum.push(results.length)
          that.setData({
            z: that.data.z,
            byNum
          }) 
          // that.getPaiXu(that.data.z)
         
        }
         
         
        })
      
      // console.log(that.data.boknum)
      // console.log(array)
      // that.mergebokdtl(array, boknum)
    // }

   
    // that.setData({
    //   boknum:boknum
    // });
    // console.log(boknum)
    // console.log(array)

    // that.mergebokdtl(array, boknum)
   
    // console.log(this.data.boknum)
    // console.log(array)

    // that.mergebokdtl(array, boknum)
   
  },
  // getPaiXu: function (z) {
  //   var t=[]



  // }
  
  
})

// sort material

// https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value