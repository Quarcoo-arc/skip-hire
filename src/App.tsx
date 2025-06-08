import { Header } from "./components/layout";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header
          title="Choose Your Skip Size"
          subtitle="Select the skip size that best suits your needs"
        />
      </div>
    </div>
  );
};

export default App;
