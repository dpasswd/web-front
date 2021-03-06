 ## DPassword

DPassword旨在帮助个人管理密码，降低密码分享过程中的安全风险

https://dpasswd.com/

### 功能

- client

  密码加密存储：client基于SQLite加密功能存储个人密码

  快捷输入功能：client可以通过设置快捷键，自动输入密码，密码输入后内存中的数据就会销毁

  3DES加解密：加密\解密 字符串

  中心服登陆：通过登陆中心服完成，本地密码库的备份，还原，密码分享功能。

- center

  备份：管理密码库备份列表

  分享：查看我当前在分享中的密码，以及分享状态

  用户管理：用户管理，角色管理

  系统设置：注册管理，LDAP管理，邮件设置，检测更新



### 密码分享

密码分享通过公钥加密，私钥解密完成整个分享过程，公钥会存储在center中，全员共享，分享人通过center获取被分享人的公钥完成密码加密，被分享人通过本地私钥解密加密串获取密码原文。私钥只存储在本机，并需要你妥善保管私钥，建议你加密备份一份，如果私钥泄露，你分享中的密码都有可能会被窃取。

## web前端简介




### 备份

![]( https://dpasswd.com/wiki/web-1.png )

### 分享

![]( https://dpasswd.com/wiki/web-2.png )

### 用户管理

![]( https://dpasswd.com/wiki/web-3.png )

### 常规设置

![]( https://dpasswd.com/wiki/web-4.png )

### 登陆设置

![]( https://dpasswd.com/wiki/web-5.png )

### 邮件设置

![]( https://dpasswd.com/wiki/web-6.png )

### 检测更新

![]( https://dpasswd.com/wiki/web-7.png )
