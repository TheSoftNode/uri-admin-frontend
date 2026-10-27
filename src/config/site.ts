export const siteConfig = {
  name: "URI Social",
  product: "Admin Console",
  description: "Operations console for the URI Social platform.",
  logo: "/brand/uri-logo.png",
} as const;

/** Signed-in operator. Replaced by the session once auth is wired to the backend. */
export const currentOperator = {
  name: "Ada Okafor",
  email: "ada.okafor@urisocial.com",
  role: "Super admin",
  initials: "AO",
} as const;
