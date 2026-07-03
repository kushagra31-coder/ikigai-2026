import { Badge } from "../primitives/badge";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: 'ADMIN' | 'MENTOR' | 'TEAM' | 'VISITOR';
  className?: string;
}

export const RoleBadge = ({ role, className }: RoleBadgeProps) => {
  const styles = {
    ADMIN: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    MENTOR: "bg-accent text-accent-foreground hover:bg-accent/80",
    TEAM: "bg-primary text-primary-foreground hover:bg-primary/80",
    VISITOR: "bg-muted text-muted-foreground hover:bg-muted/80",
  };

  return (
    <Badge className={cn("px-2 py-0.5 font-mono text-tiny", styles[role], className)}>
      {role}
    </Badge>
  );
};
