// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:'',
    bookName:'',
    intro:'',
    rote:'',
    starIndex:'',
    commentList:[
    ],
    buyNum:1,
    bookprice:20,
    visible1:false,
    bookimg:'',
    ifCollection:false
  },
  collection:function(){
    var _this = this;
    if(_this.data.ifCollection == false){
      wx.getStorage({
        key: 'bookid',
        success: function(res) {
          var bookid = res.data;
          wx.getStorage({
            key: 'openid',
            success: function(res) {
              var openid = res.data;
              wx.request({
                url: getApp().globalData.url + '/index/collection/addcollection',
                data:{
                  bookid:bookid,
                  openid:openid
                },
                method:'POST',
                header:{
                  'content-type': 'application/json' // 默认值
                },
                success:function(res){
                  console.log(res);
                  wx.showToast({
                    title: '收藏成功',
                  })
                  _this.setData({
                    ifCollection: true
                  })
                }
              })
            },
          })
        },
      })
    }else{
      wx.getStorage({
        key: 'bookid',
        success: function (res) {
          var bookid = res.data;
          wx.getStorage({
            key: 'openid',
            success: function (res) {
              var openid = res.data;
              wx.request({
                url: getApp().globalData.url + '/index/collection/delcollection',
                data: {
                  bookid: bookid,
                  openid: openid
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log(res);
                  if(res.data == 1){
                    wx.showToast({
                      title: '取消收藏成功',
                    })
                    _this.setData({
                      ifCollection:false
                    })
                  }
                  
                }
              })
            },
          })
        },
      })
    }
  },
  send:function(){
    wx.navigateTo({
      url: '../buy/buy',
    })
  },  
  handleChange1({ detail }) {
    var _this = this;
    _this.setData({
      buyNum: detail.value,
      bookprice:_this.data.price * detail.value
    })
  },
  reverse:function(){
    this.setData({
      visible1: true
    });
  },
  enter:function(){
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        wx.getStorage({
          key: 'bookid',
          success: function(res) {
            var bookid = res.data;
            wx.request({
              url: getApp().globalData.url + '/index/reserve/addreserve',
              data:{
                bookid:bookid,
                openid:openid,
                reversenum: _this.data.buyNum
              },
              method:'POST',
              header:{
                'content-type': 'application/json' // 默认值
              },
              success:function(res){
                console.log(res.data);
                if(res.data == 1){
                  wx.showToast({
                    title: '预订成功',
                  })
                  _this.setData({
                    visible1: false
                  })
                }else{
                  wx.showToast({
                    title: '预定失败',
                    icon:'none'
                  })
                  _this.setData({
                    visible1: false
                  })
                }
              }
            })
          },
        })
      },
    })
  },
  cancel:function(){
    this.setData({
      visible1: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    wx.showLoading({
      title: '正在请求',
    })
    wx.getStorage({
      key: 'bookid',
      success: function(res) {
        var bookid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/book/getbookinfo',
          data:{
            bookid:bookid
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res.data);
            _this.setData({
              bookName:res.data[0].bookname,
              price:res.data[0].bookprice,
              intro:res.data[0].comment,
              rote:res.data[0].rote,
              starIndex:res.data[0].rote,
              bookimg:res.data[0].bookimg
            })
            wx.getStorage({
              key: 'openid',
              success: function(res) {
                var openid = res.data;
                wx.request({
                  url: getApp().globalData.url + '/index/collection/ifcollection',
                  data: {
                    bookid: bookid,
                    openid:openid
                  },
                  method:'POST',
                  header:{
                    'content-type': 'application/json' // 默认值
                  },
                  success:function(res){
                    if(res.data == null){
                      _this.setData({
                        ifCollection:false
                      })
                    }else{
                      _this.setData({
                        ifCollection:true
                      })
                    }
                    wx.hideLoading();
                  }
              })
              },
            })
            
          }
        })
      },
    })
    wx.getStorage({
      key: 'bookid',
      success: function(res) {
        var bookid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/comment/getcommentlist',
          data:{
            bookid:bookid
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            _this.setData({
              commentList: _this.data.commentList.concat(res.data),
            })
            for (let i = 0; i < res.data.length; i++) {
              console.log(1);
              wx.request({
                url: getApp().globalData.url + '/index/user/getcommentuser',
                data: {
                  userid: res.data[i].userid
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log(res.data);
                  let userimg = "commentList[" + i + "].userimg";
                  let username = "commentList[" + i + "].username"
                  _this.setData({
                    [userimg]: res.data[0].userimg,
                    [username]: res.data[0].username,
                  })
                }
              })
            }
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})