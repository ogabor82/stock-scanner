import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-900 text-white">
      {/* Stock Ticker Section */}
      <div className="overflow-hidden whitespace-nowrap py-2 text-xs bg-blue-800">
        <div className="flex animate-marquee space-x-6">
          <span className="text-green-400">AAPL 152.46 (+1.26%)</span>
          <span className="text-red-400">F 10.41 (-0.57%)</span>
          <span className="text-green-400">T 22.28 (+1.18%)</span>
          <span className="text-red-400">MU 101.31 (-2.66%)</span>
          <span className="text-red-400">GE 172.36 (-1.31%)</span>
          <span className="text-red-400">CGC 4.81 (-2.83%)</span>
          {/* Add more stock items here */}
        </div>
      </div>

      {/* Navbar Section */}
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">StockSight</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/news" className="hover:text-gray-300">
            News
          </Link>
          <Link to="/favorites" className="hover:text-gray-300">
            Favorites
          </Link>
          <Link to="/createportfolio" className="hover:text-gray-300">
            New Portfolio
          </Link>
          <Link to="/portfolio/favorites" className="hover:text-gray-300">
            Portfolio Analytics
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 flex-grow max-w-xs md:max-w-sm lg:max-w-md">
          <input
            type="text"
            placeholder="Search stocks, news, and tools..."
            className="w-full px-3 py-1 text-sm text-gray-700 rounded-md focus:outline-none"
          />
          <button>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm8.707-3.293-4.608-4.608a6 6 0 1 0-1.414 1.414l4.608 4.608a1 1 0 0 0 1.414-1.414z" />
            </svg>
          </button>
        </div>

        {/* Account and Free Trial */}
        <div className="flex space-x-4 items-center">
          <a
            href="#"
            className="flex items-center space-x-1 text-sm hover:text-gray-300"
          >
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>My Account</span>
          </a>
          <button className="bg-yellow-400 text-blue-900 text-sm px-3 py-1 rounded-md font-semibold">
            Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
