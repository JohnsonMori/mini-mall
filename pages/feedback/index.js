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
        ],
        // 被选中的图片路径 数组
        chooseImgs: [],
        // 文本域的内容
        textVal: ""
    },
    // 外网的图片的路径数组
    UploadImgs: [],
    handleTabsItemChange(e) {
        const tabs = this.data.tabs.map((v, i) => { return { ...v, isActive: i === e.detail.index } });
        this.setData({ tabs });
    },
    // 点击 “+” 选择图片
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                })
            }
        });
    },
    // 点击 自定义图片组件
    handleRemoveImg(e) {
        const { index } = e.currentTarget.dataset;
        let { chooseImgs } = this.data;
        chooseImgs.splice(index, 1);
        this.setData({
            chooseImgs
        })
    },
    // 文本域的输入事件
    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value
        })
    },
    // 提交按钮的点击
    handleFormSubmit() {
        const { textVal, chooseImgs } = this.data;
        if (!textVal.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true
            });
            return;
        }
        wx.showLoading({
            title: "正在上传中",
            mask: true
        });
        // 判断有没有需要上传的图片数组
        if (chooseImgs.length != 0) {
            chooseImgs.forEach((v, i) => {
                wx.uploadFile({
                    url: 'https://img.coolcr.cn/api/upload',
                    filePath: v,
                    name: "image",
                    formData: {},
                    success: (result) => {
                        const { data: { url } } = JSON.parse(result.data);
                        this.UploadImgs.push(url);
                        if (i === chooseImgs.length - 1) {
                            wx.hideLoading();
                            console.log("把文本的内容和外网的图片数组 提交到后台中");
                            // 提交都成功了
                            // 重置页面
                            this.setData({
                                textVal: "",
                                chooseImgs: []
                            })
                            // 返回上一个页面
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    }
                });
            });
        } else {
            wx.hideLoading();
            console.log("只是提交了文本");
            wx.navigateBack({
                delta: 1
            });
        }
    }
})