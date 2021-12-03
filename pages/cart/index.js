import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync("cart") || [];
        // 空数组 调用 every，返回值就是true
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            } else {
                allChecked = false;
            }
        });
        allChecked = cart.length !== 0 ? allChecked : false;
        this.setData({ address, cart, allChecked, totalPrice, totalNum });
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