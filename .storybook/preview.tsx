import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/index.css';

/**
 * Applies `parameters.theme` ('light' | 'dark') to <html>. The SDS semantic tokens switch on
 * `.dark` / `[data-theme]` at :root, and Tailwind's `@theme` vars resolve there, so the theme
 * must be set on the root element rather than a wrapper. Light is explicit so stories stay
 * deterministic when the OS prefers dark.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.parameters.theme === 'dark' ? 'dark' : 'light';
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;