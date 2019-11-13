import { jsx } from '@emotion/core';
import theme from '../theme';
import SearchIcon from './search-icon';
import icons from '@mdi/svg/meta.json';
import { useDebounce } from 'react-use';

const ICON_COUNT = icons.length;

interface SearchInputProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange, ...props }: SearchInputProps) {
  return (
    <div css={{ position: 'relative' }} {...props}>
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: theme.space[2],
        }}
      >
        <SearchIcon css={{ fill: '#333' }} />
      </div>
      <input
        autoFocus
        type="search"
        value={value}
        onChange={onChange}
        placeholder={`Search ${ICON_COUNT} icons`}
        css={{
          width: '100%',
          height: 40,
          padding: `0 ${theme.space[4]} 0 36px`,
          fontFamily: 'inherit',
          fontSize: theme.fontSizes[0],
          border: 0,
          outline: 0,
        }}
      />
    </div>
  );
}

export default SearchInput;
