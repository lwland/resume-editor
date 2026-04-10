import React, { useRef } from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { ExtraField, ProfileShowFields } from '../../../types/resume';

// 预设工作年限选项
const EXP_PRESETS = ['应届生', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上'];

const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = useResumeStore();
  const { profile } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取某字段的显示状态（默认 true）
  const isFieldVisible = (field: keyof ProfileShowFields): boolean =>
    profile.showFields?.[field] !== false;

  // 切换某字段的显示状态
  const toggleField = (field: keyof ProfileShowFields) => {
    updateProfile({
      showFields: {
        avatar: true,
        jobTarget: true,
        phone: true,
        email: true,
        gender: true,
        experienceYears: true,
        politicalStatus: false,
        ...profile.showFields,
        [field]: !isFieldVisible(field),
      },
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('图片大小不能超过 1MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ avatar: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const addExtra = () => {
    const newExtra: ExtraField = { id: `extra-${Date.now()}`, label: '标签', value: '' };
    updateProfile({ extras: [...profile.extras, newExtra] });
  };

  const updateExtra = (id: string, updates: Partial<ExtraField>) => {
    updateProfile({
      extras: profile.extras.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const removeExtra = (id: string) => {
    updateProfile({ extras: profile.extras.filter((e) => e.id !== id) });
  };

  const inputClass =
    'w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all';

  // 带显示开关的字段包装组件
  const FieldRow: React.FC<{
    label: string;
    fieldKey: keyof ProfileShowFields;
    children: React.ReactNode;
  }> = ({ label, fieldKey, children }) => {
    const visible = isFieldVisible(fieldKey);
    return (
      <div className={`transition-opacity ${visible ? 'opacity-100' : 'opacity-50'}`}>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-slate-500">{label}</label>
          <button
            type="button"
            onClick={() => toggleField(fieldKey)}
            className={`flex items-center gap-1 text-xs transition-colors ${
              visible
                ? 'text-blue-500 hover:text-blue-600'
                : 'text-slate-400 hover:text-slate-500'
            }`}
            title={visible ? '点击隐藏此项' : '点击显示此项'}
          >
            {visible ? <Eye size={12} /> : <EyeOff size={12} />}
            <span>{visible ? '已显示' : '已隐藏'}</span>
          </button>
        </div>
        {children}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-3">
      {/* ── 头像 ── */}
      <FieldRow label="头像" fieldKey="avatar">
        <div className="flex items-center gap-3">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="头像"
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
              未上传
            </div>
          )}
          <div className="space-y-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="block text-xs text-blue-600 hover:text-blue-700 underline"
            >
              上传头像
            </button>
            {profile.avatar && (
              <button
                onClick={() => updateProfile({ avatar: undefined })}
                className="block text-xs text-red-400 hover:text-red-500 underline"
              >
                移除头像
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        <div className="text-xs text-slate-400 mt-1">支持 JPG、PNG，不超过 1MB</div>
      </FieldRow>

      {/* ── 姓名（必填，不可隐藏）── */}
      <div>
        <label className="block text-xs text-slate-500 mb-1">姓名</label>
        <input
          className={inputClass}
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          placeholder="请输入姓名"
        />
      </div>

      {/* ── 求职意向 ── */}
      <FieldRow label="求职意向" fieldKey="jobTarget">
        <input
          className={inputClass}
          value={profile.jobTarget ?? ''}
          onChange={(e) => updateProfile({ jobTarget: e.target.value })}
          placeholder="如：Java 后端工程师"
        />
      </FieldRow>

      {/* ── 电话 ── */}
      <FieldRow label="电话" fieldKey="phone">
        <input
          className={inputClass}
          value={profile.phone ?? ''}
          onChange={(e) => updateProfile({ phone: e.target.value })}
          placeholder="请输入手机号"
        />
      </FieldRow>

      {/* ── 邮箱 ── */}
      <FieldRow label="邮箱" fieldKey="email">
        <input
          className={inputClass}
          value={profile.email ?? ''}
          onChange={(e) => updateProfile({ email: e.target.value })}
          placeholder="请输入邮箱"
        />
      </FieldRow>

      {/* ── 性别 ── */}
      <FieldRow label="性别" fieldKey="gender">
        <div className="flex gap-2">
          {['男', '女', '其他'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => updateProfile({ gender: g })}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${
                profile.gender === g
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </FieldRow>

      {/* ── 工作年限 ── */}
      <FieldRow label="工作年限" fieldKey="experienceYears">
        {/* 预设快选 */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {EXP_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => updateProfile({ experienceYears: preset })}
              className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                profile.experienceYears === preset
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
        {/* 自定义输入 */}
        <div className="relative">
          <input
            className={inputClass + ' pr-16'}
            value={profile.experienceYears ?? ''}
            onChange={(e) => updateProfile({ experienceYears: e.target.value })}
            placeholder="自定义，如：4年半经验"
          />
          {profile.experienceYears && !EXP_PRESETS.includes(profile.experienceYears) && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500">
              自定义
            </span>
          )}
        </div>
      </FieldRow>

      {/* ── 政治面貌 ── */}
      <FieldRow label="政治面貌" fieldKey="politicalStatus">
        <input
          className={inputClass}
          value={profile.politicalStatus ?? ''}
          onChange={(e) => updateProfile({ politicalStatus: e.target.value })}
          placeholder="如：群众、中共党员"
        />
      </FieldRow>

      {/* ── 自定义信息 ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">自定义信息</span>
          <button
            onClick={addExtra}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
          >
            <Plus size={12} /> 添加
          </button>
        </div>
        {profile.extras.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-2 border border-dashed border-slate-200 rounded-lg">
            暂无自定义信息，点击「添加」新增
          </div>
        )}
        {profile.extras.map((e) => (
          <div key={e.id} className="flex gap-2 mb-2 items-center">
            <input
              className="w-24 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={e.label}
              placeholder="标签名"
              onChange={(ev) => updateExtra(e.id, { label: ev.target.value })}
            />
            <input
              className="flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={e.value}
              placeholder="内容"
              onChange={(ev) => updateExtra(e.id, { value: ev.target.value })}
            />
            <button
              onClick={() => removeExtra(e.id)}
              className="text-red-400 hover:text-red-500 flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileEditor;
