-------------
commands:
-------------
项目准备和运行：
1.npm install
2.ionic serve
项目app打包：
1.ionic cordova platform add ios/android
2.ionic cordova build ios/android


-------------
目录说明：
-------------
├ root
│	└ hook 					          --cordova自动化工程
│	└ plugins			              --cordova插件
│	└ platforms			              --cordova打包平台
│	└ node_modules                    --项目本地环境和外部资源包
│	└ resources 			          --app图标文件
│	└ www 					          --编译生成代码
│	└ src 					          --项目开发代码
│	│	└ app			              --项目入口
│	│	│	└ app.module.ts           --项目入口设置
│	│	│	└ app.component.ts        --项目根组件
│	│	│	└ app.html                --项目根页面
│	│	│	└ app.scss                --全局样式
│	│	│	└ main.ts                 --ng2引导文件
│	│	└ assets	  		          --静态资源
│	│	    └ fonts	  		              --自定义字体图标库
│	│	    └ i18n	  		              --翻译文件
│	│	    └ icon	  		              --图标原文件
│	│	    └ img	  		              --图片
│	│	    └ json	  		              --图标json文件
│	│	└ core	  		              --核心组件
│	│	│	└ common	              --公用自定义函数
│	│	│	└ components	          --可复用组件
│	│	│	└ directives	          --指令
│	│	│	└ providers 	          --服务
│	│	│	└ type 	                  --数据类型定义
│	│	│	└ core.module.ts          --核心模块入口						
│	│	└ pages			          	  --业务组件
│	│	│	└ [list] 		          --模块
│	│	│	│	└ [模块名].html        --模块页面
│	│	│	│	└ [模块名].ts          --模块逻辑
│	│	│	│	└ [模块名].scss        --模块样式	
│	│	│	│	└ [模块名].service.ts  --模块数据服务
│	│   │   │   └ list.module.ts      --业务模块入口
│	│	│	└ [setting] 		      --模块
│	│	│	│	└ [模块名].html        --模块页面
│	│	│	│	└ [模块名].ts          --模块逻辑
│	│	│	│	└ [模块名].scss        --模块样式	
│	│	│	│	└ [模块名].service.ts  --模块数据服务
│	│   │   │   └ setting.module.ts   --业务模块入口	
│	│	└ index.html 		          --项目启动页
│	│	└ mainfest.json 	          --web app配置
│	│	└ service-worker.js           --web app扩展库（现项目并没有用到）
│	└ theme					          --ionic样式变量
│   └ config.xml      		          --app设置文件
│   └ ionic.config.json		          --ionic设置文件
│   └ package.json 			          --npm配置文件
│   └ tslint.json 			          --typescript编码约定
│   └ tsconfig.json			          --typescript配置文件
│   └ README.md 			          --说明文档


-------------
视图说明：
-------------
                                                     +-----------+
                                                     |  Contact  |
                                                     +-----+-----+
                                                           |
                         +---------------------------------+--------------------------------+
                         |                                                                  |                
                   +-----+-----+                                                      +-----+-----+ 
                   |  setting  |                                                      |   list    |                        
                   +-----+-----+                                                      +-----+-----+
                         |                                                                  |
    +---------+----------+----------+---------+---------+----------+             +--------+---+---------+
    |         |          |          |         |         |          |             |        |   |         |
+---+---+ +---+---+ +----+----+ +---+---+ +---+---+ +---+----+ +---+---+         |        |   │   +-----+-----+     +-----------------+
| server| | login | | company | | role  | | about | |language| |setting|         |        |   |   |  project  |-----| project detail  |
+-------+ +-------+ +---------+ +-------+ +---+---+ +---+----+ +---+---+         |        |   |   +-----+-----+     +-----------------+
                                                                                 |        |   |         │
                                                                                 |        |   +---------+-----+     +-----------------+
                                                                                 |        |   |    partner    |-----| partner detail  |
                                                                                 |        |   +-------+-------+     +-----------------+
                                                                                 |        |           |
                                                                                 |        |           |
                                                                                 |        |           |    
                                                                                 +----------+        +-----+-----+
                                                                                 | favorite |        | contact   |
                                                                                 +-----+----+        +------+----+
                                                                                 |                          |
                                                                                 |                   +------+----------+	
                                                                                 |                   |      |          |	
                                                                                 +-----+-------------+      +---+---+  +---+----+
                                                                                 |   contact detail  |      |  add  |  |  edit  |
                                                                                 +-------------------+      +-------+  +--------+
							  			


-------------
核心组件说明：
-------------
└ core	  		      --核心组件
│	└ common	      --公用自定义函数
│	│	└ validators  --表单验证规则
│	└ components	  --可复用组件
│	│	└ popover     --弹出菜单框
│	│	└ imgdata     --图片读取插件
│	│	└ nodata      --无数据组件
│	└ directives	  --指令
│	│	
│	└ providers 	  	  --服务
│	│	└ translate   	  --翻译
│	│	└ broadcaster 	  --广播
│	│	└ database    	  --数据库
│	│	└ device      	  --设备相关（照相、文件读取等）
│	│	└ storage     	  --浏览器本地缓存
│	│	└ toast       	  --提示消息
│	│	└ http            --请求相关(请求头部设置、请求成功或者失败公共处理)
│	│	└ server          --服务器相处
│	│	└ token           --登录验证码
│	│	└ request.option  --请求传送的数据格式


-------------
公用组件说明：
-------------
└ pages		        --业务组件
│	└ list          --信息列表
│	    └ header    --列表公共头部
│	    └ footer    --列表公共尾部



-------------
字体图标库的使用说明：
-------------

自定义字体库的用法
└ <ion-icon class="contact-icon-bp" isActive="false"></ion-icon>


ionicl默认的字体图标库的用法
└ <ion-icon name="add" isActive="false"></ion-icon>


