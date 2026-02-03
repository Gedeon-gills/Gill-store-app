interface ChartData {
  labels: string[];
  data: number[];
}

interface SimpleLineChartProps {
  data: ChartData;
  color?: string;
  height?: number;
}

export const SimpleLineChart = ({ data, color = '#8b5cf6', height = 120 }: SimpleLineChartProps) => {
  const maxValue = Math.max(...data.data);
  const minValue = Math.min(...data.data);
  const range = maxValue - minValue || 1;

  const points = data.data.map((value, index) => {
    const x = (index / (data.data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
        
        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        
        {/* Points */}
        {data.data.map((value, index) => {
          const x = (index / (data.data.length - 1)) * 100;
          const y = 100 - ((value - minValue) / range) * 80 - 10;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill={color}
              className="hover:r-6 transition-all cursor-pointer"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 mt-2">
        {data.labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};