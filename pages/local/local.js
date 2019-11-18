// pages/local/local.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localList:[
    ],
    localid:''
  },
  addLocal:function(){
    wx.navigateTo({
      url: '../addLocal/addLocal',
    })
  },
  del:function(e){
    var _this = this;
    var id = e.currentTarget.dataset.index;
    var localid = _this.data.localList[id].localid;
    wx.request({
      url: getApp().globalData.url + '/index/local/dellocal',
      data:{
        localid:localid
      },
      method:'POST',
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        wx.showToast({
          title: '删除成功',
        })
        _this.onShow();
      }
    })
  },
  edit:function(e){
    var _this = this;
    var id = e.currentTarget.dataset.index;
    var localid = _this.data.localList[id].localid;
    wx.setStorage({
      key: 'localid',
      data: localid,
    })
    wx.navigateTo({
      url: '../editLocal/editLocal',
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
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/local/getlocallist',
          data:{
            openid:openid
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res.data);
            _this.setData({
              localList:res.data
            })
            wx.hideLoading();
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