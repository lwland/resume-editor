import { TemplateConfig } from '../types/resume';
import ClassicBlueTemplate from './classic-blue';
import MinimalGrayTemplate from './minimal-gray';
import DarkTechTemplate from './dark-tech';

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic-blue',
    name: '经典蓝',
    description: '简洁专业，蓝色主调，适合大多数技术岗位',
    component: ClassicBlueTemplate,
  },
  {
    id: 'minimal-gray',
    name: '极简灰',
    description: '极简主义，留白丰富，适合设计/产品类岗位',
    component: MinimalGrayTemplate,
  },
  {
    id: 'dark-tech',
    name: '深色科技',
    description: '深色背景，科技感强，适合技术/研发岗位',
    component: DarkTechTemplate,
  },
];

export const getTemplate = (id: string): TemplateConfig =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
