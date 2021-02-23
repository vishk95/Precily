import './App.css';
import Window from './Window';
import {ContextProvider} from "./Context"


function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Window />
      </ContextProvider>
    </div>
  );
}

export default App;
