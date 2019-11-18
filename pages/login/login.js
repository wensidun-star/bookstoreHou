// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleClick:function(){
    var _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            //这里的that.globalData.url指的是服务器端的路径，可以直接改成自己的服务器路径，Wx_GetOpenidByCode指的是获取openid的方法名
            url: getApp().globalData.url + '/index/login/getuserinfo',
            data: {
              code: res.code
            },
            method:'GET',
            header:{
              'content-type': 'application/json' // 默认值
            },
            success: function (data) {
              //data即为返回的openid
              console.log(data)
              var openid = data.data;
              wx.setStorage({
                key: 'openid',
                data: data.data,
              })
              wx.request({
                url: getApp().globalData.url + '/index/login/iflogin',
                data:{
                  openid:openid
                },
                method:'POST',
                header:{
                  'content-type': 'application/json' // 默认值
                },
                success:function(res){
                  if(res.data == 0){
                    wx.getUserInfo({
                      success(res) {
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        console.log(userInfo);
                        wx.getStorage({
                          key: 'openid',
                          success: function (res) {
                            var openid = res.data;
                            wx.request({
                              url: getApp().globalData.url + '/index/login/adduser',
                              data: {
                                openid: openid,
                                username: nickName,
                                userimg: avatarUrl
                              },
                              method: 'POST',
                              header: {
                                'content-type': 'application/json' // 默认值
                              },
                              success: function (res) {
                                console.log(res);
                              }
                            })
                          },
                        })

                      }
                    })
                  }else{
                    wx.redirectTo({
                      url: '../home/home',
                    })
                  }
                }
              })
              
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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