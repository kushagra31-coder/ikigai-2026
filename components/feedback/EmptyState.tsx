import { Icons, IconType } from "../constants/icons";
import { Button } from "../primitives/button";

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon: Icon = Icons.info, title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-xl border border-dashed border-muted-foreground/30 bg-card/10">
      <div className="p-4 rounded-full bg-muted/50">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-heading-m">{title}</h3>
      <p className="text-body-m text-muted-foreground max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
