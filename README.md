## 简介

初始项目已经安装好一些前期的依赖

- react-router-dom
- react-redux
- axios
- antd
- sass


## 要求

1. 请使用TypeScript、SCSS编写项目
2. 样式编写请注意不要影响其他分支的开发人员
3. 所有的请求请写在`Api/api.ts`文件下(已经对axios进行二次封装，有使用规范demo)
4. 静态资源放在assets文件
5. 公共样式已经在themes文件下，已经引入`all.scss`全局样式和全局样式变量
6. 属于自己分支的页面样式请以文件夹形式放在themes文件
7. 组件放在`components`文件下
8. 文件引入可以不使用相对路径实例：`import xxx from 'Api/api.ts';`(就是可以不用..相对路径查找)

## 分支

- master 主分支
- develop 开发测试分支
- feature  功能增加bug测试分支
- dev-xxx
- ...待定

## 上传流程

将代码克隆下来之后创建新的属于你的开发分支，在当前分支开发代码。

使用指令`git push origin 你的分支名`,这样就会将你的代码上传到远程的 ‘分支名’ 分支，后续合并交给管理员。

## 傻瓜式教学

1. `git clone git@jihulab.com:zhaoshilidawang/dirsirobject.git `   克隆代码
2. `git checkout -b dev-名字`    创建并进入' dev-名字 ' 分支
3. 编写代码，添加功能
4. `git add .`    上传暂存区
5. `git commit -m "提交信息"`   提交代码到你的本地仓库
6. `git push origin dev-名字`   将你的代码提交到远程 “dev-名字” 分支

拉取最新的代码：

```bash
git pull <远程分支名> <远程分支名>:<本地分支名>

# 实例:

# 将远程主机 origin 的 master 分支拉取过来，与本地的 dev-mingzi 分支合并。
git pull origin master:dev-mingzi

# 如果你想让远程分支与你所在分支合并可以省略冒号
git pull origin master

# 我们的话就是用这个指令：
git pull origin feature
```

- 每天都要将你新开发的代码提交合并到你所在的分支，保证项目的进度

- 每天的最初就要将新的代码拉取下来，保证你的分支有最新的功能
