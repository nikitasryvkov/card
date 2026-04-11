import http from "./http";
import type { Project } from "../types/project";

export async function fetchPortfolioProjects() {
  const { data } = await http.get<Project[]>("/v1/portfolio/projects");
  return data;
}
