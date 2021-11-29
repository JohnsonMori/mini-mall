export const request = (params) => {
  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      url: `${baseUrl}${params.url}`,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });

  })
}