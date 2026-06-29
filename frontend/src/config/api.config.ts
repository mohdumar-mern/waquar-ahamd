export const apiConfig = {
  baseUrl : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  timeout : 10000,
  endpoints: {
    projects : "/projects",
    featured : "/projects/featured",
    skills   : "/skills",
    about    : "/about",
    contact  : "/contact",
  },
} as const;
