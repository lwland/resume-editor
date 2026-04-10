import React from 'react';

interface EndDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  inputClass: string;
}

/**
 * 结束时间选择器：支持月份选择 + 「至今」快捷按钮
 */
const EndDatePicker: React.FC<EndDatePickerProps> = ({ value, onChange, inputClass }) => {
  const isPresent = value === '至今';

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500 flex-1">结束时间</label>
        <button
          type="button"
          onClick={() => onChange(isPresent ? '' : '至今')}
          className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
            isPresent
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-500 border-slate-300 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          至今
        </button>
      </div>
      {!isPresent && (
        <input
          className={inputClass}
          type="month"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default EndDatePicker;
