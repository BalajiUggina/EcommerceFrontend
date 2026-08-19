interface SectionHeaderProps {
  tag: string;
  title: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  tag,
  title,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        {/* Tag */}

        <div className="flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-primary" />

          <span className="text-sm font-semibold text-primary">{tag}</span>
        </div>

        {/* Title */}

        <h2 className="text-[36px] font-semibold leading-[48px] tracking-[0.04em]">
          {title}
        </h2>
      </div>

      {action}
    </div>
  );
}
