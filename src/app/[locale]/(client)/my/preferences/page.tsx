"use client";
import React, { useEffect, useMemo, Suspense, lazy } from "react";
import { useThemeStore } from "@/stores/themeStore";
import TagRepository from "@/repositories/tagRepository";
import { ITag, IPreference } from "@/core/interfaces";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import PreferencesRepository from "@/repositories/preferenceRepository";
import { toast } from "@/stores/appStore";
import useDataFetch from "@/hooks/useDataForm";
import { Meta } from "@/core/types";

const LazyTagsBlock = lazy(() => import("@/components/blocks/TagsBlock"));

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const tags = useDataFetch<ITag>();
  const preferences = useDataFetch<IPreference>();
  
  const tagRepository = useMemo(() => new TagRepository(tags), [tags]);
  const preferenceRepository = useMemo(() => new PreferencesRepository(preferences), [preferences]);

  useEffect(() => {
    tagRepository.fetchTags({take: 100});
    preferenceRepository.fetchPreferences({clientId: 1, take: 100});
  }, [tagRepository, preferenceRepository]);

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
            <LazyTagsBlock 
              tags={(tags.state.get?.data as {data: ITag[], meta: Meta})?.data} 
              tagIds={(preferences.state.get?.data as {data: IPreference[], meta: Meta})?.data.map(preference => preference.tagId as number)} 
              onSelect={(id) => {
                preferenceRepository.createPreference({ tagId: id, clientId: 1 } as IPreference)
                .then(() => preferenceRepository.fetchPreferences({clientId: 1, take: 100}))
                .catch((error) => toast.danger(error.response?.data?.error));
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
