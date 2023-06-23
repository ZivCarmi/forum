import { cn, formatDate } from "@/lib/utils";

export interface DateProps extends React.HTMLAttributes<HTMLTimeElement> {
  prefix?: string;
  date: Date | undefined;
}

const Date: React.FC<DateProps> = ({ prefix, date, className }) => {
  const formattedDate = formatDate(date);

  return (
    <time className={cn("block text-muted", className)}>
      {prefix} {formattedDate}
    </time>
  );
};

export default Date;
