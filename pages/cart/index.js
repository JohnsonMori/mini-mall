// pages/cart/index.js
Page({
    // 点击 收货地址
    handleChooseAddress() {
        wx.chooseAddress({
            success: (result) => {
                console.log(result);
            }
        });
    }
})