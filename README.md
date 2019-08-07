# React项目之爱之依-精品中国


## 上线
```
项目官网 ： https://www.aizhiyi.com/wap/index.html

WebApp上线地址 ： http://47.107.156.131:1906

后台管理系统地址 ： http://47.107.156.131:1907

github地址：git@github.com:gzh51904/aizhiyi.git
```

## 团队
```
组长 ：张志杰
组员 ：杨玉宁、陈城

负责模块说明 

张志杰：统筹项目、配置环境、模块安装、模块划分、构建node服务器、后端api编写、购物车页面功能的实现、完成分类产品页的数据渲染、交互、功能的逻辑实现、解决团队技术问题
杨玉宁：首页页面、详情页的静态与逻辑实现、对接后端api接口实现页面渲染、处理页面渲染bug
陈城：福利页面、我的页面的静态与逻辑实现、对接后端api接口实现页面渲染、登录注册功能实现
```

## 项目目录
```
├── README.md
├── config
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
└── src
    ├── App.js
    ├── actions
    │   └── cartActions.js
    ├── assets
    │   ├── css
    │   │   └── common
    │   │       └── reset.css
    │   ├── images
    │   │   ├── cart
    │   │   │   ├── before-check.png
    │   │   │   ├── classmore.png
    │   │   │   ├── ia_100000000.png
    │   │   │   ├── ia_100000001.jpg
    │   │   │   ├── ia_100000002.png
    │   │   │   ├── ia_100000004.png
    │   │   │   ├── ia_100000005.png
    │   │   │   ├── ia_100000008.png
    │   │   │   ├── ia_100000009.png
    │   │   │   ├── ia_100000011.png
    │   │   │   ├── ia_100000012.png
    │   │   │   ├── ia_100000013.png
    │   │   │   ├── ia_100000014.png
    │   │   │   ├── ia_100000015.png
    │   │   │   ├── ia_100000016.png
    │   │   │   ├── ia_100000017.png
    │   │   │   ├── ia_100000018.png
    │   │   │   ├── ia_100000019.png
    │   │   │   ├── ia_100000020.png
    │   │   │   ├── ia_100000021.gif
    │   │   │   ├── left-arrow.png
    │   │   │   └── warn.png
    │   │   ├── home
    │   │   │   ├── CombinedShape.png
    │   │   │   ├── aa.png
    │   │   │   ├── as.png
    │   │   │   ├── bg_img_fff.png
    │   │   │   ├── classmore.png
    │   │   │   ├── common1.png
    │   │   │   ├── common2.jpg
    │   │   │   ├── common3.jpg
    │   │   │   ├── dian.png
    │   │   │   ├── icon_top.png
    │   │   │   ├── jiax.png
    │   │   │   ├── line_l.png
    │   │   │   ├── line_r.png
    │   │   │   ├── moreCome.png
    │   │   │   ├── search-big-2.png
    │   │   │   ├── tab-collection-default.png
    │   │   │   ├── tab-message.png
    │   │   │   ├── tab-store.png
    │   │   │   ├── tcmore.png
    │   │   │   ├── top_logo.png
    │   │   │   ├── xiaoxi2.png
    │   │   │   ├── z115.png
    │   │   │   ├── z155.png
    │   │   │   ├── z182.png
    │   │   │   ├── z183.png
    │   │   │   ├── z184.png
    │   │   │   ├── z185.png
    │   │   │   ├── z186.png
    │   │   │   ├── z187.png
    │   │   │   ├── z188.png
    │   │   │   ├── z189.png
    │   │   │   ├── z20.png
    │   │   │   ├── z21.png
    │   │   │   ├── z22.png
    │   │   │   ├── z23.png
    │   │   │   ├── z24.png
    │   │   │   ├── z40.png
    │   │   │   ├── z41.png
    │   │   │   ├── z80.png
    │   │   │   ├── z82.png
    │   │   │   ├── z83.png
    │   │   │   └── ?\237.png
    │   │   ├── login
    │   │   │   ├── arrow@2x.png
    │   │   │   ├── icon_laba_1.png
    │   │   │   ├── login10.png
    │   │   │   ├── login3.png
    │   │   │   ├── login4.png
    │   │   │   ├── login5.png
    │   │   │   ├── login7.png
    │   │   │   ├── login9.png
    │   │   │   └── logo@2x.png
    │   │   ├── mine
    │   │   │   ├── coin85.png
    │   │   │   ├── fl-off@2x.png
    │   │   │   ├── gwc-off@2x.png
    │   │   │   ├── icon_next.png
    │   │   │   ├── icon_tx.png
    │   │   │   ├── loading_bg.gif
    │   │   │   ├── oval4.png
    │   │   │   ├── tx.png
    │   │   │   ├── wd-on@2x.png
    │   │   │   ├── z15.png
    │   │   │   ├── z16.png
    │   │   │   ├── z17.png
    │   │   │   ├── z18.png
    │   │   │   ├── z19.png
    │   │   │   ├── z195.png
    │   │   │   ├── z20.png
    │   │   │   ├── z21.png
    │   │   │   ├── z23.png
    │   │   │   ├── z24.png
    │   │   │   ├── z25.png
    │   │   │   ├── z26.png
    │   │   │   ├── z27.png
    │   │   │   ├── z28.png
    │   │   │   ├── z30.png
    │   │   │   └── zy-off@2x.png
    │   │   ├── register
    │   │   │   ├── arrow@2x\ (1).png
    │   │   │   ├── dialog01.png
    │   │   │   └── four.png
    │   │   ├── sort
    │   │   │   ├── abt.png
    │   │   │   ├── bgwhile.png
    │   │   │   ├── nav1.jpg
    │   │   │   ├── newgoods.png
    │   │   │   ├── xiaoxi2.png
    │   │   │   ├── xsg.png
    │   │   │   └── z170.png
    │   │   ├── subNav
    │   │   │   ├── icon-cart-in.png
    │   │   │   ├── icon-cart.png
    │   │   │   ├── icon-home-in.png
    │   │   │   ├── icon-home.png
    │   │   │   ├── icon-mine-in.png
    │   │   │   ├── icon-mine.png
    │   │   │   ├── icon-sort-in.png
    │   │   │   ├── icon-sort.png
    │   │   │   ├── icon-welfare-in.png
    │   │   │   └── icon-welfare.png
    │   │   └── welfare
    │   │       ├── 154_05779100685899708_240.jpg
    │   │       ├── bg_limittime.jpg
    │   │       ├── z200.jpg
    │   │       └── z202.jpg
    │   └── scss
    │       ├── Cart.module.css
    │       ├── Cart.module.min.css
    │       ├── Cart.module.scss
    │       ├── Comment.css
    │       ├── Comment.min.css
    │       ├── Comment.scss
    │       ├── ant.css
    │       ├── commodity.css
    │       ├── commodity.min.css
    │       ├── commodity.module.css
    │       ├── commodity.module.min.css
    │       ├── commodity.module.scss
    │       ├── deta.css
    │       ├── dity.css
    │       ├── goods.module.css
    │       ├── goods.module.min.css
    │       ├── goods.module.scss
    │       ├── goodsCar.css
    │       ├── goodsCar.min.css
    │       ├── goodsCar.scss
    │       ├── home.css
    │       ├── home.min.css
    │       ├── home.module.css
    │       ├── home.module.min.css
    │       ├── home.module.scss
    │       ├── login.module.scss
    │       ├── mine.module.scss
    │       ├── recommend.module.css
    │       ├── recommend.module.min.css
    │       ├── recommend.module.scss
    │       ├── register.css
    │       ├── register.module.scss
    │       ├── sort.module.css
    │       ├── sort.module.min.css
    │       ├── sort.module.scss
    │       ├── subNav.css
    │       ├── subNav.min.css
    │       ├── subNav.scss
    │       ├── tab.css
    │       ├── welfare.css
    │       ├── welfare.module.css
    │       ├── welfare.module.min.css
    │       └── welfare.module.scss
    ├── components
    │   ├── Comment.js
    │   ├── Commodity.js
    │   ├── Details.js
    │   ├── Goods.js
    │   ├── Recommend.js
    │   ├── SortMain.js
    │   ├── SortNavMainTop.js
    │   └── SubNav.js
    ├── context
    │   └── index.js
    ├── index.js
    ├── logo.svg
    ├── pages
    │   ├── Cart
    │   │   └── index.js
    │   ├── Cartx
    │   │   └── index.js
    │   ├── Home
    │   │   ├── Recommend.js
    │   │   └── index.js
    │   ├── Login
    │   │   └── index.js
    │   ├── Mine
    │   │   └── index.js
    │   ├── Register
    │   │   └── index.js
    │   ├── Sort
    │   │   └── index.js
    │   └── Welfare
    │       └── index.js
    ├── reducer
    │   ├── cart.js
    │   ├── common.js
    │   └── index.js
    ├── serviceWorker.js
    ├── store
    │   └── index.js
    └── utils
        ├── index.js
        └── request.js
```
