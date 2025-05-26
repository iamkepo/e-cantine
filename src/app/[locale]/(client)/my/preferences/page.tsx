"use client";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { useThemeStore } from "@/stores/themeStore";
import TagRepository from "@/repositories/tagRepository";
import { useMemo } from "react";
import { useCheckList } from "@/hooks/useCheckList";
import { Meta } from "@/core/types";
import { ITag } from "@/core/interfaces";
import { meta } from "@/core/constants";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
// import PreferencesRepository from "@/repositories/preferenceRepository";

const LazyTagsBlock = lazy(() => import("@/components/blocks/TagsBlock"));

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [tags, setTags] = useState<{ data: ITag[], meta: Meta }>({ data: [], meta});
  const tagRepository = useMemo(() => new TagRepository(setTags), []);
  // const [preferences, setPreferences] = useState<{ data: IPreference[], meta: Meta }>({ data: [], meta});
  // const preferenceRepository = useMemo(() => new PreferencesRepository(setPreferences), []);
  const { checkList, handleCheckList } = useCheckList(tags.data.map(tag => tag.id as number));


  useEffect(() => {
    tagRepository.fetchTags({take: 100});
    // preferenceRepository.fetchPreferences({});
  }, [tagRepository]);


  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title text-break">Choisissez vos préférences</h4>
          <button 
            type="button" 
            className="btn btn-primary" 
          >
            <i className="bi bi-save"></i>
            <span className="d-none d-md-inline-block ms-2 fw-bold">Enregistrer</span>
          </button>
        </div>
        <hr />
        <div className="d-flex flex-wrap gap-2">
          <Suspense fallback={<BlockSkeleton count={10} className={`list-group-item text-bg-${theme}`} />}>
            <LazyTagsBlock tags={tags.data} tagSelect={handleCheckList} tagIds={checkList} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
