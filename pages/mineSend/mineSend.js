// pages/mineSend/mineSend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    orderList:[]
  },
  comment:function(e){
    var _this = this;
    var id = e.currentTarget.dataset.index;
    var bookid = _this.data.bookList[id].bookid;
    var orderid = _this.data.bookList[id].orderid;
    wx.setStorage({
      key: 'orderid',
      data: orderid,
    })
    wx.setStorage({
      key: 'bookid',
      data: bookid,
    })
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  enter:function(e){
    var _this = this;
    var id = e.currentTarget.dataset.index;
    var orderid = _this.data.bookList[id].orderid;
    wx.request({
      url: getApp().globalData.url + '/index/order/editstate',
      data:{
        orderid:orderid,
        orderstate:1
      },
      method:'POST',
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.data);
        _this.onShow();
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
    var _this = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/order/getorder',
          data: {
            openid: openid
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            _this.setData({
              bookList: res.data
            })
            // for (let i = 0; i < res.data.length; i++) {
            //   console.log(1);
            //   wx.request({
            //     url: getApp().globalData.url + '/index/book/getbookinfo',
            //     data: {
            //       bookid: res.data[i].bookid
            //     },
            //     method: 'POST',
            //     header: {
            //       'content-type': 'application/json' // 默认值
            //     },
            //     success: function (res) {
            //       console.log(res.data);
            //       let book = "bookList[" + i + "].orderstate";
            //       let order = "bookList[" + i + "].orderprice";
            //       let id = "bookList[" + i + "].orderid"
            //       _this.setData({
            //         bookList: _this.data.bookList.concat(res.data[0]),
            //         [book]: _this.data.orderList[i].orderstate,
            //         [order]: _this.data.orderList[i].orderprice,
            //         [id]: _this.data.orderList[i].orderid
            //       })
                  
            //     }
            //   })
            // }
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