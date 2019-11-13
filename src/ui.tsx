import { Global, jsx } from '@emotion/core';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import IconButton from './components/icon-button';
import SearchInput from './components/search-input';
import theme from './theme';
import './ui.css';
import useSearch from './use-search';
import { FixedSizeGrid as Grid } from 'react-window';

function App() {
  const [query, setQuery] = useState('');

  const results = useSearch(query);

  return (
    <div>
      <Global
        styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
      />
      <SearchInput
        value={query}
        onChange={event => setQuery(event.target.value)}
        css={{
          position: 'sticky',
          top: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
      <div css={{ padding: theme.space[2] }}>
        <Grid
          columnCount={5}
          rowCount={Math.round(results.length)}
          columnWidth={284 / 5}
          rowHeight={284 / 5}
          width={284}
          height={351}
        >
          {({ columnIndex, rowIndex, style }) => {
            const icon = results[rowIndex][columnIndex];
            return icon === undefined ? null : (
              <IconButton name={icon.name} style={style} />
            );
          }}
        </Grid>
        {/* <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridGap: theme.space[1],
          }}
        >
          {results.map(icon => (
            <IconButton key={icon.id} name={icon.name} />
          ))}
        </div>
        <div
          css={{
            marginTop: theme.space[2],
            padding: theme.space[2],
            fontSize: theme.fontSizes[0],
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
        </div> */}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
