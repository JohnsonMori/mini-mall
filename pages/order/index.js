import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [
            {
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ]
    },
    onShow() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return;
        }

        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        const { type } = currentPage.options;
        this.changeTitleByIndex(type - 1);
        this.getOrders(type);
    },
    // 获取订单列表的方法
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } });
        this.setData({
            orders: res.orders
        })
    },
    // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
        const tabs = this.data.tabs.map((v, i) => { return { ...v, isActive: i === index } });
        this.setData({ tabs });
    },
    handleTabsItemChange(e) {
        const { index } = e.detail;
        this.changeTitleByIndex(index);
        this.getOrders(index + 1);
    }
})