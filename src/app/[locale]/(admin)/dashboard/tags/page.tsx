"use client";

import { modal } from "@/stores/appStore";
import { ITag } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import TagRepository from "@/repositories/tagRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { StatusActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import { useCheckList } from "@/hooks/useCheckList";
import { TableComponent } from "@/components/TableComponent";
import { meta } from "@/core/constants";
import { Meta } from "@/core/types";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";

const Page: React.FC = () => {
  const [tags, setTags] = useState<{ data: ITag[], meta: Meta }>({ data: [], meta});
  const statusOptions = Object.values(StatusActivation);
  const tagRepository = useMemo(() => new TagRepository(setTags), []);
  const [params, setParams] = useState(tagRepository.filterTag);
  const { checkList, checkAllList, handleCheckList } = useCheckList(tags.data.map(tag => tag.id as number));


  useEffect(() => {
    tagRepository.fetchTags(params);
  }, [tagRepository, params]);


  return (
    <div className="col-12">

      <div className="row">
        <div className="col-12 col-md-3">
          <h4 className="card-title text-break">Liste des tags</h4>
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-8">
              <FilterComponent 
                fields={tagRepository.formFilterTag() as unknown as IField[]}
                schema={tagRepository.tagFilterSchema}
                onSubmit={(data: {search: string, status: string}) => {
                  setParams({
                    ...params,
                    search: data.search,
                    status: data.status,
                  });
                }}
              />
            </div>
            <div className="col-12 col-md-4 text-end">
              {
                checkList.length > 0 ? 
                <BtnConfirmComponent 
                  btn={{ label: `Supprimer ${checkList.length} tags`, color: "danger", icon: "trash" }}
                  confirm={tagRepository.confirmDeleteTags}
                  onConfirm={() => tagRepository.deleteTags(checkList)
                    .then(() => tagRepository.fetchTags(params))
                    .then(() => checkAllList())
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer un tag", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un tag",
                    btn:"Creer",
                    fields:tagRepository.formCreateTag() as unknown as IField[],
                    schema:tagRepository.tagSchema
                  }}
                  onSubmit={ (data: ITag) => tagRepository.createTag(data)
                    .then(() => tagRepository.fetchTags(params))
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
              }
            </div>
          </div>
        </div>

      </div>

      <hr />

      <div className="table-responsive">

        <TableComponent
          checkbox={{checkList, checkAllList, handleCheckList: (e: number) => handleCheckList(e)}}
          thead={tagRepository.tableHeadTag}
          list={tags.data}
          setList={(e: ITag[]) => setTags({...tags, data: e})}
          // eye={(e: ITag) => false}
          edit={(e: ITag) => modal.open(
            <SubmitComponent 
              title={"Update tag"} 
              fields={tagRepository.formUpdateTag(e) as unknown as IField[]} 
              schema={tagRepository.tagSchema} 
              btn="Update" 
              onSubmit={(data) => tagRepository.updateTag(e.id as number, data)
                .then(() => tagRepository.fetchTags(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={tagRepository.confirmDeleteTag.title}
              description={tagRepository.confirmDeleteTag.description}
              onConfirm={() => tagRepository.deleteTag(id)
                .then(() => tagRepository.fetchTags(params))
                .catch((error) => console.error(error))
                .finally(() => modal.close())
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={tagRepository.confirmChangeStatusTag.title}
                description={tagRepository.confirmChangeStatusTag.description}
                onConfirm={ () => tagRepository.changeStatusTag(id, status)
                  .then(() => tagRepository.fetchTags(params))
                  .catch((error) => console.error(error))
                  .finally(() => modal.close())
                }
              />
            )}
          ))}
        />
        
        <PaginationComponent 
          page={params.page}
          total={tags.meta.pageCount}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;