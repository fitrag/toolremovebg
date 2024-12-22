import Vue from 'vue'
import Router from 'vue-router'
import HalamanTest from '../components/HalamanTest.vue'
import KeywordTool from '../components/KeywordTool.vue'
import ImageKeyword from '../components/ImageKeyword.vue'
import CropperImage from '../components/CropperImage.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
    basee:process.env.BASE_URLk,
    routes:[
        {
            path: '/keyword-tool',
            name : 'keyword',
            component:KeywordTool
        },
        {
            path: '/cropper-image',
            name : 'cropper-image',
            component:CropperImage
        },
        {
            path: '/image-keyword',
            name : 'image-keyword',
            component:ImageKeyword
        },
        {
            path: '/',
            name : 'index',
            component:HalamanTest
        },
    ]
})