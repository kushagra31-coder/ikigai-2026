import { Icons } from "../constants/icons";
import { Button } from "../primitives/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onHome?: () => void;
}

export const ErrorState = ({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred while loading this data.", 
  onRetry,
  onHome
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 rounded-xl border border-destructive/20 bg-destructive/5">
      <div className="p-4 rounded-full bg-destructive/10 animate-pulse">
        <Icons.error className="w-10 h-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-heading-m text-destructive">{title}</h3>
        <p className="text-body-m text-muted-foreground max-w-sm">{message}</p>
      </div>
      <div className="flex items-center gap-4">
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try Again
          </Button>
        )}
        {onHome && (
          <Button onClick={onHome}>
            Return Home
          </Button>
        )}
      </div>
    </div>
  );
};
