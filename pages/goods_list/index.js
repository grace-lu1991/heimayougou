import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMore:true,
    goods: [],
    pagenum: 1,
    keywords: '',
    current: 0,
    tabs: ['综合', '销量', '价格'],
    loading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const {
      keywords
    } = options

    this.setData({
        keywords
      }),
      this.getGoods()
  },
  //封装请求商品数据
  getGoods() {
    if(this.data.isMore === false){
      return
    }
    request({
      url: '/goods/search',
      data: {
        query: this.data.keywords,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      console.log(res)
      const {
        message
      } = res.data
      const goods = message.goods.map(v=>{
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods: [...this.data.goods, ...goods],
        loading:false
      })
      if (this.data.goods.length >=message.total){
        this.setData({
          isMore : false
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.loading === false){
      this.setData({
        loading:true,
        pagenum: this.data.pagenum + 1
      })
      this.getGoods()
    }
  }
})