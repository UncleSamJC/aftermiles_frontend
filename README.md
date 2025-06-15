# Welcome to your daily miles track app - AfterMiles 


## 项目简介

AfterMiles 是一个基于 React Native Expo 的移动应用，主要为 Uber 司机提供每日里程记录服务。应用支持多种登录方式，包含完整的导航系统和车辆信息管理功能。

在底部的Navbar中有四个tabs，分别是Dashboard - 用来显示司机当前的里程表数据，以及本年度trips的统计图表；Trips - 显示了一个list，是明细的里程记录，点击每个里程记录，可以看到这个trip的详细信息；Expenses - 记录司机在使用车辆的过程中，产生的各种可以抵扣的费用，这是报税或申请退税时所需的明细。Settings - 给应用做各种设置。

## 技术栈

- **React Native + Expo**
- **Expo Router (文件系统路由)**
- **Supabase (后端数据库和认证)**
- **NativeWind (Tailwind CSS for React Native)**
- **React Native Reusables UI库**
- **Supabase Auth (Google/Email登录)**
- **AsyncStorage (本地数据存储)**
- **Use expo/vector-icons as icon library**

## 开发技术要求
1. . 代码风格与一致性
- 遵循现有代码库的风格（如变量命名、缩进风格、注释格式、组件组织）。
- 不引入未经我要求的新库、新框架或风格变化。
- 不自行假设未提供的上下文（如数据库结构、API响应格式等）。
2.行为约束
- 不要“脑补”：若缺乏上下文，请明确指出而不是编造。
- 不要生成整段新功能，除非明确要求；仅补全、修改、重构或解释已有代码。
- 不自动增加安全处理、错误处理、边界检查，除非特别指明。
3.输出格式
- 输出代码片段应尽可能精简且专注于请求点。
- 仅输出代码或带有简洁解释的代码，不做赘述性描述（除非我请求说明）。、
4. 协作模式
- 当我提供代码上下文时，不要重写整体结构，仅处理指明的范围。
- 如果我未说明目标，只分析代码逻辑或指出潜在问题。
- 若功能不清楚，请先询问而不是擅自推断。


## How to run the project

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
