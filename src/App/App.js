import Campus from "../components/Campus";
import UndefinedRoute from "../components/UndefinedRoute";
import Campuses from "../pages/AllCampuses";
import Students from "../pages/AllStudents";
import Student from "../components/Student";
import Home from "../pages/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCampus from "../components/AddCampus";
import AddStudent from "../components/AddStudent";
import EditStudent from "../components/EditStudent";
import EditCampus from "../components/EditCampus";
import { Nav } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/campuses">Campuses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/students">Students</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/campuses" element={<Campuses />} />
        <Route path="/campuses/:campusId" element={<Campus />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:studentId" element={<Student />} />
        <Route path="/addCampus" element={<AddCampus />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/editStudent/:studentId" element={<EditStudent />} />
        <Route path="/editCampus/:campusId" element={<EditCampus />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
