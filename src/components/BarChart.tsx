interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  color?: string;
  height?: number;
}

export const BarChart = ({ data, color = '#8b5cf6', height = 200 }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40);
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative group">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{
                    height: barHeight,
                    backgroundColor: color,
                    minHeight: '4px'
                  }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
              </div>
              <span className="text-xs text-slate-500 text-center">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};