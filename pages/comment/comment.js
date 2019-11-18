// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid:'',
    startIndex3:'',
    comment:''
  },
  handleClick:function(){
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
              url: getApp().globalData.url + '/index/comment/addcomment',
              data:{
                openid:openid,
                bookid:bookid,
                comment:_this.data.comment,
                rote:_this.data.starIndex3
              },
              method:'POST',
              header:{
                'content-type': 'application/json'
              },
              success:function(res){
                wx.showToast({
                  title: '提交评价成功',
                })
                wx.navigateBack({
                  
                })
              }
            })
          },
        })
      },
    })
  },
  comment:function(e){
    var _this = this;
    _this.setData({
      comment: e.detail.detail.value
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'orderid',
      success: function(res) {
        _this.setData({
          orderid:res.data
        })
      },
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
            'content-type': 'application/json'
          },
          success:function(res){
            console.log(res.data);
            _this.setData({
              bookname:res.data[0].bookname,
              bookimg:res.data[0].bookimg,
              bookprice:res.data[0].bookprice
            })
          }
        })
      },
    })
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