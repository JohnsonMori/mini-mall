import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { getUserProfile } from "../../utils/asyncWx.js";
Page({
    async getUserProfile() {
        const { userInfo } = await getUserProfile({ desc: '用于完善个人信息' });
        wx.setStorageSync("userInfo", userInfo);
        wx.navigateBack({
            delta: 1
        });
    }
})