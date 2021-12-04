import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
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
    },
    // 点击 支付
    async handleOrderPay() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return;
        }
        const header = { Authorization: token };
        const order_price = this.data.totalPrice;
        const consignee_addr = this.data.address.all;
        let cart = this.data.cart;
        let goods = [];
        cart.forEach(v => goods.push({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price,
        }))
        const orderParams = { order_price, consignee_addr, goods };
        const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams, header });
        console.log(order_number);
    }
})