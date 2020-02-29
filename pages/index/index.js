//index.js
//获取应用实例
import request from "../../utils/request.js"
Page({
  data: {
    banners: [],
    menus: [],
    floor:[]
  },
  //请求轮播图的数据
  onLoad() {
    request({
        url: '/home/swiperdata'
      }).then(res => {
        const {
          message
        } = res.data
        //  console.log(message)
        this.setData({
          banners: message
        })
      }),
      //请求中间菜单栏
      request({
        url: '/home/catitems'
      }).then(res => {
        // console.log(res)
        const {message} = res.data
        this.setData({
          menus: message
        })
      }),
     //请求楼层数据
     request({
      url:'/home/floordata'
     }).then(res=>{
       const { message} = res.data
       console.log(message)
       this.setData({
         floor: message
       })
     })
  }
})