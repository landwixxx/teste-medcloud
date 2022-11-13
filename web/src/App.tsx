import Table from "./components/Table";
import TopBar from "./components/TopBar";
import { MainProvider } from "./Context";
import { MainContent } from "./styles";

function App() {
  return (
    <MainProvider>
      <MainContent>
        <TopBar />
        <Table></Table>
      </MainContent>
    </MainProvider>
  );
}

export default App;
