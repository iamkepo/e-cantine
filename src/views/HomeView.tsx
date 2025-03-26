import React, { useState } from "react";
import { useThemeStore } from "../stores/themeStore";
import { articles, caterogies, tags, types } from "../helpers/constants";
import { categoryRender, tagRender } from "../helpers/functions";
import { modal } from "../stores/appStore";
import ArticleComponent from "../components/ArticleComponent";
import LightBox from "../components/widgets/LightBox";
import { Dropdown } from "../components/widgets/Dropdown";

const HomeView: React.FC = () => {
  const { theme } = useThemeStore();
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tagSelect = (id: number | null) => {
    setSelectedTag(id === selectedTag ? null : id); // Toggle selection
  };

  const typeSelect = (id: number | null) => {
    setSelectedType(id === selectedType ? null : id); // Toggle selection
  };

  const categorySelect = (id: number | null) => {
    setSelectedCategory(id === selectedCategory ? null : id); // Toggle selection
  };

  const filteredArticles = articles.filter((article) => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    const matchesType = selectedType ? article.type === selectedType : true;
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSearch = article.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesType && matchesCategory && matchesSearch;
  });

  const prev = (index: number) => {
    if (index >= 0) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleComponent article={filteredArticles[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles.length) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleComponent article={filteredArticles[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  return (
    <div className="col-lg-10 col-12 mx-auto">
      <div className="row mt-5">
        <ul className="col col-md-7 nav nav-tabs">
          {
            caterogies.map((caterogie, i) => (
              <li key={i} className="nav-item">
                <a
                  className={`nav-link text-bg-${selectedCategory === caterogie.id ? "primary active" : theme}`} 
                  aria-current="page" 
                  href="#"
                  onClick={() => categorySelect(caterogie.id)}
                >
                  {caterogie.label}
                </a>
              </li>
            ))
          }
        </ul>
        <div className="col col-md-3">
          <input 
            className={`form-control text-bg-${theme}`} 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            onChange={(e) => setSearchQuery(e.target.value)} // Added search functionality
          />
        </div>
        <div className="col col-md-2">
          <Dropdown 
            options={types.map(type => ({
              label: type.label,
              action: () => typeSelect(type.id)
            }))}
            chevron
          />
        </div>
      </div>
      <p className="mt-4">
        <span className="me-3">Filter by Tag:</span> 
        {
          tags.map((tag, j) => (
            <span
              key={j}
              className={`badge cursor-pointer me-2 text-bg-${selectedTag === tag.id ? "primary" : "secondary"}`}
              onClick={() => tagSelect(tag.id)}
              title={tag.description} // Added tooltip
            >
              {tag.label}
            </span>
          ))
        }
      </p>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {
          filteredArticles.map((article, i) => (
            <div 
              key={i} 
              className="col"
              onClick={() => modal.open(
                <LightBox prev={() => prev(i - 1)} next={() => next(i + 1)}>
                  <ArticleComponent article={article} />
                </LightBox>,
                "xl"
              )}
            >
              <div className={`card text-bg-${theme}`}>
                <img 
                  src={article.img} 
                  className="card-img-top" 
                  alt={article.label} 
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6 className="badge text-bg-primary float-end">
                    {categoryRender(article.category)}
                  </h6>
                  <h5 className="card-title text-truncate">
                    {article.label}
                  </h5>
                  { 
                    selectedTag == null ? 
                    <p className="card-text text-truncate">
                      { 
                        article.tags.map((tag, j) => (
                          <span key={j} className="badge text-bg-secondary me-2">
                            {tagRender(tag)}
                          </span>
                        ))
                      }
                    </p>
                    : false
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default HomeView;