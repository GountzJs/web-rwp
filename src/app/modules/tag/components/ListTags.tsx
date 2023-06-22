import { useEffect, useState } from "react";
import { UnLoggedHook } from "../../shared/hooks/UnLoggedHook";
import { getTagsService } from "../services/getTagsService";

export function ListTags({ setSelect }: { setSelect: React.Dispatch<React.SetStateAction<string>> }) {
  const [tags, setTags] = useState<string[]>([]);
  const unlogged = UnLoggedHook();

  useEffect(() => {
    getTagsService()
      .then(res => setTags(res.tags))
      .catch((err) => {
        if(err?.message === 'missing authorization credentials') unlogged();
      })
  }, [])

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {
            tags.map((tag: string, idx: number) =>
              <button 
                type="button"
                key={idx} 
                className="btn tag-pill tag-default"
                onClick={() => setSelect(tag)}
              >
                { tag }
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}