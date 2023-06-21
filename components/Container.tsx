import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("max-w-7xl mx-auto", className)}>{children}</div>
  );
};

export default Container;
