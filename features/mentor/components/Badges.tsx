import { Badge } from '@/components/primitives/badge';
import { TaskPriority, TaskStatus, SubmissionStatus } from '../types';
import { EvaluationStatus } from '@/features/evaluation/types';

export function SessionBadge({ status }: { status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' }) {
  const styles = {
    ACTIVE: 'bg-success/20 text-success border-success/20',
    UPCOMING: 'bg-primary/20 text-primary border-primary/20',
    COMPLETED: 'bg-white/10 text-muted-foreground border-white/10',
  };
  return <Badge className={`${styles[status]} font-semibold`}>{status}</Badge>;
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const styles = {
    LOW: 'bg-white/10 text-muted-foreground border-white/10',
    MEDIUM: 'bg-info/20 text-info border-info/20',
    HIGH: 'bg-warning/20 text-warning border-warning/20',
    CRITICAL: 'bg-destructive/20 text-destructive border-destructive/20',
  };
  return <Badge className={`${styles[priority]}`}>{priority}</Badge>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const styles = {
    PENDING: 'bg-warning/20 text-warning border-warning/20',
    ACCEPTED: 'bg-info/20 text-info border-info/20',
    IN_PROGRESS: 'bg-primary/20 text-primary border-primary/20',
    SUBMITTED: 'bg-success/20 text-success border-success/20',
    APPROVED: 'bg-success text-success-foreground border-success',
    REJECTED: 'bg-destructive/20 text-destructive border-destructive/20',
    OVERDUE: 'bg-destructive text-destructive-foreground border-destructive',
  };
  return <Badge className={`${styles[status]}`}>{status.replace('_', ' ')}</Badge>;
}

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const styles = {
    NOT_STARTED: 'bg-white/10 text-muted-foreground border-white/10',
    DRAFT: 'bg-warning/20 text-warning border-warning/20',
    SUBMITTED: 'bg-success/20 text-success border-success/20',
  };
  return <Badge className={`${styles[status]}`}>{status.replace('_', ' ')}</Badge>;
}

export function EvaluationStatusBadge({ status }: { status: EvaluationStatus }) {
  const styles = {
    IDLE: 'bg-white/10 text-muted-foreground border-white/10',
    DRAFT: 'bg-warning/20 text-warning border-warning/20',
    SUBMITTED: 'bg-success/20 text-success border-success/20',
  };
  return <Badge className={`${styles[status]}`}>{status}</Badge>;
}
