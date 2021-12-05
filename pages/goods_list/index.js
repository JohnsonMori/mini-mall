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
    // 总页数
    TotalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid || "";
        this.QueryParams.query = options.query || "";
        this.getGoodsList();
    },

    // 获取商品列表数据
    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.QueryParams });
        // 获取总条数
        const total = res.total;
        // 计算总页数
        this.TotalPages = Math.ceil(total / this.QueryParams.pagesize);
        // console.log(this.TotalPages);
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })

        // 关闭下拉刷新的窗口
        wx.stopPullDownRefresh();
    },

    // 标题点击事件 从子组件传递过来
    handleTabsItemChange(e) {
        const tabs = this.data.tabs.map((v, i) => { return { ...v, isActive: i === e.detail.index } })
        this.setData({ tabs })
    },

    // 页面上滑 滚动条触底事件
    onReachBottom() {
        // 1 判断还有没有下一页数据
        if (this.QueryParams.pagenum >= this.TotalPages) {
            wx.showToast({
                title: '没有下一页数据',
            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList();
        }
    },

    // 下拉刷新事件
    onPullDownRefresh() {
        this.setData({ goodsList: [] });
        this.QueryParams.pagenum = 1;
        this.getGoodsList();
    }
})