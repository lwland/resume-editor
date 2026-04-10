import React from 'react';
import { ResumeData, EducationModule, ExperienceModule, SkillsModule, ProjectModule, AwardModule, SummaryModule, CustomModule } from '../../types/resume';
import dayjs from 'dayjs';

interface TemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  if (dateStr === '至今' || dateStr === 'Present') return dateStr;
  const d = dayjs(dateStr);
  return d.isValid() ? d.format('YYYY.MM') : dateStr;
};

const MinimalGrayTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { meta, profile, modules } = data;
  const color = meta.themeColor || '#6b7280';
  const visibleModules = [...modules].filter((m) => m.visible).sort((a, b) => a.order - b.order);
  const sf: Partial<import('../../types/resume').ProfileShowFields> = profile.showFields ?? {};

  // 根字体：基准 13px × 用户字号缩放
  const rootFontSize = (meta.fontSize / 100) * 13;

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "微软雅黑", sans-serif',
        fontSize: `${rootFontSize}px`,
        lineHeight: meta.spacing.lineHeight,
        padding: `${meta.spacing.pagePadding}px`,
        background: '#fff',
        minHeight: '841px',
        width: '595px',
        color: '#374151',
      }}
    >
      {/* 极简头部 */}
      <div style={{ textAlign: meta.layout === 'center' ? 'center' : 'left', marginBottom: '24px' }}>
        {/* 姓名：2.15em ≈ 28px @ 13px */}
        <h1 style={{ margin: '0 0 6px', fontSize: '2.15em', fontWeight: 300, letterSpacing: '4px', color: '#111827' }}>
          {profile.name || '姓名'}
        </h1>
        {profile.jobTarget && sf.jobTarget !== false && (
          <div style={{ fontSize: '1em', color, letterSpacing: '1px', marginBottom: '10px' }}>
            {profile.jobTarget}
          </div>
        )}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px 20px',
          justifyContent: meta.layout === 'center' ? 'center' : 'flex-start',
          color: '#6b7280',
          fontSize: '0.85em',
        }}>
          {profile.phone && sf.phone !== false && <span>{profile.phone}</span>}
          {profile.email && sf.email !== false && <span>{profile.email}</span>}
          {profile.gender && sf.gender !== false && <span>{profile.gender}</span>}
          {profile.experienceYears && sf.experienceYears !== false && <span>{profile.experienceYears}</span>}
          {profile.politicalStatus && sf.politicalStatus !== false && <span>{profile.politicalStatus}</span>}
          {profile.extras.map((e) => (
            <span key={e.id}>{e.label}：{e.value}</span>
          ))}
        </div>
        <div style={{
          width: '40px', height: '2px', background: color, marginTop: '16px',
          marginLeft: meta.layout === 'center' ? 'auto' : '0',
          marginRight: meta.layout === 'center' ? 'auto' : '0',
        }} />
      </div>

      {/* 模块内容 */}
      {visibleModules.map((module) => (
        <div key={module.id} style={{ marginBottom: `${meta.spacing.moduleGap}px` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {/* 模块标题：1.15em ≈ 15px @ 13px，letter-spacing + uppercase 提升视觉层级 */}
            <span style={{
              fontSize: '1.15em',
              fontWeight: 700,
              letterSpacing: '2px',
              color,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {module.title}
            </span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>
          {renderContent(module, color, meta.spacing.lineHeight)}
        </div>
      ))}
    </div>
  );
};

function renderContent(module: any, color: string, lineHeight: number): React.ReactNode {
  switch (module.type) {
    case 'education':
      return (module as EducationModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.8em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.school}</span>
            <span style={{ color: '#9ca3af', fontSize: '0.85em' }}>
              {formatDate(item.startDate)} — {formatDate(item.endDate)}
            </span>
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.92em', marginTop: '2px' }}>{item.degree} · {item.major}</div>
          {item.description && (
            <div style={{ color: '#9ca3af', fontSize: '0.85em', marginTop: '3px' }}>{item.description}</div>
          )}
        </div>
      ));

    case 'experience':
    case 'internship':
      return (module as ExperienceModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1.1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.company}</span>
            <span style={{ color: '#9ca3af', fontSize: '0.85em', flexShrink: 0, marginLeft: '0.5em' }}>
              {formatDate(item.startDate)} — {formatDate(item.endDate)}
            </span>
          </div>
          {(item.department || item.position) && (
            <div style={{ fontSize: '0.85em', color: '#6b7280', marginTop: '2px' }}>
              {[item.department, item.position].filter(Boolean).join(' · ')}
            </div>
          )}
          {item.description && (
            <div className="resume-rich-text"
              style={{ fontSize: '0.85em', color: '#6b7280', marginTop: '6px', lineHeight }}
              dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ));

    case 'skills':
      return (
        <div
          className="resume-rich-text"
          style={{ fontSize: '0.92em', color: '#6b7280', lineHeight }}
          dangerouslySetInnerHTML={{ __html: (module as SkillsModule).content }}
        />
      );

    case 'project':
      return (module as ProjectModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.name}</span>
              {item.role && (
                <span style={{ color, fontSize: '0.85em' }}>{item.role}</span>
              )}
            </div>
            <span style={{ color: '#9ca3af', fontSize: '0.85em', flexShrink: 0, marginLeft: '0.5em' }}>
              {formatDate(item.startDate)} — {formatDate(item.endDate)}
            </span>
          </div>
          {item.techStack && (
            <div style={{ color: '#6b7280', fontSize: '0.85em', marginTop: '2px' }}>{item.techStack}</div>
          )}
          {item.description && (
            <>
              <div style={{ fontSize: '0.77em', fontWeight: 600, color: '#9ca3af', marginTop: '6px', marginBottom: '2px' }}>项目描述</div>
              <div className="resume-rich-text"
                style={{ fontSize: '0.85em', color: '#6b7280', lineHeight }}
                dangerouslySetInnerHTML={{ __html: item.description }} />
            </>
          )}
          {item.responsibilities && (
            <>
              <div style={{ fontSize: '0.77em', fontWeight: 600, color: '#9ca3af', marginTop: '6px', marginBottom: '2px' }}>核心工作内容</div>
              <div className="resume-rich-text"
                style={{ fontSize: '0.85em', color: '#6b7280', lineHeight }}
                dangerouslySetInnerHTML={{ __html: item.responsibilities }} />
            </>
          )}
        </div>
      ));

    case 'award':
      return (module as AwardModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.5em', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.92em' }}>
            {item.name}{item.description && ` — ${item.description}`}
          </span>
          <span style={{ color: '#9ca3af', fontSize: '0.85em', flexShrink: 0, marginLeft: '12px' }}>
            {formatDate(item.date)}
          </span>
        </div>
      ));

    case 'summary':
    case 'custom':
      return (
        <div className="resume-rich-text"
          style={{ fontSize: '0.92em', color: '#6b7280', lineHeight }}
          dangerouslySetInnerHTML={{ __html: (module as SummaryModule | CustomModule).content }} />
      );

    default:
      return null;
  }
}

export default MinimalGrayTemplate;
