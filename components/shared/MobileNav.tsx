"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";

const MobileNav = () => {
  return (
    <header className="header">
      <Link href="/">
        <Image
          src="/assets/images/logo-text.svg"
          width={152}
          height={24}
          alt="logo"
        ></Image>
      </Link>
      <div className="flex gap-4">
        <UserButton></UserButton>
        <Sheet>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              width={26}
              height={26}
              alt="logo"
            ></Image>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Link href="/">
                  <Image
                    src="/assets/images/logo-text.svg"
                    width={152}
                    height={24}
                    alt="logo"
                  ></Image>
                </Link>
              </SheetTitle>
              <SheetDescription>
                <SignedIn>
                  <ul className="header-nav_elements">
                    {navLinks.map((link) => {
                      const isActive = link.route === usePathname();
                      return (
                        <li
                          key={link.route}
                          className={`sidebar-nav_element group ${
                            isActive
                              ? "bg-purple-gradient text-white"
                              : "text-gray-700"
                          }`}
                        >
                          <Link href={link.route} className="sidebar-link">
                            <Image
                              src={link.icon}
                              width={24}
                              height={24}
                              alt="icons"
                            ></Image>
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </SignedIn>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileNav;
