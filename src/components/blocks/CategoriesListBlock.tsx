"use client";
import { useThemeStore } from "@/stores/themeStore";

interface Props {
  missingCategories: { id: number, name: string, checked: boolean }[];
  handleCategory: (id: number) => void;
  ignoreCategory: (id: number) => void;
}

const CategoriesListBlock: React.FC<Props> = ({ missingCategories, handleCategory, ignoreCategory }) => {
  const { theme } = useThemeStore();

  return (
    missingCategories.map((el) => (
      <li key={el.id} className={`list-group-item text-bg-${theme}`}>
        <span>{el.name}</span> 
        {el.checked ? 
        <i className="bi bi-check2-square ms-2"></i> 
        :
        <>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-success ms-2" 
            onClick={() => handleCategory(el.id as number)}
          >
            Ajouter
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary ms-2" 
            onClick={() => ignoreCategory(el.id as number)}
          >
            Ignorer
          </button>
        </>
      }
    </li>
  ))
);
}

export default CategoriesListBlock;
