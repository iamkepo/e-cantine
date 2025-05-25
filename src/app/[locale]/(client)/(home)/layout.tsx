"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { priceSelect, setSearchQuery, tagSelect, useFilterStore } from '@/stores/filterStore';
import { useParams } from 'next/navigation';
import { useLangStore } from '@/stores/langStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ICategory, ITag } from '@/core/interfaces';
import { Meta } from '@/core/types';
import TagRepository from '@/repositories/tagRepository';
import CategoryRepository from '@/repositories/categoryRepository';
import { meta } from '@/core/constants';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();
  const params = useParams();
  const { lang } = useLangStore();
  const route = usePathname();
  const [categories, setCategories] = useState<{ data: ICategory[], meta: Meta }>({ data: [], meta});
  const categoryRepository = useMemo(() => new CategoryRepository(setCategories), []);
  const [tags, setTags] = useState<{ data: ITag[], meta: Meta }>({ data: [], meta});
  const tagRepository = useMemo(() => new TagRepository(setTags), []);

  useEffect(() => {
    categoryRepository.fetchCategories({});
    tagRepository.fetchTags({take: 100});
  }, [categoryRepository, tagRepository]);

  useEffect(() => {
  }, [selected, route, params]);
  

  return (
    <div className="row">
      <div className="col-12 clearfix mb-3 mb-md-0">
        <div className="row mb-3">
          <div className="col-md-9 mb-3 mb-md-0">
            <ul className="nav nav-tabs">
              <li>
                <Link
                  className={`nav-link text-bg-${((params.id == undefined) || parseInt(params.id as string) === null) ? "primary active" : theme}`} 
                  href={'/'+lang}
                >
                  Tous
                </Link>
              </li>
              { categories.data.map((category, i) => (
                <li key={i} className="nav-item">
                  <Link
                    className={`nav-link text-bg-${(category.id == null || parseInt(params.id as string) === category.id) ? "primary active" : theme}`} 
                    href={'/'+lang+'/'+ (category.id != null ? category.id : '')}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <div className="float-md-end">
              <input 
                className={`form-control text-bg-${theme}`} 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                onChange={(e) => setSearchQuery(e.target.value)} // Added search functionality
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 mb-3 mb-md-0">
        <div className={`card sticky-lg-top text-bg-${theme} p-2 p-md-3 shadow-sm`}>
          <div className="filter-group">
            <h6 className="mb-3">Filter by Tag:</h6>
            <div className='d-flex flex-lg-wrap flex-nowrap gap-2 overflow-scroll'>
              <button
                type="button"
                className={`btn btn-sm btn-${selected.tagIds === null ? "primary" : "outline-primary"}`}
                onClick={() => tagSelect(null)}
              >
                Tous
              </button>
              { tags.data.map((tag, j) => (
                <button
                  key={j}
                  type="button"
                  className={`btn btn-sm btn-${selected.tagIds?.includes(tag.id as number) ? "primary" : "outline-primary"}`}
                  onClick={() => tagSelect(tag.id as number)}
                  title={tag.name}
                >
                  {tag.name}
                </button>
              ))}
            </div>
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

      <div className="col-12 col-md-8 col-lg-9">
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;