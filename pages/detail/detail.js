// pages/detail/detail.js
// 引入自定义数据
let detailDataArray = require('../../datas/list-data.js')

// 获取全局App的实例
let appInstance = getApp()
// console.log(appInstance);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始对象
    detailObj: {},
    // 是否收藏，初始状态为false未收藏
    isColleced:false,
    // 是否播放音乐，初始状态为false未播放
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收url的query传的参数
    let index = options.index
    // 更新detailObj的状态数据
    this.setData({
      detailObj:detailDataArray.list_data[index],
      index
    })
    // 读取本地缓存的收藏状态数据
    let oldStorage = wx.getStorageSync('isColleced')
    if(oldStorage[index]){
      // 更新状态数据
      this.setData({
        isColleced: oldStorage[index]
      })
    }

    // 处理音乐播放的状态
    let { isPlay,pageIndex } = appInstance.globalData
    if(isPlay && pageIndex === index){
      // 修改音乐播放的状态为true
      this.setData({
        isMusicPlay:true
      })
    }

    // 监听音乐停止事件
    wx.onBackgroundAudioStop(()=>{
      console.log('音乐停止');
      this.setData({
        isMusicPlay: false
      })
      appInstance.globalData.isPlay = false
    })

  },

  // 是否收藏的点击事件函数
  handleCollection (){
    let isColleced = !this.data.isColleced
    // 切换收藏的状态
    this.setData({
      isColleced
    })
    // 文字提示
    wx.showToast({
      title: isColleced ? '收藏成功' : '取消收藏'
    })
    // 将收藏的状态存储到本地
    // 问题:多个页面共享一个状态数据
    // wx.setStorageSync('iscollected', isCollected)
    // 解决思路: 添加状态的同时添加页面标识
    // 对象: {0: true, 2: false, 3: true}
    let index = this.data.index
    // 收藏的状态永远只有一个键值对
    // let obj = {}
    // 解决思路，获取之前的收藏的对象
    let obj = wx.getStorageSync('isColleced') || {}
    // 判断obj是否有值
    // obj = obj ? obj : {}
    // 给对象添加键值对
    obj[index] = isColleced
    wx.setStorageSync('isColleced', obj)
  },

  // 音乐是否播放的点击事件函数
  handleMusicPlay (){
    // wx.onBackgroundAudioStop(function callback)  每次点击都会触发，没有必要把音乐停止的监听放在这里
    let isMusicPlay = !this.data.isMusicPlay
    // 点击时的状态切换
    this.setData({
      isMusicPlay
    })
    // 解构获取数据中的音乐外链和标题和图片
    let { dataUrl,title,coverImgUrl } = this.data.detailObj.music
    if(isMusicPlay){  // 音乐播放
      // 音乐播放api
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
      // 将当前播放的状态存入全局的实例中
      appInstance.globalData.isPlay = true 
      appInstance.globalData.pageIndex = this.data.index
    }else{  // 音乐停止
      // 音乐停止api
      wx.stopBackgroundAudio()
      appInstance.globalData.isPlay = false
      // 播放时已经修改下标
      // appInstance.globalData.pageIndex = this.data.index
    }

    

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