import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FuzzySearch from "fuzzy-search";
import { FixedSizeList as List } from 'react-window';
import './ui.scss'

declare function require(path: string): any

const Column = ({ index, style }) => (
  <div style={style}>Column {index}</div>
);

class App extends React.Component {
  textbox: HTMLInputElement
  version: string
  iconsData: JSON
  searcher: FuzzySearch

  componentDidMount = async () => {
    const packageResponse = await fetch(
      "https://data.jsdelivr.com/v1/package/npm/@mdi/svg"
    );
    const packageJson = await packageResponse.json();

    const latestVersion = packageJson.tags.latest;
    const storedVersion = figma.root.getPluginData("mdisvgversion");
    const storedData = figma.root.getPluginData("mdisvgmeta");

    if (
      latestVersion !== storedVersion ||
      storedData === null ||
      storedData.length < 100
    ) {
      const mdiResponse = await fetch(
        `https://cdn.jsdelivr.net/npm/@mdi/svg@${latestVersion}/meta.json`
      );
      const mdiJson = await mdiResponse.json();

      const json = mdiJson.map(({ name, tag, aliases }) => ({
        name,
        tag,
        aliases
      }));
      const mdiText = JSON.stringify(json);

      window.parent.postMessage({pluginMessage: request.response}, '*')
      figma.root.setPluginData("mdisvgmeta", mdiText);
      figma.root.setPluginData("mdisvgversion", latestVersion);
      this.version = latestVersion;

      this.iconsData = json;
    } else {
      this.version = storedVersion;
      const mdiText = figma.root.getPluginData("mdisvgmeta");
      const json = JSON.parse(mdiText);
      this.iconsData = json;
    }

    this.searcher = new FuzzySearch(
      this.iconsData,
      ["name", "aliases", "tags"],
      {
        caseSensitive: false
      }
    );
  }

  getRows = rows => {
    const groupSize = 5;

    const iconsRows = rows
      .map((icon, index) => {
        return index % groupSize === 0
          ? rows.slice(index, index + groupSize)
          : null;
      })
      .filter(icon => icon)
      .map(group => {
        return group
          .map(icon => (
            <div className="mdip-icon" id={`${icon.name}-div`}>
              <img
                data-icon-name={`${icon.name}`}
                src={`https://cdn.jsdelivr.net/npm/@mdi/svg@${
                  this.version
                }/svg/${icon.name}.svg`}
                width={24}
                height={24}
              />
            </div>
          ));
      });

    return iconsRows;
  };

  render() {
    return (
      <div className="figma-material-design-icons-plugin">
        <div className="search">
          <span className="g7a016758" />
          <input
            placeholder="Search for icons"
            spellCheck={false}
            type="text"
            id="icon-query"
            name="icon-query"
          />
        </div>
        <div className="scrollable" id="scrollable">
          <div id="mdi-icons">
            {this.iconsData ?
              <List
                height={92}
                itemCount={1000}
                itemSize={100}
                layout="horizontal"
                width={460}
              >
                {Column}
              </List>
            :
              <div className="empty">
                <h2>Loading Icons...</h2>
                <p>Sit tight ;)</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))