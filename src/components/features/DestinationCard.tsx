import Image from "next/image";
import Link from "next/link";
import { Destination } from "../../types";
import { Card, CardContent } from "../ui";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
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
          {destination.likes}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {destination.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {destination.description}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{destination.address}</p>
        </div>

        <div className="mt-4">
          <Link
            href={`/destinations/${destination.id}`}
            className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Ver más
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
