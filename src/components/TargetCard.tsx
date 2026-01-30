import { FaArrowUp, FaBullseye } from 'react-icons/fa';

export const TargetCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-100 rounded-2xl">
          <FaBullseye className="text-purple-600 text-xl" />
        </div>
        <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
          <FaArrowUp className="text-xs" />
          <span>12.5%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-800">$24,500</h3>
        <p className="text-slate-500 text-sm">Monthly Target</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">Progress</span>
            <span className="font-medium text-slate-800">68%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};