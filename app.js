//app.js
App({
  onLaunch: function () {
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
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (data) {
              wx.showLoading({
                title: '正在登陆',
              })
              var openid = data.data;
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
                  if(res.data == 1){
                    wx.hideLoading();
                    wx.setStorage({
                      key: 'openid',
                      data: openid,
                    })
                    wx.redirectTo({
                      url: '../home/home',
                    })

                  }else{
                    wx.redirectTo({
                      url: '../login/login',
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
  globalData: {
    userInfo: null,
    url:'http://localhost:80/bookstore/public/index.php'
  }
})