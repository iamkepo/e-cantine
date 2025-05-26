import { ICategory } from "@/core/interfaces";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";

interface Props {
  categories: ICategory[];
  id?: number;
}

const CategoriesNavBlock: React.FC<Props> = ({ categories, id }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  return (
    categories.map((category, i) => (
      <li key={i} className="nav-item">
        <Link
          className={`nav-link text-truncate text-bg-${(category.id == null || id === category.id) ? "primary active" : theme}`} 
          href={'/'+lang+'/'+ (category.id != null ? category.id : '')}
        >
          {category.name}
        </Link>
      </li>
    ))
  );
};

export default CategoriesNavBlock;
