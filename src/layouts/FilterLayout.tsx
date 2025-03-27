import React from 'react';
import { Outlet, useParams } from "react-router-dom";
import { categories, tags, types } from '../helpers/constants';
import { useThemeStore } from '../stores/themeStore';
import { setSearchQuery, tagSelect, typeSelect, useFilterStore } from '../stores/filterStore';
import { Dropdown } from '../components/widgets/Dropdown';
import { Link } from 'react-router-dom';


const FilterLayout: React.FC = () => {  
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();
  const { id } = useParams();

  return (
    <div className="col-lg-10 col-12 mx-auto">
      <div className="row mt-5">
        <ul className="col col-md-9 nav nav-tabs">
          {
            categories.map((category, i) => (
              <li key={i} className="nav-item">
                <Link
                  className={`nav-link text-bg-${((id == undefined && category.id == null) || parseInt(id as string) === category.id) ? "primary active" : theme}`} 
                  to={"/category/"+(category.id != null ? category.id : '')}
                >
                  {category.label}
                </Link>
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
      </div>
      <div className="my-4">
        <div className="float-end">
          <Dropdown 
            options={types.map(type => ({
              label: type.label,
              action: () => typeSelect(type.id)
            }))}
            chevron
          />
        </div>
        <p className='clearfix'>
          <span className="me-3">Filter by Tag:</span> 
          {
            tags.map((tag, j) => (
              <span
                key={j}
                className={`badge cursor-pointer me-2 text-bg-${selected.tag === tag.id ? "primary" : "secondary"}`}
                onClick={() => tagSelect(tag.id)}
                title={tag.description} // Added tooltip
              >
                {tag.label}
              </span>
            ))
          }
        </p>
      </div>

      <Outlet />
      
    </div>
  );
};

export default FilterLayout;