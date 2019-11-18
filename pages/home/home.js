// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'homepage',
    imgUrls: [],
    bookList:[]
  },
  gotoSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  gotoInfo:function(e){
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
  handleChange({ detail }) {
    var _this = this;
    if (detail.key == 'homepage') {
      wx.redirectTo({
        url: '../home/home',
      })
    } else if (detail.key == 'category') {
      wx.redirectTo({
        url: '../store/store',
      })
    }
    else if (detail.key == 'mine') {
      wx.redirectTo({
        url: '../mine/mine',
      })
    }else if(detail.key == 'wash'){
      wx.redirectTo({
        url: '../wash/wash',
      })
    }

  },
  goCate:function(){
    wx.navigateTo({
      url: '../category/category',
    })
  },
  selectLearn:function(){
    wx.setStorage({
      key: 'category',
      data: 5,
    })
    wx.navigateTo({
      url: '../category/category',
    })
  },
  selectNovel: function () {
    wx.setStorage({
      key: 'category',
      data: 1,
    })
    wx.navigateTo({
      url: '../category/category',
    })
  },
  selectNotes: function () {
    wx.setStorage({
      key: 'category',
      data: 7,
    })
    wx.navigateTo({
      url: '../category/category',
    })
  },
  selectFamous: function () {
    wx.setStorage({
      key: 'category',
      data: 2,
    })
    wx.navigateTo({
      url: '../category/category',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: getApp().globalData.url + '/admin/banner/getbannerlist',
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          imgUrls:res.data
        })
      }
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
    var _this = this;
    wx.request({
      url: getApp().globalData.url + '/admin/book/getbooklist',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var bookList = res.data.splice(0,6);
        _this.setData({
          bookList: bookList
        })
      }
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