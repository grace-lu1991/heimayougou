/**
 * 封装一个异步请求的工具库
 * 基于 wx.request(ajax)来实现axios的部分功能
 * 1.调用返回一个promise（以axios 举例）
 * request({
 * ...配置}).then(res=>{}).catch(res=>{})
 * 
 * 
 * 
 * 2配置基准路径
 * request.defaults.baseURL = "路径"
 * 
 * 3.错误拦截
 * request.OnError(res=>{})
 */
/**
 * 主函数
 * 
 * @params
 * 
 * 参数 | 类型 | 默认值
 * cinfig | object | {}
 */
const request = (config = {}) => {
  //如果请求出现域名不一样的多个接口，如果url开头没有http，加上基准路径
  if (config.url.search(/^http/) == -1) {
    config.url = request.defaults.baseURL + config.url
  }

  // 返回一个promise 对象
  //resolve 是.then里面的函数，一般请求成功的时候执行
  //reject 是.catch里面的函数，一般用于请求失败时候是执行
  return new Promise((resolve, reject) => {
    //发起请求
    wx.request({
      ...config,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      },
      //不管成功是否将都会执行
      complete(res) {
        request.errors()
      }
    })
  })
}
/**
 * request 的默认属性
 */
request.defaults = {
  // 基准路径
  baseURL: ""
}
/**
 * request 的错误拦截
 * 
 * @params
 * callback | 函数
 */
/**
 * 存储错误的回调函数.默认是一个空的函数
 */
request.errors = () => {}
request.OnError = (callback)=>{
  if(typeof callback === 'function'){
    request.errors = callback
  }
}
//对外暴露
export default request 