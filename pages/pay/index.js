import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync("cart") || [];
        cart = cart.filter(v => v.checked);
        this.setData({ address });
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        });
        this.setData({ cart, totalPrice, totalNum, address });
    }
})