// pages/wash/wash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    washtxt:'',
    current: 'tab1',
    current1:'wash',
    washList:[
    ]
  },
  inputWash:function(e){
    var _this = this;
    _this.setData({
      washtxt: e.detail.detail.value
    })
  },
  addWash:function(){
    this.setData({
      visible1:true
    })
  },
  enter:function(){
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/wash/addwash',
          data:{
            openid:openid,
            washintro:_this.data.washtxt,
            washstate:0
          },
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success:function(res){
            console.log(res.data);
            _this.setData({
              visible1:false
            })
            _this.onShow();
          }
        })
      },
    })
  },
  close:function(){
    this.setData({
      visible1:false
    })
  },
  handleChange1({ detail }) {
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
    } else if (detail.key == 'wash') {
      wx.redirectTo({
        url: '../wash/wash',
      })
    }

  },
  handleChange({ detail }) {
    var _this = this;
    _this.setData({
      current: detail.key
    });
    if(_this.data.current == 'tab2'){
      wx.request({
        url: getApp().globalData.url + '/index/wash/getwashlist',
        data: {
          washstate: 1
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          _this.setData({
            washList: res.data
          })
          for (let i = 0; i < res.data.length; i++) {
            wx.request({
              url: getApp().globalData.url + '/index/user/getcommentuser',
              data: {
                userid: res.data[i].userid
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data);
                let userimg = "washList[" + i + "].userimg";
                let username = "washList[" + i + "].username";
                _this.setData({
                  [userimg]: res.data[0].userimg,
                  [username]: res.data[0].username
                })
              }
            })
          }
        }
      })
    }else if(_this.data.current == 'tab1'){
      wx.request({
        url: getApp().globalData.url + '/index/wash/getwashlist',
        data: {
          washstate: 0
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          _this.setData({
            washList: res.data
          })
          for (let i = 0; i < res.data.length; i++) {
            wx.request({
              url: getApp().globalData.url + '/index/user/getcommentuser',
              data: {
                userid: res.data[i].userid
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data);
                let userimg = "washList[" + i + "].userimg";
                let username = "washList[" + i + "].username";
                _this.setData({
                  [userimg]: res.data[0].userimg,
                  [username]: res.data[0].username
                })
              }
            })
          }
        }
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
    wx.request({
      url: getApp().globalData.url + '/index/wash/getwashlist',
      data:{
        washstate:0
      },
      method:'POST',
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(res.data);
        _this.setData({
          washList:res.data
        })
        for(let i = 0; i < res.data.length; i++){
          wx.request({
            url: getApp().globalData.url + '/index/user/getcommentuser',
            data:{
              userid:res.data[i].userid
            },
            method:'POST',
            header:{
              'content-type': 'application/json'
            },
            success:function(res){
              console.log(res.data);
              let userimg = "washList[" + i + "].userimg";
              let username = "washList[" + i + "].username";
              _this.setData({
                [userimg]: res.data[0].userimg,
                [username]:res.data[0].username
              })
            }
          })
        }
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