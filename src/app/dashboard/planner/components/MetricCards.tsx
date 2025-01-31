import { Card, CardContent } from "@/components/ui/card";
import { Target, BadgeCheck, Clock, TrendingUp } from 'lucide-react';
import { themeClasses } from '@/lib/theme';

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard
        title="Goals Set"
        value="4"
        subtitle="On Track"
        subvalue="2"
        change="50%"
        icon={<Target className="h-6 w-6 text-blue-600" />}
        iconBg="bg-blue-100"
      />
      <MetricCard
        title="Key Insights"
        value="6"
        subtitle="New This Week"
        subvalue="3"
        change="↑ 2"
        icon={<BadgeCheck className="h-6 w-6 text-green-600" />}
        iconBg="bg-green-100"
      />
      <MetricCard
        title="Actions"
        value="12/20"
        subtitle="Complete"
        subvalue="60%"
        change="↑ 5%"
        icon={<Clock className="h-6 w-6 text-purple-600" />}
        iconBg="bg-purple-100"
      />
      <MetricCard
        title="Progress"
        value="75%"
        subtitle="Overall"
        subvalue="Complete"
        change="↑ 8%"
        icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        iconBg="bg-orange-100"
      />
    </div>
  );
};

const MetricCard = ({ title, value, subtitle, subvalue, change, icon, iconBg }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={themeClasses.textSecondary}>{title}</p>
            <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{value}</p>
          </div>
          <div className={`p-2 rounded-lg ${iconBg}`}>
            {icon}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className={`text-sm ${themeClasses.textSecondary}`}>{subtitle}</p>
            <p className={`font-medium ${themeClasses.textPrimary}`}>{subvalue}</p>
          </div>
          <p className={themeClasses.success}>{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}; 