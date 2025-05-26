import NavLinks from "./NavLinks";
import BuilderCTA from "./BuilderCTA";
import AuthButtons from "./AuthButtons";

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-6">
          <NavLinks isMobile onLinkClick={onClose} />
          <BuilderCTA isMobile onClick={onClose} />
          <AuthButtons isMobile onClick={onClose} />
        </div>
      </aside>
    </>
  );
}