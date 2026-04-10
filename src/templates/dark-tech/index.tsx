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

const DarkTechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { meta, profile, modules } = data;
  const color = meta.themeColor || '#2563eb';
  const visibleModules = [...modules].filter((m) => m.visible).sort((a, b) => a.order - b.order);
  const sf: Partial<import('../../types/resume').ProfileShowFields> = profile.showFields ?? {};

  // 根字体：基准 13px × 用户字号缩放
  const rootFontSize = (meta.fontSize / 100) * 13;

  return (
    <div style={{
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: `${rootFontSize}px`,
      lineHeight: meta.spacing.lineHeight,
      background: '#0f172a',
      color: '#94a3b8',
      minHeight: '841px',
      width: '595px',
      padding: `${meta.spacing.pagePadding}px`,
    }}>
      {/* 科技风头部 */}
      <div style={{ marginBottom: '24px', borderBottom: `1px solid ${color}40`, paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.62em', color, letterSpacing: '3px', marginBottom: '4px', fontFamily: 'monospace' }}>
              // RESUME
            </div>
            {/* 姓名：1.85em ≈ 24px @ 13px */}
            <h1 style={{ margin: '0 0 6px', fontSize: '1.85em', fontWeight: 700, color: '#f1f5f9', letterSpacing: '2px' }}>
              {profile.name || '姓名'}
            </h1>
            {profile.jobTarget && sf.jobTarget !== false && (
              <div style={{ fontSize: '0.92em', color, fontFamily: 'monospace' }}>
                &gt; {profile.jobTarget}
              </div>
            )}
          </div>
          {profile.avatar && sf.avatar !== false && (
            <img src={profile.avatar} alt="头像"
              style={{ width: '70px', height: '70px', borderRadius: '4px', border: `2px solid ${color}60`, objectFit: 'cover' }} />
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: '12px', fontSize: '0.85em', color: '#64748b' }}>
          {profile.phone && sf.phone !== false && <span><span style={{ color }}>tel:</span> {profile.phone}</span>}
          {profile.email && sf.email !== false && <span><span style={{ color }}>email:</span> {profile.email}</span>}
          {profile.gender && sf.gender !== false && <span><span style={{ color }}>gender:</span> {profile.gender}</span>}
          {profile.experienceYears && sf.experienceYears !== false && <span><span style={{ color }}>exp:</span> {profile.experienceYears}</span>}
          {profile.politicalStatus && sf.politicalStatus !== false && <span>{profile.politicalStatus}</span>}
          {profile.extras.map((e) => (
            <span key={e.id}><span style={{ color }}>{e.label}:</span> {e.value}</span>
          ))}
        </div>
      </div>

      {/* 模块 */}
      {visibleModules.map((module) => (
        <div key={module.id} style={{ marginBottom: `${meta.spacing.moduleGap}px` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color, fontSize: '0.77em', fontFamily: 'monospace' }}>##</span>
            {/* 模块标题：1.15em ≈ 15px @ 13px */}
            <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.15em', letterSpacing: '1px' }}>
              {module.title}
            </span>
          </div>
          {renderDarkContent(module, color, meta.spacing.lineHeight)}
        </div>
      ))}
    </div>
  );
};

function renderDarkContent(module: any, color: string, lineHeight: number): React.ReactNode {
  const mutedStyle: React.CSSProperties = { color: '#475569', fontSize: '0.85em' };

  switch (module.type) {
    case 'education':
      return (module as EducationModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.9em', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '1em' }}>{item.school}</span>
            <span style={mutedStyle}>{formatDate(item.startDate)} ~ {formatDate(item.endDate)}</span>
          </div>
          <div style={{ ...mutedStyle, marginTop: '2px' }}>
            <span style={{ color }}>{item.degree}</span> · {item.major}
          </div>
        </div>
      ));

    case 'experience':
    case 'internship':
      return (module as ExperienceModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1.1em', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '1em' }}>{item.company}</span>
              {item.position && (
                <span style={{ color, fontSize: '0.92em' }}>{item.position}</span>
              )}
            </div>
            <span style={{ ...mutedStyle, flexShrink: 0, marginLeft: '0.5em' }}>{formatDate(item.startDate)} ~ {formatDate(item.endDate)}</span>
          </div>
          {item.description && (
            <div className="resume-rich-text" style={{ ...mutedStyle, marginTop: '6px', lineHeight }}
              dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ));

    case 'skills':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(module as SkillsModule).items.map((item) => (
            <span key={item.id} style={{
              background: `${color}15`, border: `1px solid ${color}40`,
              borderRadius: '3px', padding: '0.15em 0.77em', fontSize: '0.85em',
              color: '#94a3b8', fontFamily: 'monospace',
            }}>
              {item.name}
            </span>
          ))}
        </div>
      );

    case 'project':
      return (module as ProjectModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1.1em', paddingLeft: '12px', borderLeft: `2px solid ${color}30` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '1em' }}>{item.name}</span>
              {item.role && (
                <span style={{ color, fontSize: '0.85em' }}>{item.role}</span>
              )}
            </div>
            <span style={{ ...mutedStyle, flexShrink: 0, marginLeft: '0.5em' }}>{formatDate(item.startDate)} ~ {formatDate(item.endDate)}</span>
          </div>
          {item.techStack && (
            <div style={{ ...mutedStyle, marginTop: '2px' }}>{item.techStack}</div>
          )}
          {item.description && (
            <div className="resume-rich-text" style={{ ...mutedStyle, marginTop: '6px', lineHeight }}
              dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ));

    case 'award':
      return (module as AwardModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.5em', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.92em' }}>{item.name}</span>
          <span style={mutedStyle}>{formatDate(item.date)}</span>
        </div>
      ));

    case 'summary':
    case 'custom':
      return (
        <div className="resume-rich-text" style={{ ...mutedStyle, lineHeight }}
          dangerouslySetInnerHTML={{ __html: (module as SummaryModule | CustomModule).content }} />
      );

    default:
      return null;
  }
}

export default DarkTechTemplate;
