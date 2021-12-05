import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
    data: {
        goods: []
    },
    // 输入框的值改变 就会触发的事件
    handleInput(e) {
        const { value } = e.detail;
        if (!value.trim()) {
            return;
        }
        this.qsearch(value);
    },
    // 发送请求获取搜索建议 数据
    async qsearch(query) {
        const res = await request({ url: "/goods/qsearch", data: { query } });
        this.setData({
            goods: res
        })
    }
})