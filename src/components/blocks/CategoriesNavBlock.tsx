"use client";
import { ICategory } from "@/core/interfaces";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";

interface Props {
  categories: ICategory[] | null;
  id?: number;
}

const CategoriesNavBlock: React.FC<Props> = ({ categories, id }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  return (
    <>
      <li className="nav-item">
        <Link
          className={`nav-link text-truncate text-bg-${(id == undefined) ? "primary active" : theme}`} 
          href={'/'+lang}
        >
          Tous les catégories
        </Link>
      </li>
      {categories?.map((category, i) => (
        <li key={i} className="nav-item">
          <Link
            className={`nav-link text-truncate text-bg-${(category.id == null || id === category.id) ? "primary active" : theme}`} 
            href={'/'+lang+'/'+ (category.id != null ? category.id : '')}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default CategoriesNavBlock;
