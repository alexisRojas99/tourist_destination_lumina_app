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
    <div className="bg-gray-50">
      <div className="md:w-9/12 mx-auto md:p-10 md:mt-10 mb-20 bg-white rounded-2 flex flex-col items-center">
        <div className="relative h-100 w-full">
          <Image
            fill
            className="object-cover"
            src={destination.imageUrl}
            alt={destination.name}
            priority
          />
          <div className="absolute inset-0" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 py-8">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="none"
                className="flex items-center space-x-2 text-gray-500 hover:cursor-pointer hover:bg-none"
              >
                <Heart className="h-5 w-5 hover:text-red-600 transition-colors" />
                <span>{destination.likes}</span>
              </Button>
            </div>
          </div>

          <div className="text-center text-black">
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center space-x-2 justify-center mb-10">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{destination.address}</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {destination.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed w-full h-12 bottom-0">
        <Image
          src="/background-2.png"
          alt="El Salvador Tourism Image"
          className="w-full h-full object-cover"
          width={1500}
          height={50}
          priority
        />
      </div>
    </div>
  );
}
