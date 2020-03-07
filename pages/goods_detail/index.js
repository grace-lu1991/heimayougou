// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    detailInfo: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: '/goods/detail',
      data: {
        goods_id: options.keywords
      }
    }).then(res => {
      console.log(res)
      const {
        message
      } = res.data
      this.setData({
        detailInfo: message
      })
      console.log(this.data.detailInfo)
    })
  },
  //切换tab栏点击事件
  clickTab(e) {
    console.log(e)
    this.setData({
      current: e.target.dataset.index
    })

  },
  handleToCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  clickAddcart() {
    //点击加入购物车需要将此商品详情本地存储
    //每次存储之前先获取本地商品，如果没有就是空数组
    const goods = wx.getStorageSync("goods") || [];
    //需要判断当前的商品是否已经在goods的数组中，存在就数量++
    //some 循环数组，return的结果，只要有一个就返回true，反之就是false
    const exit = goods.some(v => {
      const isExit = v.goods_id === this.data.detailInfo.goods_id;
      if (isExit) {
        v.number += 1;
        wx.showToast({
          title: '数量+1',
          icon: 'success',
          duration: 2000
        })
      }
      return isExit
    })
    //如果添加的商品数组中不存在
    if(!exit){
      goods.unshift({
        goods_id: this.data.detailInfo.goods_id,
        goods_name: this.data.detailInfo.goods_name,
        goods_price: this.data.detailInfo.goods_price,
        goods_small_logo: this.data.detailInfo.goods_small_logo,
        number:1,//先默认数量是1
        selct:true // 加入购物车默认是选中的状态
      });
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 2000
      })
    }
    wx.setStorageSync("goods", goods);
  }
})