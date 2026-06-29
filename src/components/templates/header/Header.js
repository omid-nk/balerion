import AlertSection from "./components/AlertSection";
import Burgermenu from "./components/Burgermenu";
import Logo from "./components/Logo";
import NavItems from "./components/NavItems";
import AuthSection from "./components/AuthSection";
import CartBtn from "./components/CartBtn";

export default function Header() {
  return (
    <>
      {/* Alert */}
      <AlertSection />

      {/* Header */}
      <header className="border-dark/20 mb-12 flex items-center justify-between border-b py-6 md:py-8">
        {/* Burger Menu */}
        <Burgermenu />

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <NavItems />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <CartBtn />

          {/* AUTH SECTION */}
          <AuthSection />
        </div>
      </header>
    </>
  );
}
