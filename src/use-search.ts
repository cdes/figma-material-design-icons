import Fuse from 'fuse.js';
import React, { useEffect } from 'react';

function splitArray(array, part) {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

function useSearch(query: string) {
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    (async () => {
      const mdiResponse = await fetch(
        `https://cdn.jsdelivr.net/npm/@mdi/svg@4.5.95/meta.json`
      );
      const text = await mdiResponse.text();
      const mdiJson = JSON.parse(text);

      const json = mdiJson.map(({ name, tag, aliases }) => ({
        name,
        tag,
        aliases,
      }));

      setResults(json);
    })();
  }, []);

  const fuse = new Fuse(results, {
    threshold: 0.2,
    keys: ['name', 'tags', 'aliases'],
  });

  React.useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()));
    } else {
      setResults(results);
    }
  }, [query]);

  return splitArray(results, 5);
}

export default useSearch;
