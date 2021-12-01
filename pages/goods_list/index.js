import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    // 接口要的参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid;
        this.getGoodsList();
    },

    // 获取商品列表数据
    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.QueryParams });
        this.setData({
            goodsList: res.goods
        })
    },

    handleTabsItemChange(e) {
        const tabs = this.data.tabs.map((v, i) => { return { ...v, isActive: i === e.detail.index } })
        this.setData({ tabs })
    }
})