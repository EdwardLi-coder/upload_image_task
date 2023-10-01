## 项目概述

- 使用命令成功生成了 `sharp-layer`。
- 创建了两个关键文件：
- `uploadService.ts`
- `compressionHandler.ts`

### uploadService.ts

此文件用于上传图片作为原始存储桶。其中需要传入的参数包括文件、文件名称和类型。

**type参数** :

- 一个包含 "1000"、"2000" 或两者都有的字符串，用逗号分隔。

**key结构** : `uploads/${type}/${filename}/${hash}` 以确保唯一性。

### compressionHandler.ts

此文件作为异步处理的图片压缩器功能：

- 从 `bucket-for-primitive` 中获取图片。
- 使用 `sharp` 进行压缩，根据取到的type压缩大小，无损压缩。
- 根据文件大小设定是否删除，例如文件大于 1MB 则删除。---

## 配置和部署

1. 确保你已配置好AWS CLI，并已安装SAM CLI。
2. 在项目根目录中运行以下命令来部署项目：

```sh

npm run sam-build

sam deploy --guided

```

### upload.test.ts

jest测试[upload.test.ts](__tests__%2Funit%2Fhandlers%2Fupload.test.ts)
用jest添加到s3

## sharp 在 Lambda Layers 中的使用

使用 Lambda Layers 包含 `sharp` 库可以带来以下好处：

- 在多个 Lambda 函数中重复使用它，无需每次都打包和上传。
- 减少部署大小、时间和管理复杂性。
- 更新 `sharp` 或修复 bug 时，只在 Layer 中更新，而不影响其他 Lambda 函数。

## sharp 的本地机制

在本地开发环境，`sharp` 通常直接安装为项目依赖，并在代码中直接引用。这意味着每次部署或打包应用时，`sharp` 和应用代码会被一同打包。---
