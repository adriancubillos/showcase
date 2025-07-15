const Footer = () => {
  return (
    <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm">
        © {new Date().getFullYear()} | Built with React & TailwindCSS
      </p>
    </footer>
  );
};

export default Footer;
