import { ITag } from "@/core/interfaces";

interface Props {
  tags: ITag[];
  tagIds?: number[];  
  tagSelect: (id: number) => void;
}

const TagsBlock: React.FC<Props> = ({ tags, tagIds, tagSelect }) => {

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
