import type { ComponentType, RefObject } from 'react';

// 简历核心类型定义

export type Language = 'zh' | 'en';
export type FontFamily = 'default' | 'source-sans' | 'source-serif' | 'lxgw' | 'inter';
export type ThemeColor = '#2563eb' | '#f97316' | '#16a34a' | '#9333ea' | '#dc2626' | '#0891b2' | '#6b7280' | '#1e293b';
export type LayoutAlign = 'left' | 'center' | 'fill';
export type HeaderStyle = 'text' | 'icon' | 'plain';
export type ModuleType = 'education' | 'experience' | 'internship' | 'skills' | 'project' | 'award' | 'summary' | 'custom';
export type LeftPanelTab = 'template' | 'font' | 'style' | 'spacing' | null;

export interface ResumeMeta {
  templateId: string;
  language: Language;
  font: FontFamily;
  fontSize: number; // 80~120，百分比
  themeColor: string;
  layout: LayoutAlign;
  headerStyle: HeaderStyle;
  spacing: SpacingConfig;
}

export interface SpacingConfig {
  moduleGap: number;    // 0~60
  lineHeight: number;   // 1.2~2.5
  pagePadding: number;  // 24~80
}

export interface ProfileSection {
  name: string;
  avatar?: string; // base64
  birthDate?: string;
  showAge: boolean;
  gender?: string;
  experienceYears?: string;
  jobTarget?: string;
  phone?: string;
  email?: string;
  politicalStatus?: string;
  extras: ExtraField[];
  // 各字段是否显示在简历中（undefined 视为 true）
  showFields?: ProfileShowFields;
}

export interface ProfileShowFields {
  avatar: boolean;
  jobTarget: boolean;
  phone: boolean;
  email: boolean;
  gender: boolean;
  experienceYears: boolean;
  politicalStatus: boolean;
}

export interface ExtraField {
  id: string;
  label: string;
  value: string;
}

// 模块基础类型
export interface BaseModule {
  id: string;
  type: ModuleType;
  title: string;
  visible: boolean;
  order: number;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface EducationModule extends BaseModule {
  type: 'education';
  items: EducationItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  department?: string; // 部门
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceModule extends BaseModule {
  type: 'experience' | 'internship';
  items: ExperienceItem[];
}

export interface SkillsModule extends BaseModule {
  type: 'skills';
  content: string; // 富文本内容
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  techStack: string;
  description: string;       // 项目描述（背景/介绍）
  responsibilities: string;  // 核心工作内容
}

export interface ProjectModule extends BaseModule {
  type: 'project';
  items: ProjectItem[];
}

export interface AwardItem {
  id: string;
  name: string;
  date: string;
  description?: string;
}

export interface AwardModule extends BaseModule {
  type: 'award';
  items: AwardItem[];
}

export interface SummaryModule extends BaseModule {
  type: 'summary';
  content: string;
}

export interface CustomModule extends BaseModule {
  type: 'custom';
  content: string;
}

export type ResumeModule =
  | EducationModule
  | ExperienceModule
  | SkillsModule
  | ProjectModule
  | AwardModule
  | SummaryModule
  | CustomModule;

export interface ResumeData {
  id: string;
  meta: ResumeMeta;
  profile: ProfileSection;
  modules: ResumeModule[];
}

// 模板配置类型
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  component: ComponentType<{ data: ResumeData; previewRef?: RefObject<HTMLDivElement> }>;
}
