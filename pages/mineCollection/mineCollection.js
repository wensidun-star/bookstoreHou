// pages/mineCollection/mineCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[]
  },
  gotoInfo: function (e) {
    var _this = this;
    var id = e.currentTarget.id;
    var bookid = _this.data.bookList[id].bookid;
    wx.setStorage({
      key: 'bookid',
      data: bookid,
    })
    wx.navigateTo({
      url: '../detail/detail',
    })
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
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/collection/getcollectionList',
          data:{
            openid:openid
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res.data);
            for(let i = 0 ; i < res.data.length ; i++){
              wx.request({
                url: getApp().globalData.url + '/index/book/getbookinfo',
                data:{
                  bookid:res.data[i]
                },
                method:'POST',
                header:{
                  'content-type': 'application/json' // 默认值
                },
                success:function(res){
                  console.log(res.data);
                  _this.setData({
                    bookList: _this.data.bookList.concat(res.data[0])
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