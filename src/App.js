import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Book from './pages/Book';
import Home from './pages/Home';
import AdminLogIn from './pages/AdminLogIn'; 
import AdminHome from './pages/AdminHome';
import AddVehicle from './pages/AddVehicle';
import ViewBooking from './pages/ViewBooking';
import NewUser from './pages/NewUser';
import SignIn from './pages/SignIn';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About'; // Adjust path as needed
import Careers from './pages/Careers'; // Import the Careers component
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import the Privacy Policy component
import TermsConditions from './pages/TermsConditions'; // Import the Terms & Conditions component
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import PaymentPolicy from "./pages/PaymentPolicy";
const Layout = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Add '/signin', '/home', and '/newuser' to the list of pages where the navbar should not appear
  const isNoNavbarPage = ['/signin', '/home', '/newuser'].includes(pathname.toLowerCase());

  // Show AdminNavbar only on admin pages
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render Navbar or AdminNavbar */}
      {!isNoNavbarPage && (isAdminPage ? <AdminNavbar /> : <Navbar />)}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default route redirects to Home */}
          <Route path="/home" element={<Navigate to="/home" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/book" element={<Book />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<AdminLogIn />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/adminadd-vehicle" element={<AddVehicle />} />
          <Route path="/adminview-booking" element={<ViewBooking />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/" element={<UserDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} /> {/* Added Careers page route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Added Privacy Policy page route */}
          <Route path="/termsconditions" element={<TermsConditions />} /> {/* Added Terms & Conditions page route */}
          <Route path="/return-policy" element={<ReturnPolicy/>} />
          <Route path="/shipping-policy" element={<ShippingPolicy/>} />
          <Route path="/payment-policy" element={<PaymentPolicy/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
