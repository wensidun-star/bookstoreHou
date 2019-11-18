// pages/addLocal/addLocal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendname:'',
    sendphone:'',
    localname:''
  },
  sendname:function(e){
    var _this = this;
    _this.setData({
      sendname:e.detail.detail.value
    })
  },
  sendphone: function (e) {
    var _this = this;
    _this.setData({
      sendphone: e.detail.detail.value
    })
  },
  localname: function (e) {
    var _this = this;
    _this.setData({
      localname: e.detail.detail.value
    })
  },
  handleClick:function(){
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/local/addlocal',
          data:{
            openid:openid,
            sendname:_this.data.sendname,
            sendphone:_this.data.sendphone,
            localname:_this.data.localname
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res);
            wx.navigateBack({
            })
          }
        })
      },
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