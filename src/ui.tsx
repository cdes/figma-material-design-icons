import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.scss'

declare function require(path: string): any

class App extends React.Component {
  textbox: HTMLInputElement

  countRef = (element: HTMLInputElement) => {
    if (element) element.value = '5'
    this.textbox = element
  }

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

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
            <div className="empty">
              <h2>Loading Icons...</h2>
              <p>Sit tight ;)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))