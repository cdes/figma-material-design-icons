import { Global, jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import IconButton from './components/icon-button'
import SearchInput from './components/search-input'
import theme from './theme'
import './ui.css'
import useSearch from './use-search'
import { FixedSizeGrid as Grid } from 'react-window';

function splitArray(array, part) {
  const tmp = [];
  for(let i = 0; i < array.length; i += part) {
      tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

function App() {
  const [query, setQuery] = useState('');

  const results = useSearch(query);
  const results2d = splitArray(results, 6);  

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
        columnCount={6}
        rowCount={Math.round(results.length/6)}
        columnWidth={47}
        height={343}
        rowHeight={47}
        width={284}
      >
        {({ columnIndex, rowIndex }) => (
          typeof results2d[columnIndex][rowIndex] !== "undefined" ? <IconButton name={results2d[columnIndex][rowIndex].name} /> : <div></div>
          // <pre>{JSON.stringify(results2d[columnIndex][rowIndex])}</pre>
        )}
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
