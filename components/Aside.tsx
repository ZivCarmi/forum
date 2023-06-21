const Aside = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <aside className="flat self-start">
      <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-t">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul>{children}</ul>
    </aside>
  );
};
export default Aside;
