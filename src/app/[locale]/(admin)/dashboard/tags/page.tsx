"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { ITag } from "@/core/interfaces";
import { useEffect, useMemo, useState } from "react";
import { statusColorRender, statusRender } from "@/helpers/functions";
import TagRepository from "@/repositories/tagRepository";
import SubmitComponent from "@/components/SubmitComponent";
import { IField } from "@/components/FormComponent";
import { statusOptionsActivation } from "@/enums";
import { Dropdown } from "@/components/widgets/Dropdown";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const tagRepository = useMemo(() => new TagRepository(), []);
  const [tags, setTags] = useState<ITag[]>([]);
  const statusOptions = Object.values(statusOptionsActivation);


  useEffect(() => {
    tagRepository.fetchTags()
    .then((data) => {
      if (data) {
        setTags(data as ITag[])
      }
    })
    .catch((error: Error) => {
      console.log(error);
    });
  }, [tagRepository]);


  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des tags</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(
            <SubmitComponent
              title="Creer un tag"
              fields={tagRepository.formCreateTag() as unknown as IField[]}
              schema={tagRepository.tagSchema}
              btn="Creer"
              onSubmit={async (data: ITag) => {
                setTags((await tagRepository.createTag(data)) as ITag[]);
                modal.close();
              }}
            />
          )}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un tag</span>
        </button>
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
              tags.map((tag) => (
                <tr key={tag.id}>
                  <th scope="row">{tag.id}</th>
                  <td>{tag.name}</td>
                  <td className="text-center">
                    <span className={`badge text-bg-${statusColorRender(tag.status)}`}>{statusRender(tag.status)}</span>
                    <Dropdown
                      options={statusOptions.map((status) => (
                        {
                          label: statusRender(status),
                          action: () => modal.open(
                            <SubmitComponent
                              title="Changer le status"
                              fields={tagRepository.formChangeStatusTag() as unknown as IField[]}
                              schema={tagRepository.tagSchema}
                              btn="Changer"
                              onSubmit={async () => {
                                setTags((await tagRepository.changeStatusTag(tag.id as number, status)) as ITag[]);
                                modal.close();
                              }}
                            />
                          )
                        }
                      ))}
                    />
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
                      onSubmit={async (data: ITag) => {
                        setTags((await tagRepository.updateTag(tag.id as number, data)) as ITag[]);
                        modal.close();
                      }}
                    />
                  )}
                ></i>
                <i 
                  className="bi bi-trash text-danger"
                  onClick={() => modal.open(
                    <SubmitComponent
                      title="Supprimer le tag"
                      fields={tagRepository.formDeleteTag() as unknown as IField[]}
                      schema={tagRepository.tagSchema}
                      btn="Supprimer"
                      onSubmit={async () => {
                        setTags((await tagRepository.deleteTag(tag.id as number)) as ITag[]);
                        modal.close();
                      }}
                    />
                  )}
                ></i>
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;