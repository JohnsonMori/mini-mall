import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },

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
    }
})