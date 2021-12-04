import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { login } from "../../utils/asyncWx.js";
Page({
    // 获取用户信息
    async handleGetUserInfo(e) {
        try {
            const { encryptedData, rawData, iv, signature } = e.detail;
            const { code } = await login();
            const loginParams = { encryptedData, rawData, iv, signature, code };
            const loginRes = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
            wx.setStorageSync("token", loginRes?.token || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error);
        }
    }
})