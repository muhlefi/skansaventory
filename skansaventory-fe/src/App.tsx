import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoute";

const App: React.FC = () => {
  return (
      <Router>
        <AppRoutes />
      </Router>
  );
};

export default App;
