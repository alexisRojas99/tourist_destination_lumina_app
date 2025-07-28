import { Destination, DestinationFilters } from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export async function getDestinations(
  filters: DestinationFilters = {}
): Promise<Destination[]> {
  try {
    const params = new URLSearchParams();

    if (filters.searchQuery) {
      params.append("search", filters.searchQuery);
    }
    if (filters.limit) {
      params.append("limit", filters.limit.toString());
    }
    if (filters.offset) {
      params.append("offset", filters.offset.toString());
    }

    const url = `${API_BASE_URL}/destinations${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const destinations: Destination[] = await response.json();
    return destinations.filter((dest) => !dest.isDeleted);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export async function getDestinationById(
  id: number
): Promise<Destination | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const destination: Destination = await response.json();
    return destination.isDeleted ? null : destination;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const destinations = await getDestinations({ limit: 6 });
    return destinations.slice(0, 6);
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}
