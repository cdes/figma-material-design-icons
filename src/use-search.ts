import Fuse from 'fuse.js';
import React from 'react';
import icons from "@mdi/svg/meta.json";

function useSearch(query: string) {
  const [results, setResults] = React.useState([]);

  const fuse = new Fuse((icons), {
    threshold: 0.2,
    keys: ['name', 'tags', 'aliases'],
  })

  React.useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()))
    } else {
      setResults(icons)
    }
  }, [query])

  return results
}

export default useSearch
