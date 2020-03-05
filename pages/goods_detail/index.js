// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    detailInfo:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 request({
   url:'/goods/detail',
   data:{
     goods_id:options.keywords
   }
 }).then(res=>{
   console.log(res)
   const {message} = res.data
   this.setData({
     detailInfo : message
   })
   console.log(this.data.detailInfo)
 })
  },
  //切换tab栏点击事件
  clickTab(e){
    console.log(e)
  this.setData({
    current: e.target.dataset.index
  })
    
  }
})