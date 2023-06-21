import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel?: React.ElementType;
}

const PageTitle: React.FC<HeadingProps> = ({
  headingLevel = "h1",
  children,
  className,
}) => {
  const Heading = headingLevel;

  return (
    <Heading className={cn("text-2xl font-bold", className)}>
      {children}
    </Heading>
  );
};

export default PageTitle;
