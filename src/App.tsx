import { store } from "./store/Store";
import Import from "./components/Import";
import Display from "./components/Display";

function App() {
  const storeInstance = store.useState();

  return <>{storeInstance.imported ? <Display /> : <Import />}</>;
}

export default App;
