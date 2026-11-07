import { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-surface text-text-default flex flex-col items-center justify-center p-sds-400 gap-sds-600 transition-colors">
      <div className="w-full max-w-md flex flex-col gap-sds-400 items-center p-sds-600 border border-border-default rounded-sds-200 bg-surface shadow-sds-100">
        <h1 className="text-xl font-bold text-text-default">Simple Design System</h1>
        <p className="text-sm text-text-secondary text-center">
          Design tokens and variables successfully initialized.
        </p>

        <button
          type="button"
          onClick={toggleTheme}
          className="px-sds-400 py-sds-200 text-sm font-medium rounded-sds-100 border border-border-default bg-surface hover:bg-surface-secondary text-text-default cursor-pointer transition-colors shadow-sds-100"
        >
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  );
}

export default App;
