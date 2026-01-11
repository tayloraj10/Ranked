import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { RankingProvider } from './context/RankingContext';
import { AppThemeProvider } from './theme';

function App() {
  return (
    <AppThemeProvider>
      <RankingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking/:id" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </RankingProvider>
    </AppThemeProvider>
  );
}

export default App;