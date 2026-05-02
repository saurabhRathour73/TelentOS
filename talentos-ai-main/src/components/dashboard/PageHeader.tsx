interface Props { title: string; description?: string; children?: React.ReactNode }
export const PageHeader = ({ title, description, children }: Props) => (
  <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
    {children}
  </div>
);
