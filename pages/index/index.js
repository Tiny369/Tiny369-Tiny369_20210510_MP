// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'清醒的人',
    userInfo:{}
  },

  /*   
    handleParent (){
      console.log('parent');
    },
    handleChild (){
      console.log('child');
    }, 
  */
  
  // 点击按钮，路由跳转至List页面
  toList (){
    // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
    /*  
      wx.navigateTo({
        url:'/pages/list/list'
      }) 
    */
    wx.switchTab({
      url:'/pages/list/list'
    }) 


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送ajax请求，前后端交互
    // console.log('onLoad');
    // 获取data中的数据
    // console.log(this.data.msg); // this:当前页面的实例对象  
    // vue中：初始化数据被数据劫持代理给了实例对象  this.msg
    // 小程序中：data中的数据没有进行数据劫持和代理 this.data.msg
    
    // 修改状态数据
    // vue中修改:this.xxx = value
    // 小程序中修改: this.setData({msg:value})
    /* setTimeout(() => {
      this.setData({
        msg:'修改之后的数据'
      })  // 修改的动作：同步
      console.log(this.data.msg); 
    }, 3000); */

    // 获取用户信息
    wx.getUserInfo({
      success: (res) => {
        // console.log(res);
        this.setData({
          userInfo:res.userInfo
        })
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    })

  },

  // 点击获取用户信息
  handleGetUserInfo (res){
    // console.log(res);
    if(res.detail.userInfo){
      this.setData({
        userInfo:res.detail.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow');
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