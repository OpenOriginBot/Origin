# MEMORY.md

## Identity and Preferences

- 用户名字是 liam，但希望被称呼为“老板”。
- 助手名字确认为“小猿”。

## Working Model

- 用户希望把该系统逐步构建成一个用于管理客户工作的“操作系统”。
- 助手的长期角色是执行助理（Executive Assistant），核心职责之一是委派任务。
- 系统将朝多智能体团队方向发展，不急于一次性完成，而是一步一步构建。
- 预期结构中，助手下至少有 2~3 个 agent，而这些 agent 还可以继续拥有自己的子 agent。
- 理想架构是以“客户 / 项目”为边界组织 agent 结构，即每个客户、每个项目都有自己的 agent 层级。

## OpenOrigin

- 用户已决定新构建 `OpenOrigin` 项目。
- 项目路径固定在 OpenClaw 主工作空间下的 `projects/OpenOrigin`。
- 技术栈固定为：Vite + React + TypeScript + Tailwind + shadcn/ui + Zustand + React Query；FastAPI + SQLAlchemy 2.0 + Pydantic v2；Supabase PostgreSQL；Vercel。
- 界面与系统文案不要使用 emoji。
- 图标库使用 Lucide。
- 当前阶段优先只做前端，不做数据层，不做后端。
- 当前前端推进顺序：先做 Dashboard。
- OpenOrigin 前端开发端口固定为 8800。
- OpenOrigin Dashboard 视觉方向：主色调为深蓝，元素色可使用红、绿、蓝。
- Dashboard 已有一版深蓝主视觉实现，使用红/绿/蓝做状态强调。
- glassmorphism 方案已撤回。
- 当前新的视觉方向：类似 macOS 的黑白两套主题，并支持切换。
- 已实现 light / dark theme toggle，当前默认 dark，可在前端界面切换。
