
const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Practical Test App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
