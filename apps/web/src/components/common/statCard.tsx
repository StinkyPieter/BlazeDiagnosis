import { Card, CardContent, CardHeader, CardLabel } from '@/components/ui/card';
import type { StatCardProps } from '@/types/ui';

export function StatCard({ description, icon, label, value }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <CardLabel>{label}</CardLabel>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
