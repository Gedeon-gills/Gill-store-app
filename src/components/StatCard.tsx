interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

export default function StatCard({ title, value, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <small className={`text-sm font-medium ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend}
      </small>
    </div>
  );
}