import { Header }from './components/Opinion/Header.jsx';
import { OpinionsContextProvider } from './components/Opinion/opinions-context.jsx';
import { Opinions } from './components/Opinion/Opinions.jsx';
import { NewOpinion } from './components/Opinion/NewOpinion.jsx';


function App() {
  return (
    <>
      <Header />
      <main>
        <OpinionsContextProvider>
          <NewOpinion />
          <Opinions /> 
        </OpinionsContextProvider>
      </main>
    </>
  );
}

export default App;
