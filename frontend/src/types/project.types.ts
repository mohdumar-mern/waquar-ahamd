export interface Project {
  _id        : string;
  title      : string;
  slug       : string;
  category   : "F1"|"Automotive"|"Commercial"|"GameCinematic"|"ShortFilm"|"ProductViz";
  description: string;
  thumbnail? : { url: string };
  video?     : { url: string };
  images?    : { url: string; caption?: string }[];
  tools      : string[];
  client     : string;
  year       : number;
  featured   : boolean;
  metaTitle? : string;
  metaDesc?  : string;
  createdAt  : string;
  updatedAt  : string;
}

export interface ProjectsResponse {
  data : { data: Project[]; total: number; page: number; pages: number };
  success: boolean;
  message: string;
}
