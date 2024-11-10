import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="bg-[#6B001B]  relative bottom-0 text-white py-4 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="md:text-sm text-xs mb-4 sm:mb-0">
          Copyright ©2019 RAILMADAD. All Rights Reserved.
        </div>
        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-xs md:text-sm">
          <Link to="/">Home</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/railway-admin-login">Railway Admin Login</Link>
          <Link to="/mis-report-login">MIS Report Login</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer
