# 简历编辑器

一个功能完整的 Web 简历编辑器，支持多模板切换、模块化内容编辑、实时预览和 PDF 导出。

## 功能特性

### 核心功能
- **三栏布局**：左侧工具栏 + 中间实时预览 + 右侧内容编辑
- **实时预览**：编辑内容即时反映到简历预览区
- **3 套模板**：经典蓝、极简灰、深色科技，一键切换
- **PDF 导出**：高清 2x 分辨率导出，支持多页自动分割

### 简历内容模块
- 基本信息（姓名、头像、联系方式、自定义字段）
- 教育背景
- 工作经历（含富文本编辑）
- 实习经历
- 专业技能（带星级评分）
- 项目经历（含富文本编辑）
- 荣誉证书
- 自我评价
- 自定义模块

### 模块管理
- 拖拽调整模块排序
- 一键显示/隐藏模块

### 样式定制（4 个设置面板）
| 面板 | 功能 |
|------|------|
| 模板 | 切换简历模板 |
| 文字 | 语言（中/英）、字体、字号 |
| 样式 | 主题色、布局对齐、信息展示风格 |
| 间距 | 模块间距、行间距、页面边距，支持一键恢复默认 |

### 数据持久化
- 自动保存到浏览器 localStorage，刷新页面数据不丢失
- **保存档案**：将完整简历导出为 `.resume.json` 文件（含所有内容与样式设置）
- **导入档案**：上传 `.resume.json` 文件，立即恢复全部格式与内容

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| TypeScript | 5 | 类型安全 |
| Vite | 4 | 构建工具 |
| Zustand | - | 状态管理（含 persist 中间件） |
| Tailwind CSS | 3 | 样式工具 |
| @dnd-kit | - | 拖拽排序 |
| TipTap | - | 富文本编辑器 |
| html2canvas + jsPDF | - | PDF 导出 |
| lucide-react | - | 图标库 |
| dayjs | - | 日期格式化 |

## 快速开始

### 开发模式（热更新）

```bash
# 安装依赖
npm install

# 启动开发服务器，访问 http://localhost:5173
npm run dev
```

### 生产模式（推荐日常使用）

```bash
# 构建生产版本
npm run build

# 启动静态服务，访问 http://localhost:5174
node_modules/.bin/serve dist -l 5174
```

> **重新打开时**：直接运行最后一行 `serve` 命令即可，无需重新构建（除非代码有改动）。

## 项目结构

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # 顶部导航（Logo + 下载按钮）
│   │   ├── LeftToolbar.tsx         # 左侧工具栏
│   │   ├── PreviewCanvas.tsx       # 简历预览区（含自适应缩放）
│   │   ├── SettingsPanel/          # 左侧设置面板
│   │   │   ├── TemplatePanel.tsx
│   │   │   ├── FontPanel.tsx
│   │   │   ├── StylePanel.tsx
│   │   │   └── SpacingPanel.tsx
│   │   └── EditPanel/              # 右侧编辑面板
│   │       ├── index.tsx
│   │       ├── ModuleList.tsx      # 拖拽模块管理
│   │       ├── ProfileEditor.tsx
│   │       ├── EducationEditor.tsx
│   │       ├── ExperienceEditor.tsx
│   │       ├── SkillsEditor.tsx
│   │       ├── ProjectEditor.tsx
│   │       ├── AwardEditor.tsx
│   │       └── SummaryEditor.tsx
│   └── ui/
│       ├── SliderField.tsx         # 通用滑动条
│       └── RichTextEditor.tsx      # 富文本编辑器
├── templates/
│   ├── registry.ts                 # 模板注册表
│   ├── classic-blue/               # 经典蓝模板
│   ├── minimal-gray/               # 极简灰模板
│   └── dark-tech/                  # 深色科技模板
├── store/
│   ├── resumeStore.ts              # 简历数据 Store
│   └── uiStore.ts                  # UI 状态 Store
├── hooks/
│   ├── useResumeExport.ts          # PDF 导出逻辑
│   └── useResumeArchive.ts         # 档案保存/导入逻辑
└── types/
    └── resume.ts                   # 完整类型定义
```

## 后续扩展方向

- AI 一键优化简历内容
- 在线分享（生成分享链接）
- 云端存储（多份简历管理）
- 更多模板（双栏布局等）
- 打印模式（CSS @media print）
