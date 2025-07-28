"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "../../types";
import { Button, Card, CardContent } from "../ui";
import { deleteDestination } from "../../lib/api";

interface DestinationCardProps {
  destination: Destination;
  onDelete?: (id: number) => void;
}

export function DestinationCard({
  destination,
  onDelete,
}: DestinationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(`¿Estás seguro de que quieres eliminar "${destination.name}"?`)
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const success = await deleteDestination(destination.id);

      if (success) {
        if (onDelete) {
          onDelete(destination.id);
        }
      } else {
        alert("Error al eliminar el destino. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Error al eliminar el destino. Intenta nuevamente.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative h-48">
        <Image
          src={destination.imageUrl}
          sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
          <svg
            className="w-4 h-4 text-red-500 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span className="text-gray-400 mr-1">{destination.likes}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 mt-3">
          {destination.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3 min-h-15">
          {destination.description}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{destination.address}</p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href={`/destinations/${destination.id}`}
            className="text-gray-700 text-center py-2 px-4 rounded-md transition-colors inline-block"
          >
            Ver más
          </Link>
        </div>
        <div className="mt-2">
          <Button
            variant="primary"
            onClick={handleDelete}
            disabled={isDeleting}
            className="mt-2 w-full !bg-[#6a9fd5] hover:cursor-pointer text-white text-center py-2 px-4 rounded-md hover:!bg-blue-500 transition-colors inline-block disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
