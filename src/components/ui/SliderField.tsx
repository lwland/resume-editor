
interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  onChange: (val: number) => void;
  displayValue?: string;
}

const SliderField: React.FC<SliderFieldProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  leftLabel,
  rightLabel,
  onChange,
  displayValue,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
          {displayValue ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400">{leftLabel}</span>
          <span className="text-xs text-slate-400">{rightLabel}</span>
        </div>
      )}
    </div>
  );
};

export default SliderField;
