import { useState, useEffect } from 'react';
import { TopAppBar } from './TopAppBar';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-surface text-text-default flex flex-col items-center p-sds-400 gap-sds-600 transition-colors">
      <div className="w-full max-w-md flex flex-col gap-sds-400 items-center">
        <div className="w-full flex justify-between items-center px-sds-200">
          <span className="text-sm font-semibold text-text-secondary">
            Simple Design System
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-sds-300 py-sds-100 text-xs font-medium rounded-sds-100 border border-border-default bg-surface hover:bg-surface-secondary text-text-default cursor-pointer transition-colors"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <div className="w-full border border-border-default rounded-sds-200 overflow-hidden shadow-sds-200">
          <TopAppBar
            title="Design System"
            supportingText="Powered by SDS Tokens"
            onNavigationClick={() => console.log('Navigation clicked')}
            onAvatarClick={() => console.log('Avatar clicked')}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
