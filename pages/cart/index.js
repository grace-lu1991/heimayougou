// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goods: [],
    totalPrice: 0,
    allCheck: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取本地的收货地址
    this.setData({
      address: wx.getStorageSync('address') || []
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //data和onload只执行一次，所以每次显示页面要获取本地地址
    this.setData({
      address: wx.getStorageSync('address') || []
    })
    // 需要获取商品详情本地数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });
    this.handleAllPrice()
  },
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: {
            name: res.userName,
            tel: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync('address', this.data.address);
      }
    })
  },
  cartChange(e) {
    const {
      index,
      number
    } = e.currentTarget.dataset;
    //数量会变化，但是页面数量不会变化
    this.data.goods[index].number += number
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          if (res.confirm) {
            this.data.goods.splice(index, 1)
          } else {
            this.data.goods[index].number += 1
          }
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }
    this.setData({
      goods: this.data.goods
    })
    //数量变化计算总价格
    this.handleAllPrice()
  },
  //点击选中按钮
  handleCheck(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const {
      selct
    } = this.data.goods[index]
    this.data.goods[index].selct = !selct
    this.setData({
      goods: this.data.goods
    })
    this.handleAllPrice()
    this.checkAllStatu()
  },
  //点击选中按钮时，全选按钮的状态
  checkAllStatu() {
    //先假设所有的商品都是选中状态
    let handleAllCheck = true
    this.data.goods.forEach(v => {
      if (handleAllCheck === false) {
        return
      }
      if (v.selct === false) {
        handleAllCheck = false
      }
      this.setData({
        allCheck: handleAllCheck
      })
    })
  },
  //点击全选按钮
  handleAllCheck() {
    const {allCheck} = this.data
    //每个商品的按钮被选
    this.data.goods.forEach(v=>{
      v.selct = !allCheck
    })
   
    this.setData({
      goods: this.data.goods,
      allCheck: !allCheck
    })
  },
  // 计算总价
  handleAllPrice() {
    let price = 0;
    this.data.goods.forEach(v => {
      if (v.selct) {
        price += v.goods_price * v.number
        this.setData({
          totalPrice: price.toFixed(2)
        })
      }
      wx.setStorageSync("goods", this.data.goods)
    })
  }
})