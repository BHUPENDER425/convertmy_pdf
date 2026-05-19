import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Body from './component/Body';
import Footer from './component/Footer';
import PremiumSection from './component/PremiumSection';
import MergePDF from './pages/MergePDF';
import CompressPDF from './pages/CompressPDF';
import SplitPDF from './pages/SplitPDF';
import ConvertPDF from './pages/ConvertPDF';
import EditPDF from './pages/EditPDF';
import ProtectPDF from './pages/ProtectPDF';
import RepairPDF from './pages/RepairPDF';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Body />
              <PremiumSection />
            </>
          } />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/split-pdf" element={<SplitPDF />} />
          <Route path="/convert-pdf" element={<ConvertPDF />} />
          <Route path="/edit-pdf" element={<EditPDF />} />
          <Route path="/protect-pdf" element={<ProtectPDF />} />
          <Route path="/repair-pdf" element={<RepairPDF />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
