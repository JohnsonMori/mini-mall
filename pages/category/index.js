import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
    data: {
        // 左侧的菜单数据
        leftMenuList: [],
        // 右侧的商品数据
        rightContent: [],
        // 被点击的左侧的菜单
        currentIndex: 0,
        // 右侧内容的滚动条距离顶部的距离
        scrollTop: 0
    },
    Cates: [],

    onLoad: function (options) {
        const Cates = wx.getStorageSync("cates");
        if (!Cates) {
            this.getCates();
        } else {
            if (Date.now() - Cates.time > 1000 * 1000) {
                this.getCates();
            } else {
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },
    // 获取分类数据
    async getCates() {
        // request({ url: "/categories" })
        //     .then(res => {
        //         this.Cates = res.data.message;

        //         wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

        //         // 构造左侧的大菜单数据
        //         let leftMenuList = this.Cates.map(v => v.cat_name);
        //         // 构造右侧的商品数据
        //         let rightContent = this.Cates[0].children;
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })

        const res = await request({ url: "/categories" });
        this.Cates = res;
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    // 左侧菜单的点击事件
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        this.setData({
            currentIndex: index,
            rightContent: this.Cates[index].children,
            scrollTop: 0
        })
    }
})