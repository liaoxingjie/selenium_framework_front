import axios from 'axios'
// axios.defaults.baseURL = "https://vulcan.ministudy.com/info-api-c/"
axios.defaults.baseURL = "http://localhost:8082/demo/tool/getAllTestCase"
axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['Pragma'] = 'no-cache'

axios.interceptors.request.use(function (config) {
  console.log("请求开始：", config.url, config.data)

  return config
})
axios.interceptors.response.use(function (res) {
  console.log("成功函数：", res)
  return Promise.resolve(res)
}, function (err) {
  console.log("失败函数：", err)
  return Promise.reject(err)
})

export default {
  baseURL: axios.defaults.baseURL,
  post(options) {
    return axios({
      method: "post",
      url: options.url,
      data: `data=${encodeURIComponent(JSON.stringify(options.data || {}))}`,
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    })
  }
}
