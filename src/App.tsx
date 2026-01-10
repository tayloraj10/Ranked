import Home from './pages/Home';
import { RankingProvider } from './context/RankingContext';
import { AppThemeProvider } from './theme';

function App() {
  return (
    <AppThemeProvider>
      <RankingProvider>
        <Home />
      </RankingProvider>
    </AppThemeProvider>
  );
}

export default App;