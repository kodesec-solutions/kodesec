import { ProjectCategory } from "@/components/projects/types";

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
    <section className="bg-[#030609] px-6 py-4 lg:px-20 relative z-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="no-scrollbar flex flex-wrap gap-2.5 justify-center">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onChange(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-mono font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(54,226,123,0.3)]"
                    : "bg-[#0D121F]/80 border border-white/10 text-gray-300 hover:text-white hover:border-white/25 hover:-translate-y-0.5"
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
