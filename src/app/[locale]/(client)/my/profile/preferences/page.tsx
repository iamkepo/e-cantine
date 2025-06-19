"use client";
import React, { useEffect, useMemo, Suspense, lazy } from "react";
import { useThemeStore } from "@/stores/themeStore";
import TagRepository from "@/repositories/tagRepository";
import { ITag, IPreference } from "@/core/interfaces";
import BlockSkeleton from "@/components/widgets/BlockSkeleton";
import PreferencesRepository from "@/repositories/preferenceRepository";
import { toast } from "@/stores/appStore";
import { MetaResponse } from "@/core/types";
import { useState } from "react";
import { metaResponse } from "@/core";

const LazyTagsBlock = lazy(() => import("@/components/blocks/TagsBlock"));

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [ tags, setTags ] = useState<MetaResponse<ITag>>(metaResponse);
  const [ preferences, setPreferences ] = useState<MetaResponse<IPreference>>(metaResponse);
  
  const tagRepository = useMemo(() => new TagRepository(), []);
  const preferenceRepository = useMemo(() => new PreferencesRepository(), []);

  useEffect(() => {
    tagRepository.fetchTags({take: 100}, (data) => setTags(data));
    preferenceRepository.fetchPreferences({clientId: 1, take: 100}, (data) => setPreferences(data));
  }, [tagRepository, preferenceRepository]);

  return (
    <div className="tab-content mt-3">
      <div className="tab-pane fade show active">
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
              tags={(tags.data as (ITag&{connections: {articleId: number}[]})[])} 
              tagIds={(preferences.data as IPreference[]).map(preference => preference.tagId as number)} 
              onSelect={(id) => {
                preferenceRepository.createPreference({ tagId: id, clientId: 1 } as IPreference,
                  () => preferenceRepository.fetchPreferences({clientId: 1, take: 100}, (data) => setPreferences(data)),
                  (error) => toast.danger(JSON.stringify(error))
                )
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
