export interface Project {
  id: string;
  clientId: string | null;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  coverImageUrl: string | null;
  liveUrl: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  status: "DISCOVERY" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "ON_HOLD";
  budget: number | null;
  kickoffDate: string | null;
  deliveryDate: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}
