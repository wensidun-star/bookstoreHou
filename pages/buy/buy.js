var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// pages/buy/buy.js
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    buyNum:1,
    bookimg:'',
    bookprice:20,
    bookname:'小哥白尼',
    allPrice:'',
    sendprice:1,
    initPrice:20,
    username:'陈嘉兴',
    phone:'13931588603',
    local:'唐山市路北区和平里3号楼401',
    visible1: false
  },
  yes:function(){

    this.setData({
      visible1: true
    });
  },
  enter: function () {
    var _this = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        var openid = res.data;
        wx.getStorage({
          key: 'bookid',
          success: function (res) {
            var bookid = res.data;
            wx.request({
              url: getApp().globalData.url + '/index/order/addorder',
              data: {
                openid: openid,
                bookid: bookid,
                orderprice: _this.data.allPrice,
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data == 1) {
                  _this.setData({
                    visible1: false
                  })
                  wx.showToast({
                    title: '下单成功',
                  })
                }
              }
            })
          },
        })
      },
    })
  },
  cancel: function () {
    this.setData({
      visible1: false
    });
  },
  handleChange1({ detail }) {
    var _this = this;
    var num = detail.value;
    _this.setData({
      buyNum: num,
      bookprice:_this.data.initPrice * num,
    })
    _this.setData({
      allPrice: _this.data.bookprice + _this.data.sendprice
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    wx.getStorage({
      key: 'bookid',
      success: function(res) {
        var bookid = res.data;
        wx.request({
          url: getApp().globalData.url + '/index/book/getbookinfo',
          data:{
            bookid:bookid
          },
          method:'POST',
          header:{
            'content-type': 'application/json'
          },
          success:function(res){
            _this.setData({
              bookimg:res.data[0].bookimg,
              bookprice: res.data[0].bookprice,
              bookname: res.data[0].bookname,
              initPrice: res.data[0].bookprice,
              allPrice: res.data[0].bookprice + _this.data.sendprice
            })
          }
        })
      },
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
            'content-type': 'application/json'
          },
          success:function(res){
            console.log(res.data);
            _this.setData({
              username:res.data[1].sendname,
              phone:res.data[1].senphone,
              local:res.data[1].localname
            })
            qqmapsdk = new QQMapWX({
              key: 'APSBZ-KK3CQ-FPA5E-GVGT2-PY5BH-NZFTI'
            });
            //调用地址解析接口
            qqmapsdk.geocoder({
              //获取表单传入地址
              address: _this.data.local, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
              success: function (res) {//成功后的回调
                console.log(res);
                var res = res.result;
                var latitude = res.location.lat;
                var longitude = res.location.lng;
                //根据地址解析在地图上标记解析地址位置
                _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
                  markers: [{
                    id: 0,
                    title: res.title,
                    latitude: latitude,
                    longitude: longitude,
                    // iconPath: './resources/placeholder.png',//图标路径
                    width: 20,
                    height: 20,
                    // callout: { //可根据需求是否展示经纬度
                    //   content: latitude + ',' + longitude,
                    //   color: '#000',
                    //   display: 'ALWAYS'
                    // }
                  }],
                  poi: { //根据自己data数据设置相应的地图中心坐标变量名称
                    latitude: latitude,
                    longitude: longitude
                  }
                });
              },
              fail: function (error) {
                console.error(error);
              },
              complete: function (res) {
                console.log(res);
              }
            })
          }
        })
      },
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