import './App.css';
import MovieDetails from './components/MovieDetailsContainer';
import SearchResults from './components/SearchResults';
import SearchSection from './components/SearchSection';
import { SearchWordProvider } from './contexts/SearchWordContext';
import { ModalActiveProvider } from './contexts/ModalActiveContext';
import { SearchResultsProvider } from './contexts/SearchResultsContext';
import { ImdbIdProvider } from './contexts/ImdbIdContext';
import { MovieTitleProvider } from './contexts/MovieTitleContext';
import { ShowtimesProvider } from './contexts/ShowtimesContext';

function App() {

  return (
    <ModalActiveProvider>
      <ShowtimesProvider>
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
      </ShowtimesProvider>
    </ModalActiveProvider>
  );
}

export default App;
