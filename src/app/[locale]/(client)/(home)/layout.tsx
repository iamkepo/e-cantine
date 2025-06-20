"use client";
import React, { useEffect, useMemo, Suspense, lazy, useState } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { priceSelect, setSearchQuery, tagSelect, useFilterStore } from '@/stores/filterStore';
import { useParams } from 'next/navigation';
import { ICategory, ITag } from '@/core/interfaces';
import { MetaResponse } from '@/core/types';
import TagRepository from '@/frontend/repositories/tag.repository';
import CategoryRepository from '@/frontend/repositories/category.repository';
import BlockSkeleton from '@/components/widgets/BlockSkeleton';
import { metaResponse } from '@/core/constants';

const LazyTagsBlock = lazy(() => import("@/components/blocks/TagsBlock"));
const LazyCategoriesNavBlock = lazy(() => import("@/components/blocks/CategoriesNavBlock"));

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();
  const params = useParams();
  
  const [categories, setCategories] = useState<MetaResponse<ICategory>>(metaResponse);
  const [tags, setTags] = useState<MetaResponse<ITag>>(metaResponse);

  const categoryRepository = useMemo(() => new CategoryRepository(), []);
  const tagRepository = useMemo(() => new TagRepository(), []);

  const [isInitialLoad] = useState(true);

  useEffect(() => {
    categoryRepository.fetchCategories({ orderBy: 'id', sort: 'asc' }, (data) => setCategories(data));
    tagRepository.fetchTags({take: 100}, (data) => setTags(data));
  }, [categoryRepository, tagRepository, isInitialLoad]);
  

  return (
    <div className="row">
      <div className="col-12 clearfix mb-3 mb-md-0">
        <div className="row g-2 mb-3">
          <div className="col-md-9 mb-3 mb-md-0">
            <ul className="nav nav-tabs h-85 flex-lg-wrap flex-nowrap gap-2 overflow-scroll mb-3">
              <Suspense fallback={<BlockSkeleton count={5} className="nav-item" />}>
                <LazyCategoriesNavBlock 
                  categories={(categories.data as (ICategory&{articles: {id: number}[]})[]).filter(el => el.articles.length > 0)} 
                  id={params.id ? parseInt(params.id as string) : undefined} 
                />
              </Suspense>
            </ul>
          </div>
          <div className="col-md-3">
            <input 
              className={`form-control text-bg-${theme}`} 
              type="search" 
              placeholder="Rechercher" 
              aria-label="Rechercher" 
              onChange={(e) => setSearchQuery(e.target.value)} // Added search functionality
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 mb-3 mb-md-0">
        <div className={`card sticky-lg-top text-bg-${theme} p-2 p-md-3 shadow-sm`}>
          <div className="filter-group">
            <h6 className="mb-3">Filter by Tag:</h6>
            <div className='d-flex flex-lg-wrap flex-nowrap gap-2 overflow-scroll mb-3'>
              <Suspense fallback={<BlockSkeleton count={10} className="btn btn-sm btn-outline-primary" />}>
                <LazyTagsBlock 
                  tags={(tags.data as (ITag&{connections: {articleId: number}[]})[]).filter(el => el.connections.length > 0)} 
                  onSelect={tagSelect}
                  tagIds={selected.tagIds ?? undefined} 
                />
              </Suspense>
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