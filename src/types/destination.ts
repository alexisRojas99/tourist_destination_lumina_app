export interface Destination {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  likes: string;
  isDeleted: boolean;
}

export interface DestinationFilters {
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export interface DestinationResponse {
  destinations: Destination[];
  total: number;
}
