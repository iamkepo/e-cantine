/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dropdown } from "./widgets/Dropdown";
import { useThemeStore } from "../stores/themeStore";
import { statusColorRender, statusRender } from "@/helpers/functions";


export interface TableComponentProps {
  checkbox?: {checkList: number[], checkAllList: () => void, handleCheckList: (e: number) => void};
  thead: {label: string, key: string}[];
  list: any[];
  orderBy?: {orderBy: string, order: string, onChange: (orderBy: string, order: string) => void};
  eye?: (e: any) => void;
  edit?: (e: any) => void;
  trash?: (e: number) => void;
  options?: {label: string, action: (e: any) => void}[];
}

const TableComponent: React.FC<TableComponentProps> = ({ checkbox, thead, list, orderBy, eye, edit, trash, options }) => {
  const { theme } = useThemeStore();

  const [hoverTh, setHoverTh] = useState<string | null>(null);


  const itemRender = (item: any, key: string) => {
    return (item[key]);
  };

  return (
    <table className={`table table-${theme} table-striped`}>
      <thead className={`table-primary`}>
        <tr>
          { 
            checkbox && 
            <th className="py-2 text-center">
              <input 
                className="form-check-input"
                onChange={ () => checkbox?.checkAllList() } 
                type="checkbox"
                checked={list?.length == checkbox?.checkList?.length}
              />
            </th>
          }
          {
            thead.map((el, i)=> (
              <th 
                key={i} 
                className={`py-2 ${el.label == 'Status' ? 'text-center': 'text-truncate'}`}
                onMouseEnter={()=> setHoverTh(el.label as string)}
                onMouseLeave={()=> setHoverTh(null)}
                onClick={()=> orderBy?.onChange(el.key, orderBy.order == 'asc' ? 'desc' : 'asc')}
              >
                {el.label}
                <i 
                  className={`
                    float-end 
                    ${
                      hoverTh == el.label ?
                      'text-lighter' : 'opacity-0'
                    } 
                    bi bi-arrow-down-up
                  `}
                ></i>
              </th>
            ))
          }
          { (eye || edit || trash) && <th className="py-2"></th>}
        </tr>
      </thead>
      <tbody>
        {list?.map((item, index) => (
          <tr key={index} className="align-middle">
            {
              checkbox && 
              <td className="py-2 text-center">
                <input 
                  className="form-check-input"
                  onChange={()=> checkbox?.handleCheckList(item.id)} 
                  type="checkbox"
                  checked={checkbox?.checkList?.length > 0 ? checkbox?.checkList?.includes(item.id) : false}
                />
              </td>
            }
            {
              thead.map((el, i) => (
                <td 
                  key={i} 
                  className={`py-2 ${el.label == 'Status' ? 'text-center': el.label == 'Image' ? 'col-md-1': 'text-lighter'}`}
                >
                  {
                    el.label == 'Status' ?
                    <button type="button" className={`btn btn-${statusColorRender(itemRender(item, el.key as string))} btn-sm`}>
                      <span className="me-2">{statusRender(itemRender(item, el.key as string))}</span>
                      {
                        options &&
                        <Dropdown
                          chevron
                          options={options.map(option => ({
                            label: statusRender(option.label),
                            action: () => option.action(item.id)
                          }))}
                        />
                      }
                    </button>
                    :
                    (
                      (el.label == 'Image' ?
                      <div className="text-truncate" onClick={() => eye?.(item)}>
                        <img 
                          src={itemRender(item, el.key as string)} 
                          alt={itemRender(item, 'name') as string} 
                          className="img-fluid rounded" 
                        />
                      </div>
                      :
                      <div className="text-truncate text-break">
                      {itemRender(item, el.key as string)}
                      </div>
                      )
                    )
                  }
                </td>
              ))
            }
            {
              (eye || edit || trash) && 
              <td className="py-2 text-end text-secondary fs-5">
                {eye && <i className="bi bi-eye" onClick={()=> eye(item)}></i>}
                {edit && <i className="ms-3 bi bi-pencil" onClick={()=> edit(item)}></i>}
                {trash && <i className="ms-3 bi bi-trash" onClick={()=> trash(item.id)}></i>}
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent;
