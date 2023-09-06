const mapping: Record<string, string> = {
  candidates: 'candidate',
  employers: 'employer',
  interviews: 'interview',
  jobs: 'job',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
