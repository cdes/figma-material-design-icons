import { jsx } from '@emotion/core'
import theme from '../theme'
import pkg from "@mdi/svg/package.json";

interface IconButtonProps {
  name: string
}

function IconButton({ name }: IconButtonProps) {
  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => parent.postMessage({ pluginMessage: { type: name } }, '*')}
      css={{
        margin: theme.space[2],
        padding: theme.space[2],
        color: '#333',
        background: 'transparent',
        border: 0,
        borderRadius: theme.radii[1],
        appearance: 'none',
        outline: 0,
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.06)',
        },
        '&:focus, &:active': {
          boxShadow: `inset 0 0 0 2px ${theme.colors.blue}`,
        },
      }}
    >
      <img
        src={`https://cdn.jsdelivr.net/npm/@mdi/svg@${
          pkg.version
        }/svg/${name}.svg`}
        width={24}
        height={24}
      />
    </button>
  )
}

export default IconButton
