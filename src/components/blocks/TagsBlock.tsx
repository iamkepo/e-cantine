"use client";
import { ITag } from "@/core/interfaces";

interface Props {
  tags: (ITag&{connections: {articleId: number}[]})[];
  tagIds?: number[];  
  onSelect: (id: number | null) => void;
}

const TagsBlock: React.FC<Props> = ({ tags, tagIds, onSelect }) => {
  return (
    tags?.map((tag, j) => (
      <button
        key={j}
        type="button"
        className={`btn btn-sm btn-${tagIds?.includes(tag.id as number) ? "primary" : "outline-primary"} text-nowrap`}
        onClick={() => onSelect(tag.id as number)}
        title={tag.name}
      >
        <span className='text-truncate'>{tag.name}</span>
        <span className="ms-2 badge bg-secondary">{tag.connections.length}</span>
      </button>
    ))
  );
};

export default TagsBlock;
