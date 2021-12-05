import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
    data: {
        tabs: [
            {
                id: 0,
                value: "体验问题",
                isActive: true
            },
            {
                id: 1,
                value: "商品、商家投诉",
                isActive: false
            }
        ]
    },
    handleTabsItemChange(e) {
        const tabs = this.data.tabs.map((v, i) => { return { ...v, isActive: i === e.detail.index } })
        this.setData({ tabs })
    }
})