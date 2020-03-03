// pages/search/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    lastValue: '',
    recommned: [],
    loading: false,
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //页面加载需要将本地存储数据取出来
    let arr = wx.getStorageSync('history')
    //如果本地没有数据或者arr不是一个数组赋值空数组
    if (!Array.isArray(arr)) {
      arr = []
    }
    this.setData({
      history:arr
    })

  },
  bindinput(e) {
    // console.log(e)
    const {
      value
    } = e.detail
    this.setData({
      inputValue: value
    })
    this.getRecommend()

  },
  getRecommend() {
    if (this.data.loading === false) {
      this.setData({
        loading: true,
        lastValue : this.data.inputValue
      })
      request({
        url:'/goods/qsearch',
        data:{
          query: this.data.inputValue
        }
      }).then(res=>{
        console.log(res)
        const {message} = res.data
        this.setData({
          recommned:message,
          loading : false
        })
      })
      //需要判断输入框的value值跟请求的value值是否一致，不一致需要重新请求
      if (this.data.lastValue !== this.data.inputValue ){
        this.getRecommend()
      }
    }
  },
  //点击取消按钮，清空输入框跟推荐搜索
  cancleClick(){
    this.setData({
      inputValue :'',
      recommned:[]
    })
  },
  //输入框失焦时间
  blurInput(e){
    this.setData({
      recommned: []
    })
  },
  //按下回车按钮触发事件
  handleEnter(){
// 每次在存储数据之前需要将本地数据请求回来，避免后面数据覆盖
    let arr = wx.getStorageSync('history')
    //如果本地没有数据或者arr不是一个数组赋值空数组
    if(!Array.isArray(arr)){
       arr = []
    }
    arr.unshift(this.data.inputValue)
    console.log(arr)
    //数组去重
    arr = [...new Set(arr)]
    wx.setStorageSync('history',arr)
    //点击历史记录跳转
 
  },
  //清空历史记录
  handleClear(){
    this.setData({
      history: []
    })
    //还需要清空本地的历史数据
    wx.setStorageSync('history', [])
  }

})