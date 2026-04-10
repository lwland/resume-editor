import React from 'react';
import { Phone, Mail, User, Briefcase } from 'lucide-react';
import { ResumeData, EducationModule, ExperienceModule, SkillsModule, ProjectModule, AwardModule, SummaryModule, CustomModule, HeaderStyle } from '../../types/resume';
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

// 头部信息项组件（支持图标/文字/纯内容三种展示风格）
function HeaderInfoItem({
  icon,
  text,
  style,
  textPrefix,
}: {
  icon?: React.ReactNode;
  text: string;
  style: HeaderStyle | 'plain';
  textPrefix?: string;
}) {
  const itemStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    marginRight: '16px',
    fontSize: '0.86em',
    color: '#f8fafc',
    lineHeight: 1.4,
  };

  return (
    <span style={itemStyle}>
      {style === 'icon' && icon && (
        <span style={{ display: 'flex', alignItems: 'center', opacity: 0.9 }}>{icon}</span>
      )}
      {style === 'text' && textPrefix && (
        <span style={{ opacity: 0.75 }}>{textPrefix}：</span>
      )}
      {text}
    </span>
  );
}

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
          padding: `28px ${meta.spacing.pagePadding}px 24px`,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {showAvatar && (
          <img
            src={profile.avatar!}
            alt="头像"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.6)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          {/* 姓名：1.86em ≈ 26px @ 14px */}
          <div style={{ fontSize: '1.86em', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>
            {profile.name || '姓名'}
          </div>
          {showJobTarget && (
            <div style={{ fontSize: '0.93em', opacity: 0.85, marginBottom: '10px' }}>
              {profile.jobTarget}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 0' }}>
            {profile.phone && sf.phone !== false && (
              <HeaderInfoItem icon={<Phone size={11} />} text={profile.phone} style={meta.headerStyle} textPrefix="电话" />
            )}
            {profile.email && sf.email !== false && (
              <HeaderInfoItem icon={<Mail size={11} />} text={profile.email} style={meta.headerStyle} textPrefix="邮箱" />
            )}
            {profile.gender && sf.gender !== false && (
              <HeaderInfoItem icon={<User size={11} />} text={profile.gender} style={meta.headerStyle} textPrefix="性别" />
            )}
            {profile.experienceYears && sf.experienceYears !== false && (
              <HeaderInfoItem icon={<Briefcase size={11} />} text={profile.experienceYears} style={meta.headerStyle} textPrefix="经验" />
            )}
            {profile.politicalStatus && sf.politicalStatus !== false && (
              <HeaderInfoItem text={profile.politicalStatus} style="plain" />
            )}
            {profile.extras.map((e) => (
              <HeaderInfoItem key={e.id} text={`${e.label}：${e.value}`} style="plain" />
            ))}
          </div>
        </div>
      </div>

      {/* 模块列表 */}
      <div style={{ marginTop: `${meta.spacing.moduleGap}px` }}>
        {visibleModules.map((module) => (
          <div key={module.id} style={{ marginBottom: `${meta.spacing.moduleGap}px` }}>
            {/* 模块标题：1.14em ≈ 16px @ 14px，明显大于正文 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '6px',
              }}
            >
              <span
                style={{
                  width: '4px',
                  height: '1.3em',
                  background: color,
                  borderRadius: '2px',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '1.14em', fontWeight: 700, color: '#1e293b', letterSpacing: '0.5px' }}>
                {module.title}
              </span>
            </div>

            {/* 模块内容 */}
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
        <div key={item.id} style={{ marginBottom: '0.9em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* 条目主标题：1em，与根字体一致 */}
            <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.school}</span>
            <span style={{ color: '#64748b', fontSize: '0.86em' }}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
          <div style={{ color: '#475569', fontSize: '0.93em', marginTop: '2px' }}>
            {item.degree} · {item.major}
          </div>
          {item.description && (
            <div style={{ color: '#64748b', fontSize: '0.86em', marginTop: '4px' }}>
              {item.description}
            </div>
          )}
        </div>
      ));

    case 'experience':
    case 'internship':
      return (module as ExperienceModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.57em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.company}</span>
              {item.position && (
                <span style={{ color: color, fontSize: '0.93em', fontWeight: 500 }}>{item.position}</span>
              )}
            </div>
            <span style={{ color: '#64748b', fontSize: '0.86em', flexShrink: 0, marginLeft: '0.5em' }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.57em' }}>
          {(module as SkillsModule).items.map((item) => (
            <span
              key={item.id}
              style={{
                background: '#f0f7ff',
                border: `1px solid ${color}30`,
                color: '#334155',
                borderRadius: '4px',
                padding: '0.21em 0.71em',
                fontSize: '0.86em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {item.name}
              {item.level && (
                <span style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: i < (item.level ?? 0) ? color : '#e2e8f0',
                        display: 'inline-block',
                      }}
                    />
                  ))}
                </span>
              )}
            </span>
          ))}
        </div>
      );

    case 'project':
      return (module as ProjectModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.57em', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: '1em' }}>{item.name}</span>
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
              style={{ fontSize: '0.86em', color: '#475569', marginTop: '6px', lineHeight }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
        </div>
      ));

    case 'award':
      return (module as AwardModule).items.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.57em', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontWeight: 500, fontSize: '0.93em' }}>{item.name}</span>
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
          style={{ fontSize: '0.93em', color: '#475569', lineHeight }}
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
