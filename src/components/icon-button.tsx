import { jsx } from '@emotion/core';
import theme from '../theme';
import { memo } from 'react';
import { html as io } from '../io';

interface IconButtonProps {
  name: string;
  version: string;
  style: object;
}

async function sendIcon(name, url) {
  const response = await fetch(url);
  const icon = await response.text();
  io.send('add-icon', { icon, name });
}

function IconButton({ name, style, version }: IconButtonProps) {
  const url = `https://cdn.jsdelivr.net/npm/@mdi/svg@${version}/svg/${name}.svg`;

  return (
    <button
      key={name}
      aria-label={name}
      onClick={() => sendIcon(name, url)}
      css={{
        padding: theme.space[2],
        background: 'transparent',
        border: 0,
        borderRadius: theme.radii[1],
        appearance: 'none',
        fontSize: '24px',
        outline: 0,
        animation: 'fadeIn 200ms ease-in-out',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.06)',
        },
        '&:focus, &:active': {
          boxShadow: `inset 0 0 0 2px ${theme.colors.blue}`,
        },
        ...style,
      }}
    >
      <i className={`mdi mdi-${name}`}></i>
    </button>
  );
}

export default memo(IconButton);
