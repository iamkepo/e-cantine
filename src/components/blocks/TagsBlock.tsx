"use client";
import { ITag } from "@/core/interfaces";

interface Props {
  tags: ITag[];
  tagIds?: number[];  
  onSelect: (id: number | null) => void;
}

const TagsBlock: React.FC<Props> = ({ tags, tagIds, onSelect }) => {
  return (
    tags.map((tag, j) => (
      <button
        key={j}
        type="button"
        className={`btn btn-sm btn-${tagIds?.includes(tag.id as number) ? "primary" : "outline-primary"}`}
        onClick={() => onSelect(tag.id as number)}
        title={tag.name}
      >
        <span className='text-truncate'>{tag.name}</span>
      </button>
    ))
  );
};

export default TagsBlock;
