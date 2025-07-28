"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../src/components/ui";
import { DestinationCard } from "../src/components/features";
import { getFeaturedDestinations } from "../src/lib";
import { Destination } from "../src/types";
import Image from "next/image";

export default function Home() {
  const [featuredDestinations, setFeaturedDestinations] = useState<
    Destination[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const destinations = await getFeaturedDestinations();
        setFeaturedDestinations(destinations);
      } catch (error) {
        console.error("Error loading destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  const handleDestinationDelete = (deletedId: number) => {
    setFeaturedDestinations((prev) =>
      prev.filter((destination) => destination.id !== deletedId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <div className="relative h-150 bg-gradient-to-r from-blue-600 to-blue-800">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background.png')",
            }}
          ></div>

          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r  via-white flex items-center justify-center">
            <div className="w-full h-full">
              <Image
                src="/background-2.png"
                alt="El Salvador Tourism Image"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                width={1500}
                height={50}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Cargando destinos...</p>
              </div>
            ) : (
              featuredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onDelete={handleDestinationDelete}
                />
              ))
            )}
          </div>

          {!loading && featuredDestinations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay destinos disponibles
              </h3>
              <Link href="/destinations">
                <Button variant="outline">Ver todos los destinos</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué visitar El Salvador?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro país ofrece experiencias únicas para todos los gustos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Destinos Únicos
              </h3>
              <p className="text-gray-600">
                Desde volcanes hasta playas, ruinas arqueológicas y ciudades
                coloniales
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gente Cálida
              </h3>
              <p className="text-gray-600">
                La hospitalidad salvadoreña te hará sentir como en casa
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clima Tropical
              </h3>
              <p className="text-gray-600">
                Disfruta del sol todo el año en nuestro hermoso país
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
