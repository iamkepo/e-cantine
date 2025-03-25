import React, { useState } from "react";
import { useThemeStore } from "../stores/themeStore";
import { articles } from "../helpers/constants";

const HomeView: React.FC = () => {
  const { theme } = useThemeStore();
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const tags = [
    { id: null, label: "Tous", description: "Dishes" },
    { id: 1, label: "Vegetarian", description: "Dishes without meat or fish" },
    { id: 2, label: "Vegan", description: "Dishes without animal products" },
    { id: 3, label: "Gluten-Free", description: "Dishes without gluten" },
    { id: 4, label: "Meat", description: "Dishes with meat" }, // New tag for meat dishes
  ];
  const types = [
    { id: null, label: "All Types" },
    { id: 1, label: "Principal" },
    { id: 2, label: "Supplement" },
    { id: 3, label: "Accompagnement" },
  ];
  const caterogies = [
    { id: 1, label: "Petit degener" },
    { id: 2, label: "Degener" },
    { id: 3, label: "Gouter" },
    { id: 4, label: "Diner" },
  ];

  const tagSelect = (id: number | null) => {
    setSelectedTag(id === selectedTag ? null : id); // Toggle selection
  };

  const typeSelect = (id: number | null) => {
    setSelectedType(id === selectedType ? null : id); // Toggle selection
  };

  const tagRender = (id: number) => {
    const tag = tags.find((tag) => tag.id === id);
    return tag ? tag.label : "Unknown";
  };
  const categoryRender = (id: number) => {
    const category = caterogies.find((category) => category.id === id);
    return category ? category.label : "Unknown";
  };
  const filteredArticles = articles.filter((article) => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    const matchesType = selectedType ? article.type === selectedType : true;
    return matchesTag && matchesType;
  });

  return (
    <div className="col-lg-10 col-12 mx-auto">
      <ul className="nav nav-tabs mt-5">
        {
          types.map((type, i) => (
            <li key={i} className="nav-item">
              <a
                className={`nav-link text-bg-${selectedType === type.id ? "primary active" : theme}`} 
                aria-current="page" 
                href="#"
                onClick={() => typeSelect(type.id)}
              >
                {type.label}
              </a>
            </li>
          ))
        }
      </ul>
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
            <div key={i} className="col">
              <div className={`card text-bg-${theme}`}>
                <img 
                  src={article.img} 
                  className="card-img-top" 
                  alt={article.label} 
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6 className="card-title">{article.label} 
                    <span className="badge text-bg-primary float-end">
                      {categoryRender(article.category)}
                    </span>
                  </h6>
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
      <br /><br /><br /><br />
    </div>
  );
};

export default HomeView;