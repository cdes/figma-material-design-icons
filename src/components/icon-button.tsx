import { jsx } from '@emotion/core';
import theme from '../theme';
import pkg from '@mdi/svg/package.json';
import { useAsync } from 'react-use';

interface IconButtonProps {
  name: string;
  style: object;
}

function IconButton({ name, style }: IconButtonProps) {
  const url = `https://cdn.jsdelivr.net/npm/@mdi/svg@${pkg.version}/svg/${name}.svg`;

  const state = useAsync(async () => {
    const response = await fetch(url);
    const result = await response.text();
    return result;
  }, [url]);

  if (state.loading) {
    return (
      <button
        key={name}
        css={{
          padding: theme.space[2],
          color: '#333',
          background: 'transparent',
          border: 0,
          borderRadius: theme.radii[1],
          appearance: 'none',
          outline: 0,
          ...style,
        }}
        disabled
      >
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path fill="#000000" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </button>
    );
  } else if (state.error) {
    return (
      <button
        key={name}
        css={{
          padding: theme.space[2],
          color: '#333',
          background: 'transparent',
          border: 0,
          borderRadius: theme.radii[1],
          appearance: 'none',
          outline: 0,
          ...style,
        }}
        disabled
      >
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path
            fill="#000000"
            d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
          />
        </svg>
      </button>
    );
  }

  if (state.value) {
    return (
      <button
        key={name}
        aria-label={name}
        onClick={() =>
          parent.postMessage({ pluginMessage: { type: name } }, '*')
        }
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
        <img
          src={`https://cdn.jsdelivr.net/npm/@mdi/svg@${pkg.version}/svg/${name}.svg`}
          width={24}
          height={24}
        />
      </button>
    );
  }
}

export default IconButton;
