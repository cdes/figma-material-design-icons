import { Global, jsx } from '@emotion/core';
import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import IconButton from './components/icon-button';
import SearchInput from './components/search-input';
import theme from './theme';
import './ui.css';
import useSearch from './use-search';
import IconsContext from './icons-context';
import { FixedSizeGrid as Grid } from 'react-window';

let version;

function App() {
  const [query, setQuery] = useState(' ');
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState([]);
  const [css, setCSS] = useState('');

  useEffect(() => {
    (async () => {
      const packageResponse = await fetch(
        'https://data.jsdelivr.com/v1/package/npm/@mdi/svg'
      );
      const packageJson = await packageResponse.json();

      version = packageJson.tags.latest;

      const data = await Promise.all([
        fetch(
          `https://cdn.jsdelivr.net/npm/@mdi/font@${version}/css/materialdesignicons.min.css`
        ),
        fetch(`https://cdn.jsdelivr.net/npm/@mdi/svg@${version}/meta.json`),
      ]);

      const [cssResponse, metaResponse] = data;

      const texts = await Promise.all([
        cssResponse.text(),
        metaResponse.text(),
      ]);
      const mdiJson = JSON.parse(texts[1]);

      const json = mdiJson.map(({ name, tag, aliases, codepoint }) => ({
        name,
        tag,
        aliases,
        codepoint,
      }));

      setMeta(json);
      setLoading(false);
      setQuery('');
      setCSS(texts[0]);
    })();
  }, []);

  const results = useSearch(query, meta);

  return (
    <IconsContext.Provider value={meta}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Global
            styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
          />
          <style>{`.figma-dark { color: #fff }`}</style>
          Loading
        </div>
      ) : (
        <React.Fragment>
          <style>{css}</style>
          <style>
            {`
              @font-face {
                font-family: "Material Design Icons";
                src: url("https://cdn.jsdelivr.net/npm/@mdi/font@${version}/fonts/materialdesignicons-webfont.eot?v=${version}");
                src: url("https://cdn.jsdelivr.net/npm/@mdi/font@${version}/fonts/materialdesignicons-webfont.eot?#iefix&v=${version}") format("embedded-opentype"), url("https://cdn.jsdelivr.net/npm/@mdi/font@${version}/fonts/materialdesignicons-webfont.woff2?v=${version}") format("woff2"), url("https://cdn.jsdelivr.net/npm/@mdi/font@${version}/fonts/materialdesignicons-webfont.woff?v=${version}") format("woff"), url("https://cdn.jsdelivr.net/npm/@mdi/font@${version}/fonts/materialdesignicons-webfont.ttf?v=${version}") format("truetype");
                font-weight: normal;
                font-style: normal
              }
              `}
          </style>
          <Global
            styles={{ body: { margin: 0, fontFamily: 'Inter, sans-serif' } }}
          />
          <SearchInput
            value={query}
            onChange={event => setQuery(event.target.value)}
            css={{
              position: 'sticky',
              top: 0,
            }}
            count={meta.length}
            className="search-input-container"
          />
          <div css={{ padding: theme.space[2], paddingBottom: 0 }}>
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
                  <IconButton
                    name={icon.name}
                    style={style}
                    version={version}
                  />
                );
              }}
            </Grid>
          </div>
        </React.Fragment>
      )}
    </IconsContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
