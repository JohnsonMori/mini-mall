/**
 * promise 形式 getSetting
 * @returns
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  })
}
/**
 * promise 形式 chooseAddress
 * @returns
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  })
}
/**
 * promise 形式 openSetting
 * @returns
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  })
}
/**
 * promise 形式 showModal
 * @param {object} param0
 * @returns
 */
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式 showToast
 * @param {object} param0
 * @returns
 */
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon: "none",
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式 login
 * @returns
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay
 * @returns
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式的 getUserProfile
 * @param {object} param0
 * @returns
 */
export const getUserProfile = ({ desc }) => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}