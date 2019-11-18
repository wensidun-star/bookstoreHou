// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sv:'',
    bookList:[]
  },
  svInput:function(e){
    this.setData({
      sv:e.detail.value
    })
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
  search:function(){
    var _this = this;
    wx.showLoading({
      title: '正在查询',
    })
    wx.request({
      url: getApp().globalData.url + '/index/book/searchbook',
      data: {
        sv:_this.data.sv
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          bookList:res.data
        })
        wx.hideLoading();
      }
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