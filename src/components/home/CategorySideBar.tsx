import {CategorySidebarProps} from "../../types/home.type";

export default function CategorySidebar({
  categories,
}: CategorySidebarProps) {
  return (
    <aside className="hidden min-w-[220px] border-r border-gray-200 pr-4 lg:block">
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category}
            className="flex cursor-pointer items-center justify-between text-[16px] leading-6 font-normal"
          >
            <span>{category}</span>

            {(category === "Woman's Fashion" ||
              category === "Men's Fashion") && (
              <span>›</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}