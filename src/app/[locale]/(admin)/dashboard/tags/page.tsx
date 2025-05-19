"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { ITag, Meta } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusColorRender, statusRender } from "@/helpers/functions";
import TagRepository from "@/repositories/tagRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { statusOptionsActivation } from "@/enums";
import { Dropdown } from "@/components/widgets/Dropdown";
import ConfirmComponent from "@/components/ConfirmComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilterComponent from "@/components/FilterComponent";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [tags, setTags] = useState<{data: ITag[], meta: Meta}>({
    data: [],
    meta: {total: 0, page: 1, pageCount: 1, limit: 10}
  });
  const [params, setParams] = useState({
    skip: 0,
    take: 10,
    search: "",
    status: "",
    page: 1,
  });
  const tagRepository = useMemo(() => new TagRepository(setTags), []);
  const statusOptions = Object.values(statusOptionsActivation);


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
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => modal.open(
                  <SubmitComponent
                  title="Creer un tag"
                  fields={tagRepository.formCreateTag() as unknown as IField[]}
                  schema={tagRepository.tagSchema}
                  btn="Creer"
                  onSubmit={ (data: ITag) => tagRepository.createTag(data)
                    .then(() => tagRepository.fetchTags(params))
                    .catch((error) => console.error(error))
                    .finally(() => modal.close())
                  }
                />
              )}
            >
              <i className="bi bi-plus"></i> 
              <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un tag</span>
            </button>
            </div>
          </div>
        </div>

      </div>

      <hr />

      <div className="table-responsive">

        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col" className="col-md-2 text-center">Status</th>
              <th scope="col" className="col-md-2 text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              tags.data.map((tag) => (
                <tr key={tag.id} className="align-middle">
                  <th scope="row">{tag.id}</th>
                  <td>{tag.name}</td>
                  <td className="text-center">
                    <button type="button" className={`btn btn-${statusColorRender(tag.status)} btn-sm`}>
                      <span className="me-2">{statusRender(tag.status)}</span>
                      <Dropdown
                        chevron
                        options={statusOptions.map((status) => (
                          {
                            label: statusRender(status),
                            action: () => modal.open(
                              <ConfirmComponent
                                title={tagRepository.confirmChangeStatusTag.title}
                                description={tagRepository.confirmChangeStatusTag.description}
                                onConfirm={ () => tagRepository.changeStatusTag(tag.id as number, status)
                                  .then(() => tagRepository.fetchTags(params))
                                  .catch((error) => console.error(error))
                                  .finally(() => modal.close())
                                }
                              />
                            )
                          }
                        ))}
                      />
                    </button>
                  </td>
                  <td className="text-end">
                <i 
                  className="bi bi-pencil text-primary me-2"
                  onClick={() => modal.open(
                    <SubmitComponent
                      title="Modifier le tag"
                      fields={tagRepository.formUpdateTag(tag) as unknown as IField[]}
                      schema={tagRepository.tagSchema}
                      btn="Modifier"
                      onSubmit={ (data: ITag) => tagRepository.updateTag(tag.id as number, data)
                        .then(() => tagRepository.fetchTags(params))
                        .catch((error) => console.error(error))
                        .finally(() => modal.close())
                      }
                    />
                  )}
                ></i>
                <i 
                  className="bi bi-trash text-danger"
                  onClick={() => modal.open(
                    <ConfirmComponent
                      title={tagRepository.confirmDeleteTag.title}
                      description={tagRepository.confirmDeleteTag.description}
                      onConfirm={ () => tagRepository.deleteTag(tag.id as number)
                        .then(() => tagRepository.fetchTags(params))
                        .catch((error) => console.error(error))
                        .finally(() => modal.close())
                      }
                    />
                  )}
                ></i>
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>

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