import React from 'react';
import { Outlet, useParams } from "react-router-dom";
import { categories, tags, types } from '../core/constants';
import { useThemeStore } from '../stores/themeStore';
import { priceSelect, setSearchQuery, tagSelect, typeSelect, useFilterStore } from '../stores/filterStore';
import { Dropdown } from '../components/widgets/Dropdown';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';


const FilterLayout: React.FC = () => {  
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();
  const { id } = useParams();
  const { user } = useAuthStore();

  return (
    <div className="col-12 col-lg-11 p-3 mx-auto">
      <div className="col-12 clearfix py-3 my-3">
        <div className="float-end">
          { user == null ?
            <>
              <Link className={`btn btn-${theme}`} to='/login'>
                <i className={`bi bi-box-arrow-in-right fs-6`}>
                </i>
              </Link> 
              <Link className={`btn btn-${theme}`} to='/register'>
                <i className={`bi bi-box-arrow-in-right fs-6`}>
                </i>
              </Link>
            </>
            :
            <Link className={`btn btn-${theme}`} to='/logout'>
              <i className={`bi bi-box-arrow-in-left fs-6`}>
              </i>
            </Link>
          }
        </div>
        <ul className="nav nav-tabs">
          {
            categories.map((category, i) => (
              <li key={i} className="nav-item">
                <Link
                  className={`nav-link text-bg-${((id == undefined && category.id == null) || parseInt(id as string) === category.id) ? "primary active" : theme}`} 
                  to={(category.id != null ? ""+category.id : '')}
                >
                  {category.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
        
      <div className="row">
        <div className="col col-lg-3">
          <div className={`card sticky-lg-top text-bg-${theme} p-3 shadow-sm`}>
            <div className="filter-group mb-3">
              <h6 className="mb-3">Search:</h6>
              <input 
                className={`form-control text-bg-${theme}`} 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                onChange={(e) => setSearchQuery(e.target.value)} // Added search functionality
              />
            </div>
            <div className="filter-group">
              <h6 className="mb-3">Filter by Tag:</h6>
              <p>
                { tags.map((tag, j) => (
                  <span
                    key={j}
                    className={`badge cursor-pointer me-2 mb-2 text-bg-${selected.tag === tag.id ? "primary" : "secondary"}`}
                    onClick={() => tagSelect(tag.id)}
                    title={tag.description} // Added tooltip
                  >
                    {tag.label}
                  </span>
                ))}
              </p>
            </div>

            <div className="filter-group mb-3">
              <h6 className="mb-3">Filter by Type:</h6>
              <Dropdown 
                options={types.map(type => ({
                  label: type.label,
                  action: () => typeSelect(type.id)
                }))}
                chevron
              />
            </div>

            <div className="filter-group">
              <h6 className="mb-3">Price Range</h6>
              <input 
                type="range" 
                className="form-range" 
                min="0" 
                max="2000" 
                onChange={(e) => priceSelect(parseInt(e.target.value))}
              />
                
              <p className="fs-6 d-flex justify-content-between">
                <span className="text-start">0 XOF</span>
                <span className="text-end">2000 XOF</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FilterLayout;