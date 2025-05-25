"use client";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import TagRepository from "@/repositories/tagRepository";
import { useMemo } from "react";
import { useCheckList } from "@/hooks/useCheckList";
import { Meta } from "@/core/types";
import { ITag } from "@/core/interfaces";
import { meta } from "@/core/constants";
// import PreferencesRepository from "@/repositories/preferenceRepository";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
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
          <Link 
            href={'/'+lang+'/filter'} 
            className="btn btn-primary" 
          >
            <span className="d-none d-md-inline-block me-2 fw-bold">commencer</span>
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <hr />
        <div className="d-flex flex-wrap gap-2">
          {
            tags.data.map(tag => (
              <button 
                key={tag.id} 
                className={`btn btn-${checkList.includes(tag.id as number) ? 'primary' : 'outline-primary'}`}
                onClick={() => handleCheckList(tag.id as number)}
              >
                {tag.name}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
