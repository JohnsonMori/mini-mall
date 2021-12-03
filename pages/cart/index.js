import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
    },
    onShow() {
        const address = wx.getStorageSync("address");
        this.setData({ address });
    },
    // 点击 收货地址
    async handleChooseAddress() {
        try {
            const res1 = await getSetting();
            const scopeAddress = res1.authSetting["scope.address"];
            if (scopeAddress === false) {
                await openSetting();
            }
            let address = await chooseAddress();
            address.all = `${address.provinceName}${address.cityName}${address.countyName}${address.detailInfo}`;
            wx.setStorageSync("address", address);
        } catch (error) {
            console.log(error);
        }
    }
})