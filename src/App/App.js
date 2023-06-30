import Campus from "../components/Campus";
import UndefinedRoute from "../components/UndefinedRoute";
import Campuses from "../pages/AllCampuses";
import Students from "../pages/AllStudents";
import Student from "../components/Student";
import Home from "../pages/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddCampus from "../components/AddCampus";
import AddStudent from "../components/AddStudent";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/campuses">Campuses</Link>
          <Link to="/students">Students</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/campuses" element={<Campuses />} />
        <Route path="/campuses/:campusId" element={<Campus />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:studentId" element={<Student />} />
        <Route path="/addCampus" element={<AddCampus />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
