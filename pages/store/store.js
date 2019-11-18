const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [],
    curNav: 1,
    curIndex: 0,
    bookList:[],
    current: 'category',
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
  //事件处理函数  
  switchRightTab: function (e) {
    var _this = this;
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
      console.log(id);
    // 把点击到的某一项，设为当前index  
    _this.setData({
      curNav: id,
      curIndex: index
    })
    wx.request({
      url: getApp().globalData.url + '/index/book/getbooklist',
      data: {
        categoryid: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          bookList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/admin/category/getcatelist',
      method:'POST',
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        _this.setData({
          cateItems:res.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/index/book/getbooklist',
      data: {
        categoryid: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          bookList: res.data
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