import { request } from "../../request/index.js"
Page({
    data: {
        // 左侧的菜单数据
        leftMenuList: [],
        // 右侧的商品数据
        rightContent: [],
        // 被点击的左侧的菜单
        currentIndex: 0
    },
    Cates: [],

    onLoad: function (options) {
        this.getCates();
    },
    // 获取分类数据
    getCates() {
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/categories" })
            .then(res => {
                this.Cates = res.data.message;

                // 构造左侧的大菜单数据
                let leftMenuList = this.Cates.map(v => v.cat_name);
                // 构造右侧的商品数据
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            })
    },
    // 左侧菜单的点击事件
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        this.setData({
            currentIndex: index,
            rightContent: this.Cates[index].children
        })
    }
})