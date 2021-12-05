import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
    data: {
        goods: [],
        // 取消 按钮 是否显示
        isFocus: false,
        inpValue: ""
    },
    TimeId: -1,
    // 输入框的值改变 就会触发的事件
    handleInput(e) {
        const { value } = e.detail;
        clearTimeout(this.TimeId);
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false
            })
            return;
        }
        this.setData({
            isFocus: true
        })
        this.TimeId = setTimeout(() => {
            this.qsearch(value);
        }, 1000);
    },
    // 发送请求获取搜索建议 数据
    async qsearch(query) {
        const res = await request({ url: "/goods/qsearch", data: { query } });
        this.setData({
            goods: res
        })
    },
    // 点击 取消按钮
    handleCancel() {
        this.setData({
            inpValue: "",
            isFocus: false,
            goods: []
        })
    }
})