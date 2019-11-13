import Fuse from 'fuse.js';
import React from 'react';
import icons from '@mdi/svg/meta.json';
import { useDebounce } from 'react-use';

function splitArray(array, part) {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

function useSearch(query: string) {
  const [results, setResults] = React.useState([]);
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(query);
    },
    1000,
    [query]
  );

  const fuse = new Fuse(icons, {
    threshold: 0.2,
    keys: ['name', 'tags', 'aliases'],
  });

  React.useEffect(() => {
    console.log(debouncedValue);

    if (debouncedValue.trim()) {
      setResults(fuse.search(debouncedValue.trim()));
    } else {
      setResults(icons);
    }
  }, [debouncedValue]);

  return splitArray(results, 5);
}

export default useSearch;
