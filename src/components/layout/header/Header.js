"use client";

import { useEffect, useState } from "react";

import Logo from "@/components/shared/Logo";

import { createClient } from "@/lib/supabase/client";

import { getCart, subscribeToCartChanges } from "@/lib/cart";

import { headerItems } from "@/data/headerItems";

import HeaderActions from "./HeaderActions";
import HeaderDesktopNav from "./HeaderDesktopNav";
import HeaderMobileMenu from "./HeaderMobileMenu";

export default function Header() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [hasLoggedin, setHasLoggedin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const supabase = createClient();

  // Auth
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setHasLoggedin(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasLoggedin(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Cart
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCart().length);
    };

    updateCartCount();

    return subscribeToCartChanges(updateCartCount);
  }, []);

  return (
    <header className="mb-12 select-none">
      {/* Notice */}
      <div className="bg-primary text-light flex justify-center rounded-b-lg px-3 py-2 text-center text-sm">
        بالریون یک پروژه نمونه‌کار است که طراحی آن با الگوبرداری از وب‌سایت
        سبزلرن پیاده‌سازی شده است.
      </div>

      {/* Main Header */}
      <section className="border-border flex items-center justify-between gap-6 border-b px-2 py-6">
        {/* Mobile */}
        <HeaderMobileMenu
          items={headerItems}
          hasLoggedin={hasLoggedin}
          isOpen={burgerMenuOpen}
          onOpen={() => setBurgerMenuOpen(true)}
          onClose={() => setBurgerMenuOpen(false)}
        />

        {/* Desktop Navigation */}
        <div className="flex items-center justify-center gap-8 md:justify-start">
          <Logo width={140} height={100} />

          <HeaderDesktopNav items={headerItems} />
        </div>

        {/* Actions */}
        <HeaderActions cartCount={cartCount} hasLoggedin={hasLoggedin} />
      </section>
    </header>
  );
}
