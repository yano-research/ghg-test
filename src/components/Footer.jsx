export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523..." clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43..." clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="X">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.6823 10.6218L20.2391 3..." />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477..." clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418..." clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 md:order-1 md:mt-0">
            &copy; 2025 Yano Research Institute Ltd., Inc. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  