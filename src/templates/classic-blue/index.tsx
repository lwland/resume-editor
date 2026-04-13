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

const ClassicBlueTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { meta, profile, modules } = data;
  const color = meta.themeColor || '#2563eb';
  const visibleModules = [...modules].filter((m) => m.visible).sort((a, b) => a.order - b.order);
  const sf: Partial<import('../../types/resume').ProfileShowFields> = profile.showFields ?? {};

  // 头像是否显示
  const showAvatar = profile.avatar && sf.avatar !== false;
  const showJobTarget = profile.jobTarget && sf.jobTarget !== false;

  // 根字体：基准 14px × 用户字号缩放
  const rootFontSize = (meta.fontSize / 100) * 14;

  return (
    <div
      className="resume-template"
      style={{
        fontFamily: getFontFamily(meta.font),
        fontSize: `${rootFontSize}px`,
        lineHeight: meta.spacing.lineHeight,
        padding: `${meta.spacing.pagePadding}px`,
        background: '#fff',
        minHeight: '841px',
        width: '595px',
      }}
    >
      {/* 头部区域 */}
      <div
        style={{
          background: color,
          margin: `-${meta.spacing.pagePadding}px -${meta.spacing.pagePadding}px 0`,
          padding: `14px ${meta.spacing.pagePadding}px 14px`,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6em', marginBottom: '5px' }}>
            <div style={{ fontSize: '1.3em', fontWeight: 700, letterSpacing: '2px' }}>
              {profile.name || '姓名'}
            </div>
            {showJobTarget && (
              <div style={{ fontSize: '0.93em', opacity: 0.85 }}>
                {profile.jobTarget}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 4px', fontSize: '0.86em', color: '#f8fafc' }}>
            {[
              profile.phone && sf.phone !== false ? { prefix: 'Tel', text: profile.phone } : null,
              profile.email && sf.email !== false ? { prefix: 'Email', text: profile.email } : null,
              profile.gender && sf.gender !== false ? { prefix: null, text: profile.gender } : null,
              profile.experienceYears && sf.experienceYears !== false ? { prefix: null, text: profile.experienceYears } : null,
              profile.politicalStatus && sf.politicalStatus !== false ? { prefix: null, text: profile.politicalStatus } : null,
              ...profile.extras.map((e) => ({ prefix: e.label, text: e.value })),
            ].filter(Boolean).map((item, idx, arr) => (
              <React.Fragment key={idx}>
                <span style={{ opacity: 0.95 }}>
                  {item!.prefix && <span style={{ opacity: 0.7 }}>{item!.prefix}：</span>}
                  {item!.text}
                </span>
                {idx < arr.length - 1 && <span style={{ opacity: 0.4, margin: '0 3px' }}>·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        {showAvatar && (
          <img
            src={profile.avatar!}
            alt="头像"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.6)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* 模块列表 */}
      <div style={{ marginTop: `${meta.spacing.moduleGap}px` }}>
        {visibleModules.map((module) => (
          <div key={module.id} style={{ marginBottom: `${meta.spacing.moduleGap}px` }}>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700, color: color, marginRight: '6px', fontSize: '1.3em', lineHeight: 1, flexShrink: 0 }}>|</span>
              <span style={{ fontSize: '1em', fontWeight: 700, color: '#1e293b', letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {module.title}
              </span>
              <span style={{ color: `${color}60`, marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', letterSpacing: '0px', minWidth: 0, flex: 1, display: 'block' }}>{'────────────────────────────────────────────────────────────────────────────────'}</span>
            </div>

            {renderModuleContent(module, color, meta.spacing.lineHeight)}
          </div>
        ))}
      </div>
    </div>
  );
};

function renderModuleContent(module: any, color: string, lineHeight: number): React.ReactNode {
  switch (module.type) {
    case 'education':
      return (module as EducationModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.4em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: '0.93em' }}>{item.school}</span>
              <span style={{ color: '#475569', fontSize: '0.93em' }}>
                {item.degree} · {item.major}{item.description ? ` — ${item.description}` : ''}
              </span>
            </span>
            <span style={{ color: '#64748b', fontSize: '0.86em', flexShrink: 0, marginLeft: '0.5em' }}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
        </div>
      ));

    case 'experience':
    case 'internship':
      return (module as ExperienceModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1em' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5em', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.93em' }}>{item.company}</span>
            {(item.department || item.position) && (
              <span style={{ fontSize: '0.86em', color: '#64748b' }}>
                {[item.department, item.position].filter(Boolean).join(' · ')}
              </span>
            )}
            <span style={{ color: '#64748b', fontSize: '0.86em', flexShrink: 0, marginLeft: 'auto' }}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
          {item.description && (
            <div
              className="resume-rich-text"
              style={{ fontSize: '0.86em', color: '#475569', marginTop: '6px', lineHeight }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
        </div>
      ));

    case 'skills':
      return (
        <div
          className="resume-rich-text"
          style={{ fontSize: '0.86em', color: '#475569', lineHeight }}
          dangerouslySetInnerHTML={{ __html: (module as SkillsModule).content }}
        />
      );

    case 'project':
      return (module as ProjectModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.57em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              {item.role && (
                <span style={{ color, fontWeight: 500, fontSize: '0.86em' }}>{item.role}</span>
              )}
            </div>
            <span style={{ color: '#64748b', fontSize: '0.86em', flexShrink: 0, marginLeft: '0.5em' }}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
          {item.techStack && (
            <div style={{ color: '#475569', fontSize: '0.86em', marginTop: '2px' }}>
              {item.techStack}
            </div>
          )}
          {item.description && (
            <div
              className="resume-rich-text"
              style={{ fontSize: '0.86em', color: '#475569', lineHeight, marginTop: '6px' }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
          {item.responsibilities && (
            <div
              className="resume-rich-text"
              style={{ fontSize: '0.86em', color: '#475569', lineHeight, marginTop: '4px' }}
              dangerouslySetInnerHTML={{ __html: item.responsibilities }}
            />
          )}
        </div>
      ));

    case 'award':
      return (module as AwardModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.57em', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontWeight: 500 }}>{item.name}</span>
            {item.description && (
              <span style={{ color: '#64748b', fontSize: '0.86em', marginLeft: '8px' }}>
                {item.description}
              </span>
            )}
          </div>
          <span style={{ color: '#64748b', fontSize: '0.86em', flexShrink: 0, marginLeft: '12px' }}>
            {formatDate(item.date)}
          </span>
        </div>
      ));

    case 'summary':
    case 'custom':
      return (
        <div
          className="resume-rich-text"
          style={{ fontSize: '0.86em', color: '#475569', lineHeight }}
          dangerouslySetInnerHTML={{ __html: (module as SummaryModule | CustomModule).content }}
        />
      );

    default:
      return null;
  }
}

function getFontFamily(font: string): string {
  switch (font) {
    case 'source-sans':
      return '"Source Han Sans SC", "思源黑体", sans-serif';
    case 'source-serif':
      return '"Source Han Serif SC", "思源宋体", serif';
    case 'lxgw':
      return '"LXGW WenKai", "霞鹜文楷", cursive';
    case 'inter':
      return '"Inter", "思源黑体", sans-serif';
    default:
      return '-apple-system, BlinkMacSystemFont, "Segoe UI", "微软雅黑", sans-serif';
  }
}

export default ClassicBlueTemplate;
