"use client";
import { ITag } from "@/core/interfaces";
import { tagSelect } from "@/stores/filterStore";

interface Props {
  tags: ITag[];
  tagIds?: number[];  
}

const TagsBlock: React.FC<Props> = ({ tags, tagIds }) => {
  return (
    tags.map((tag, j) => (
      <button
        key={j}
        type="button"
        className={`btn btn-sm btn-${tagIds?.includes(tag.id as number) ? "primary" : "outline-primary"}`}
        onClick={() => tagSelect(tag.id as number)}
        title={tag.name}
      >
        <span className='text-truncate'>{tag.name}</span>
      </button>
    ))
  );
};

export default TagsBlock;
