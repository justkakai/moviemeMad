import MovieDetails from './components/MovieDetailsContainer';
import SearchResults from './components/SearchResults';
import SearchSection from './components/SearchSection';
import { SearchWordProvider } from './contexts/SearchWordContext';
import { ModalActiveProvider } from './contexts/ModalActiveContext';
import { SearchResultsProvider } from './contexts/SearchResultsContext';
import { ImdbIdProvider } from './contexts/ImdbIdContext';
import { MovieTitleProvider } from './contexts/MovieTitleContext';
import { ShowtimesProvider } from './contexts/ShowtimesContext';
import { MovieDetailsProvider } from './contexts/MovieDetailsContext';
import './App.css';

function App() {

  return (
    <ModalActiveProvider>
      <ShowtimesProvider>
        <MovieDetailsProvider>
          <ImdbIdProvider>
            <MovieTitleProvider>
              <SearchResultsProvider>
                <SearchWordProvider>
                  <main className="App">
                    <h1>movieme<em>Mad!</em></h1>
                    <SearchSection />
                    <SearchResults />
                    <MovieDetails />
                  </main>
                </SearchWordProvider>
              </SearchResultsProvider>
            </MovieTitleProvider>
          </ImdbIdProvider>
        </MovieDetailsProvider>
      </ShowtimesProvider>
    </ModalActiveProvider>
  );
}

export default App;
