// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'mine',
  },
  handleClick:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  gotoLocal:function(){
    wx.navigateTo({
      url: '../local/local',
    })
  },
  gotoCollection:function(){
    wx.navigateTo({
      url: '../mineCollection/mineCollection',
    })
  },
  gotoReserve:function(){
    wx.navigateTo({
      url: '../mineReserve/mineReserve',
    })
  },
  gotoSend:function(){
    wx.navigateTo({
      url: '../mineSend/mineSend',
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
          url: getApp().globalData.url + '/index/user/getuser',
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
              userimg:res.data[0].userimg,
              username:res.data[0].username
            })
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