"use client";
import { modal, toast } from "@/stores/appStore";
import { ITag } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import TagRepository from "@/frontend/repositories/tag.repository";
import SubmitComponent from "@/components/SubmitComponent";
import { StatusActivation } from "@/enums";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";
import { useCheckList } from "@/hooks/useCheckList";
import TableComponent from "@/components/TableComponent";
import { MetaResponse, Field } from "@/core/types";
import BtnConfirmComponent from "@/components/BtnConfirmComponent";
import BtnSubmitComponent from "@/components/BtnSubmitComponent";

const Page: React.FC = () => {
  const statusOptions = Object.values(StatusActivation);
  const [tags, setTags] = useState<MetaResponse<ITag>>();
  const tagRepository = useMemo(() => new TagRepository(), []);
  const [params, setParams] = useState(tagRepository.filterTag);
  const { checkList, checkAllList, handleCheckList } = useCheckList(
    (tags?.data as ITag[])?.map(tag => tag.id as number) || []
  );

  useEffect(() => {
    tagRepository.fetchTags(params, setTags);
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
                fields={tagRepository.formFilterTag() as unknown as Field[]}
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
                  btn={{ label: `Supprimer (${checkList.length})`, color: "danger", icon: "trash" }}
                  confirm={tagRepository.confirmDeleteTags}
                  onConfirm={() => tagRepository.deleteTags(checkList,
                    () => {
                      toast.success("Tags supprimees"); 
                      tagRepository.fetchTags(params, setTags); 
                      checkAllList(); 
                      modal.close()
                    })
                  }
                />
               :
                <BtnSubmitComponent 
                  btn={{ label: "Creer", color: "primary", icon: "plus" }}
                  submit={{
                    title:"Creer un tag",
                    btn:"Creer",
                    fields:tagRepository.formCreateTag() as unknown as Field[],
                    schema:tagRepository.tagSchema
                  }}
                  onSubmit={ (data: ITag) => tagRepository.createTag(data,
                    () => {
                      toast.success("Tag cree"); 
                      tagRepository.fetchTags(params, setTags); 
                      modal.close()
                    })
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
          list={(tags?.data as ITag[])}
          orderBy={{orderBy: params.orderBy, sort: params.sort, onChange: (orderBy: string, sort: string) => setParams({...params, orderBy, sort})}}
          edit={(e: ITag) => modal.open(
            <SubmitComponent 
              title={"Modifier le tag"} 
              fields={tagRepository.formUpdateTag(e) as unknown as Field[]} 
              schema={tagRepository.tagSchema} 
              btn="Modifier" 
              onSubmit={(data) => tagRepository.updateTag(e.id as number, data,
                () => {
                  toast.success("Tag modifie"); 
                  tagRepository.fetchTags(params, setTags); 
                  modal.close()
                })
              } 
            />
          )}
          trash={(id: number) => modal.open(
            <ConfirmComponent 
              title={tagRepository.confirmDeleteTag.title}
              description={tagRepository.confirmDeleteTag.description}
              onConfirm={() => tagRepository.deleteTag(id,
                () => {
                  toast.success("Tag supprime"); 
                  tagRepository.fetchTags(params, setTags); 
                  modal.close()
                })
              } 
            />
          )}
          options={statusOptions.map(status => ({
            label: status,
            action: (id: number) => modal.open(
              <ConfirmComponent 
                title={tagRepository.confirmChangeStatusTag.title}
                description={tagRepository.confirmChangeStatusTag.description}
                onConfirm={ () => tagRepository.changeStatusTag(id, status,
                  () => {
                    toast.success("Tag modifie"); 
                    tagRepository.fetchTags(params, setTags); 
                    modal.close()
                  })
                }
              />
            )}
          ))}
        />
        
        <PaginationComponent 
          page={params.page}
          total={(tags?.meta.pageCount as number)}
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
};

export default Page;