export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  approach: string;
  impact: string;
  role: string;
  featured: boolean;
  treeHouseAttribution: string;
  image?: string;
}

export const CASE_STUDY_CATEGORIES = [
  "Strategic Transformation",
  "Innovation & Design",
  "Capability Building",
  "Culture & Change",
] as const;

export type CaseStudyCategory = typeof CASE_STUDY_CATEGORIES[number];
