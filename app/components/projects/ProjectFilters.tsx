import { ProjectCategory } from "@/app/components/projects/types";

type ProjectFiltersProps = {
  activeCategory: ProjectCategory;
  categories: ProjectCategory[];
  onChange: (category: ProjectCategory) => void;
};

export default function ProjectFilters({
  activeCategory,
  categories,
  onChange,
}: ProjectFiltersProps) {
  return (
    <section className="bg-background-dark px-6 py-2 lg:px-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onChange(category)}
                className={`whitespace-nowrap rounded-full border border-surface-border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary"
                    : "bg-surface-dark text-secondary hover:-translate-y-0.5"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
