import { Icons } from "../constants/icons";

export const Spinner = ({ className = "w-6 h-6", ...props }: React.HTMLAttributes<SVGElement>) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Icons.spinner className={`animate-spin text-primary ${className}`} {...props} />
    </div>
  );
};
