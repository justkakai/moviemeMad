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
import { IsLoadingProvider } from './contexts/IsLoadingContext';
import './App.css';
import Header from './components/Header';

function App() {

  return (
    <ModalActiveProvider>
      <ShowtimesProvider>
        <MovieDetailsProvider>
          <ImdbIdProvider>
            <MovieTitleProvider>
              <SearchResultsProvider>
                <IsLoadingProvider>
                  <SearchWordProvider>
                    <main className="App">
                      <Header />
                      <h1>movieme<em>Mad!</em></h1>
                      <SearchSection />
                      <SearchResults />
                      <MovieDetails />
                    </main>
                  </SearchWordProvider>
                </IsLoadingProvider>
              </SearchResultsProvider>
            </MovieTitleProvider>
          </ImdbIdProvider>
        </MovieDetailsProvider>
      </ShowtimesProvider>
    </ModalActiveProvider>
  );
}

export default App;
