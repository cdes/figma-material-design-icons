import { jsx } from '@emotion/core';
import theme from '../theme';
import { memo } from 'react';

interface IconButtonProps {
  name: string;
  style: object;
}

async function sendIcon(name, url) {
  const response = await fetch(url);
  const icon = await response.text();
  parent.postMessage({ pluginMessage: { icon, name } }, '*');
}

function IconButton({ name, style }: IconButtonProps) {
  const url = `https://cdn.jsdelivr.net/npm/@mdi/svg@4.5.95/svg/${name}.svg`;

  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => sendIcon(name, url)}
      css={{
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
        ...style,
      }}
    >
      <img src={url} width={24} height={24} />
    </button>
  );
}

export default memo(IconButton);
