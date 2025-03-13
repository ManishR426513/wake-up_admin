import { LoginForm } from "@/common/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router";


export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}