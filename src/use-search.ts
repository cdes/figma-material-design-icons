import Fuse from 'fuse.js';
import React from 'react';

function splitArray(array, part) {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

function useSearch(query: string, meta) {
  const [results, setResults] = React.useState(meta);

  const fuse = new Fuse(meta, {
    threshold: 0.2,
    keys: ['name', 'tags', 'aliases'],
  });

  React.useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()));
    } else {
      setResults(meta);
    }
  }, [query]);

  return splitArray(results, 5);
}

export default useSearch;
