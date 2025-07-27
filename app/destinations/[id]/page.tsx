import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDestinationById } from "../../../src/lib";
import { Button } from "../../../src/components/ui/Button";
import { Heart, MapPin } from "lucide-react";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { id } = await params;
  const destination = await getDestinationById(parseInt(id));

  if (!destination) {
    return {
      title: "Destino no encontrado",
    };
  }

  return {
    title: `${destination.name} - Turismo El Salvador`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { id } = await params;
  const destination = await getDestinationById(parseInt(id));

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-100 w-full">
        <Image
          fill
          className="object-cover"
          src={destination.imageUrl}
          alt={destination.name}
          priority
        />
        <div className="absolute inset-0" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{destination.address}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
                  >
                    <Heart className="h-5 w-5" />
                    <span>{destination.likes} Me gusta</span>
                  </Button>
                </div>
              </div>

              <h2 className="text-2xl text-gray-500 font-bold mb-4">
                Acerca de este destino
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {destination.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl text-gray-500 font-bold mb-4">
                Información del destino
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Ubicación
                  </h4>
                  <p className="text-gray-600">{destination.address}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Popularidad
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600">
                      {destination.likes} personas les gusta esto
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
