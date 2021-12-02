import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },
    // 商品对象
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { goods_id } = options;
        this.getGoodsDetail(goods_id);
    },
    // 获取商品详情数据
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
        this.GoodsInfo = goodsObj;
        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                // iPhone部分手机 不识别 webp图片格式
                // 最好找到后台 让他进行修改
                // 临时自己改 确保后台存在 1.webp => 1.jpg
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            }
        })
    },
    // 点击轮播图 放大预览
    handlePreviewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls
        });
    },
    // 点击 加入购物车
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            this.GoodsInfo.num = 1;
            cart.push(this.GoodsInfo);
        } else {
            cart[index].num++;
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        });

    }
})