import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  ResumeMeta,
  ProfileSection,
  ResumeModule,
  SpacingConfig,
} from '../types/resume';

// 初始简历数据
const initialData: ResumeData = {
  id: 'default',
  meta: {
    templateId: 'classic-blue',
    language: 'zh',
    font: 'default',
    fontSize: 100,
    themeColor: '#2563eb',
    layout: 'left',
    headerStyle: 'icon',
    spacing: {
      moduleGap: 20,
      lineHeight: 1.8,
      pagePadding: 48,
    },
  },
  profile: {
    name: '张三',
    showAge: false,
    gender: '男',
    experienceYears: '3-5年',
    jobTarget: 'Java 后端工程师',
    phone: '138****8888',
    email: 'zhangsan@example.com',
    politicalStatus: '群众',
    extras: [],
    showFields: {
      avatar: true,
      jobTarget: true,
      phone: true,
      email: true,
      gender: true,
      experienceYears: true,
      politicalStatus: false,
    },
  },
  modules: [
    {
      id: 'education',
      type: 'education',
      title: '教育背景',
      visible: true,
      order: 0,
      items: [
        {
          id: 'edu-1',
          school: '北京大学',
          degree: '本科',
          major: '计算机科学与技术',
          startDate: '2015-09',
          endDate: '2019-06',
          description: 'GPA 3.8/4.0，获得优秀毕业生称号',
        },
      ],
    },
    {
      id: 'skills',
      type: 'skills',
      title: '专业技能',
      visible: true,
      order: 1,
      content:
        '<ul><li><strong>编程语言：</strong>Java / Python / TypeScript，熟悉 JVM 调优与多线程并发编程</li><li><strong>框架与中间件：</strong>Spring Boot / Spring Cloud / MyBatis，熟练使用 Redis、Kafka</li><li><strong>数据库：</strong>MySQL（索引优化、分库分表）、Redis、MongoDB</li><li><strong>DevOps：</strong>Docker / Kubernetes / Jenkins，有持续集成与容器化部署经验</li></ul>',
    },
    {
      id: 'experience',
      type: 'experience',
      title: '工作经历',
      visible: true,
      order: 2,
      items: [
        {
          id: 'exp-1',
          company: '字节跳动',
          department: '抖音推荐技术部',
          position: '后端开发工程师',
          startDate: '2021-07',
          endDate: '至今',
          description:
            '<ul><li>负责抖音推荐系统核心服务开发，提升推荐效率 20%</li><li>主导微服务架构改造，降低系统延迟 30%</li><li>参与百万级 DAU 高并发场景的性能优化</li></ul>',
        },
      ],
    },
    {
      id: 'internship',
      type: 'internship',
      title: '实习经历',
      visible: true,
      order: 3,
      items: [
        {
          id: 'intern-1',
          company: '阿里巴巴',
          position: '后端开发实习生',
          startDate: '2019-07',
          endDate: '2020-01',
          description:
            '<ul><li>参与淘宝购物车模块的重构开发</li><li>优化数据库查询，提升接口响应速度 40%</li></ul>',
        },
      ],
    },
    {
      id: 'project',
      type: 'project',
      title: '项目经历',
      visible: true,
      order: 4,
      items: [
        {
          id: 'proj-1',
          name: '分布式任务调度平台',
          role: '项目负责人',
          startDate: '2022-03',
          endDate: '2022-09',
          techStack: 'Spring Boot / Redis / MySQL / Vue.js',
          description: '<p>支持百万级任务的企业级分布式调度系统，服务于公司内部 20+ 业务线，覆盖定时任务、事件驱动等调度场景。</p>',
          responsibilities:
            '<ul><li>主导系统架构设计，采用一致性哈希算法实现负载均衡，系统可用性达 99.9%</li><li>实现任务分片与故障转移机制，单节点故障恢复时间缩短至 3 秒内</li><li>搭建可视化监控大盘，任务执行状态实时可见，排障效率提升 60%</li></ul>',
        },
      ],
    },
    {
      id: 'award',
      type: 'award',
      title: '荣誉证书',
      visible: true,
      order: 5,
      items: [
        {
          id: 'award-1',
          name: '2022年字节跳动优秀员工',
          date: '2022-12',
          description: '全公司仅 5% 员工获此荣誉',
        },
        {
          id: 'award-2',
          name: 'CET-6 英语六级',
          date: '2018-06',
        },
      ],
    },
    {
      id: 'summary',
      type: 'summary',
      title: '自我评价',
      visible: true,
      order: 6,
      content:
        '5年 Java 后端开发经验，熟悉微服务架构和高并发系统设计，有丰富的大型互联网项目经验。学习能力强，具备良好的团队协作精神，追求技术卓越。',
    },
    {
      id: 'custom',
      type: 'custom',
      title: '自定义模块',
      visible: false,
      order: 7,
      content: '',
    },
  ],
};

interface ResumeStore {
  data: ResumeData;

  // meta 操作
  updateMeta: (updates: Partial<ResumeMeta>) => void;
  updateSpacing: (updates: Partial<SpacingConfig>) => void;
  resetSpacing: () => void;

  // profile 操作
  updateProfile: (updates: Partial<ProfileSection>) => void;

  // 模块操作
  updateModule: (moduleId: string, updates: Partial<ResumeModule>) => void;
  toggleModuleVisibility: (moduleId: string) => void;
  reorderModules: (activeId: string, overId: string) => void;
  addModuleItem: (moduleId: string, item: any) => void;
  updateModuleItem: (moduleId: string, itemId: string, updates: any) => void;
  deleteModuleItem: (moduleId: string, itemId: string) => void;

  // 重置
  resetData: () => void;
  // 从档案恢复完整数据
  resetToData: (data: ResumeData) => void;
}

const defaultSpacing: SpacingConfig = {
  moduleGap: 20,
  lineHeight: 1.8,
  pagePadding: 48,
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,

      updateMeta: (updates) =>
        set((state) => ({
          data: { ...state.data, meta: { ...state.data.meta, ...updates } },
        })),

      updateSpacing: (updates) =>
        set((state) => ({
          data: {
            ...state.data,
            meta: {
              ...state.data.meta,
              spacing: { ...state.data.meta.spacing, ...updates },
            },
          },
        })),

      resetSpacing: () =>
        set((state) => ({
          data: {
            ...state.data,
            meta: { ...state.data.meta, spacing: defaultSpacing },
          },
        })),

      updateProfile: (updates) =>
        set((state) => ({
          data: { ...state.data, profile: { ...state.data.profile, ...updates } },
        })),

      updateModule: (moduleId, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            modules: state.data.modules.map((m) =>
              m.id === moduleId ? ({ ...m, ...updates } as ResumeModule) : m
            ),
          },
        })),

      toggleModuleVisibility: (moduleId) =>
        set((state) => ({
          data: {
            ...state.data,
            modules: state.data.modules.map((m) =>
              m.id === moduleId ? ({ ...m, visible: !m.visible } as ResumeModule) : m
            ),
          },
        })),

      reorderModules: (activeId, overId) =>
        set((state) => {
          const modules = [...state.data.modules];
          const activeIdx = modules.findIndex((m) => m.id === activeId);
          const overIdx = modules.findIndex((m) => m.id === overId);
          if (activeIdx === -1 || overIdx === -1) return state;
          const [moved] = modules.splice(activeIdx, 1);
          modules.splice(overIdx, 0, moved);
          return {
            data: {
              ...state.data,
              modules: modules.map((m, i) => ({ ...m, order: i })),
            },
          };
        }),

      addModuleItem: (moduleId, item) =>
        set((state) => ({
          data: {
            ...state.data,
            modules: state.data.modules.map((m) => {
              if (m.id !== moduleId) return m;
              if ('items' in m) {
                return { ...m, items: [...(m as any).items, item] } as ResumeModule;
              }
              return m;
            }),
          },
        })),

      updateModuleItem: (moduleId, itemId, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            modules: state.data.modules.map((m) => {
              if (m.id !== moduleId) return m;
              if ('items' in m) {
                return {
                  ...m,
                  items: (m as any).items.map((item: any) =>
                    item.id === itemId ? { ...item, ...updates } : item
                  ),
                } as ResumeModule;
              }
              return m;
            }),
          },
        })),

      deleteModuleItem: (moduleId, itemId) =>
        set((state) => ({
          data: {
            ...state.data,
            modules: state.data.modules.map((m) => {
              if (m.id !== moduleId) return m;
              if ('items' in m) {
                return {
                  ...m,
                  items: (m as any).items.filter((item: any) => item.id !== itemId),
                } as ResumeModule;
              }
              return m;
            }),
          },
        })),

      resetData: () => set({ data: initialData }),

      resetToData: (data) => set({ data }),
    }),
    { name: 'resume-editor-data' }
  )
);
