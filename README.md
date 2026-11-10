## 本项目完整源码是收费的  接毕业设计和论文

### 作者微信：grapro666 QQ：3642795578 (支持部署调试、支持代做毕设)

### 接javaweb、python、小程序、H5、APP、各种管理系统、单片机、嵌入式等开发

### 选题+开题报告+任务书+中期报告+程序定制+安装调试+论文+答辩ppt

**博客地址：
[https://blog.csdn.net/2303_76227485/article/details/170286801](https://blog.csdn.net/2303_76227485/article/details/170286801)**

**视频演示：
[https://www.bilibili.com/video/BV17H4x6MEah/](https://www.bilibili.com/video/BV17H4x6MEah/)**

**毕业设计所有选题地址：
[https://github.com/codegitpro/allProject](https://github.com/codegitpro/allProject)**

## 基于SpringBoot+Vue3运动摄影小程序系统带ai对话(源代码+数据库+2万字论文+ppt)
**项目编号：284**
## 一、系统介绍
本项目前后端分离，分为用户、管理员2种角色。
### 1、用户：
注册登录、摄影作品查看/收藏/评论、摄影预约、化妆预约、摄影考级预约、周边商城、购物车、我的订单、智能ai对话、地址管理、用户充值、通知公告、个人信息、密码修改
### 2、管理员：
- 首页数据可视化：数量统计、金字塔条形图、预约统计柱状图、分类统计环状图、销售额统计折线图
- 聊天记录管理、聊天助手管理、用户管理、摄影作品管理、摄影预约管理、化妆预约管理、考级预约管理、
- 周边商城管理、商品分类管理、订单管理(发货、物流、退款)、充值记录管理、操作日志管理、轮播图管理、新闻资讯管理
### 3、亮点：
- 智能ai对话
- 接入地图选点
- 后台首页大屏使用echarts图表统计，更直观的看出系统的运行数据。
- 使用aop切面和注解实现操作日志记录

## 二、所用技术
后端技术栈：
- Springboot
- MybatisPlus
- Mysql
- Maven

前端技术栈：
- Vue3
- Vue-router
- axios
- Element-Plus
- echarts

## 三、环境介绍
基础环境 :IDEA/eclipse, JDK18或以上, Mysql5.7及以上, Maven3.6, node18, navicat

所有项目以及源代码本人均调试运行无问题 可支持远程调试运行

## 四、页面截图
论文结构：
![contents](./picture/picture0.png)
### 1、用户：
![contents](./picture/picture1.png)
![contents](./picture/picture2.png)
![contents](./picture/picture3.png)
![contents](./picture/picture4.png)
![contents](./picture/picture5.png)
![contents](./picture/picture6.png)
![contents](./picture/picture7.png)
![contents](./picture/picture8.png)
![contents](./picture/picture9.png)
![contents](./picture/picture10.png)
![contents](./picture/picture11.png)
![contents](./picture/picture12.png)
![contents](./picture/picture13.png)
![contents](./picture/picture14.png)
![contents](./picture/picture15.png)
![contents](./picture/picture16.png)
![contents](./picture/picture17.png)
![contents](./picture/picture18.png)
![contents](./picture/picture19.png)
![contents](./picture/picture20.png)
![contents](./picture/picture21.png)
![contents](./picture/picture22.png)
![contents](./picture/picture23.png)
![contents](./picture/picture24.png)
![contents](./picture/picture25.png)
![contents](./picture/picture26.png)
![contents](./picture/picture27.png)
![contents](./picture/picture28.png)
![contents](./picture/picture29.png)
![contents](./picture/picture30.png)
### 2、管理员：
![contents](./picture/picture31.png)
![contents](./picture/picture32.png)
![contents](./picture/picture33.png)
![contents](./picture/picture34.png)
![contents](./picture/picture35.png)
![contents](./picture/picture36.png)
![contents](./picture/picture37.png)
![contents](./picture/picture38.png)
![contents](./picture/picture39.png)
![contents](./picture/picture40.png)
![contents](./picture/picture41.png)
![contents](./picture/picture42.png)
![contents](./picture/picture43.png)
![contents](./picture/picture44.png)
![contents](./picture/picture45.png)
![contents](./picture/picture46.png)
![contents](./picture/picture47.png)
![contents](./picture/picture48.png)
![contents](./picture/picture49.png)
![contents](./picture/picture50.png)



## 五、浏览地址
前台地址：http://localhost:8082

- 用户账号密码：wuyanchen/123456

后台地址：http://localhost:8081

- 管理员账号密码：admin/admin

## 六、部署教程
1. 使用Navicat或者其它工具，在mysql中创建对应名称的数据库，并执行项目的sql文件

2. 使用IDEA/Eclipse导入server_code项目，若为maven项目请选择maven，等待依赖下载完成

3. 修改application.yml里面的数据库配置，CommonController里面的ai配置，src/main/java/com/SpringbootSchemaApplication.java启动后端项目

4. vscode或idea打开manage_code后台项目

5. 在编译器中打开terminal，执行npm install 依赖下载完成后执行 npm run serve,执行成功后会显示访问地址

6. 微信开发者工具打开wechat_code等编译完成就能看到用户端了
