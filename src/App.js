import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StudyPage from "./pages/StudyPage";
import DashboardPage from "./pages/DashboardPage";
import useOnboardingTour from "./hooks/useOnboardingTour";

function App() {
  const { TourComponent } = useOnboardingTour();

  return (
    <Router>
      {TourComponent}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
