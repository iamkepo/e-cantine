"use client";
import { ICategory } from "@/core/interfaces";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";

interface Props {
  categories: (ICategory&{articles: {id: number}[]})[] | null;
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
          <span className="text-truncate">Tous les catégories</span>
          <span className={`ms-2 badge bg-${id == undefined ? theme : 'primary'}`}>{categories?.map((category) => category.articles.length).reduce((a, b) => a + b, 0)}</span>
        </Link>
      </li>
      {categories?.map((category, i) => (
        <li key={i} className="nav-item">
          <Link
            className={`nav-link text-truncate text-bg-${(id == category.id) ? "primary active" : theme}`} 
            href={'/'+lang+'/'+ (category.id != null ? category.id : '')}
          >
            <span className="text-truncate">{category.name}</span>
            <span className={`ms-2 badge bg-${id == category.id ? theme : 'primary'}`}>{category.articles.length}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default CategoriesNavBlock;
