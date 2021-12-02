// pages/cart/index.js
Page({
    // 点击 收货地址
    handleChooseAddress() {
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting["scope.address"];
                if (scopeAddress === true || scopeAddress === undefined) {
                    wx.chooseAddress({
                        success: (result1) => {
                            console.log(result1);
                        }
                    });
                } else {
                    wx.openSetting({
                        success: () => {
                            wx.chooseAddress({
                                success: (result3) => {
                                    console.log(result3);
                                }
                            });
                        }
                    });
                }
            },
            fail: () => { },
            complete: () => { }
        });
    }
})