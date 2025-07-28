"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "/public/title.png";
import { Button } from "../ui";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="md:mx-auto px-4 sm:px-6 lg:ml-20 lg:mr-20">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl">
                <Image
                  src={logoImage}
                  alt="El Salvador Tourism Logo"
                  width={300}
                  height={40}
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/add-destination"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              <Button
                variant="secondary"
                size="md"
                className="bg-red-500 text-white hover:bg-red-600 transition-colors hover:cursor-pointer"
              >
                Agregar Destino
              </Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/add-destination"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <Button
                  variant="secondary"
                  size="md"
                  className="bg-red-500 text-white hover:bg-red-600 transition-colors hover:cursor-pointer"
                >
                  Agregar Destino
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
