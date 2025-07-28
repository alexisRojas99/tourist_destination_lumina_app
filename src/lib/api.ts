import { Destination, DestinationFilters } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const destinations = await getDestinations({ limit: 10 });
    return destinations;
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

export async function createDestination(
  destinationData: Omit<Destination, "id">
): Promise<Destination | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destinationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newDestination: Destination = await response.json();
    return newDestination;
  } catch (error) {
    console.error("Error creating destination:", error);
    return null;
  }
}

export async function deleteDestination(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting destination:", error);
    return false;
  }
}
