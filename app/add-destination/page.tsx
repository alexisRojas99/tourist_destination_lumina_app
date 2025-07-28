"use client";

import { useState } from "react";
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import Image from "next/image";

interface DestinationForm {
  name: string;
  address: string;
  description: string;
  imageUrl: string;
}

export default function AddDestinationPage() {
  const [formData, setFormData] = useState<DestinationForm>({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          description: formData.description,
          imageUrl: formData.imageUrl,
        }),
      });

      if (response.ok) {
        setSubmitMessage("¡Destino agregado exitosamente!");
        setFormData({
          name: "",
          address: "",
          description: "",
          imageUrl: "",
        });
      } else {
        setSubmitMessage("Error al agregar el destino. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="md:w-9/12 mx-auto md:p-10 md:mt-10 mb-20 bg-white rounded-2 flex flex-col items-center">
        <div className="max-w-2xl w-full mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Agregar destino turístico
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre:
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre del destino"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Dirección:
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dirección del destino"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descripción:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-black text-sm"
                placeholder="Descripción del destino"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Url imagen:
              </label>
              <Input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            {submitMessage && (
              <div
                className={`text-center text-sm ${
                  submitMessage.includes("exitosamente")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-md bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {isSubmitting ? "Agregando..." : "Agregar destino"}
              </Button>
            </div>
          </form>
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
