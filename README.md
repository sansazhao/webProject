# wordLadder
[![Build Status](https://travis-ci.org/michaelliao/openweixin.svg?branch=master)](https://travis-ci.org/michaelliao/openweixin)
SE personal project3 ,a service with access control

增加权限验证、前端页面：

内存中已设定用户： 账号：admin  密码：123456  权限：admin

本地MySQL数据库的test schema中的 s_user 表中可添加用户

memory或database中存在的用户可登录成功，但权限为admin的用户才可使用wordladder功能


webSecurityConfig.java可添加memory user

application.yml中可配置数据库

点击build->rebuilid project后可启动项目
