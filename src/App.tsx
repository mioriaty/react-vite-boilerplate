import './styles/base.css';

import { ReduxProvider } from '@app/providers/ReduxProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';

import { AppRoutes } from './routes';

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
