export type ProjectVariant = "default" | "offset" | "compact";

export const PROJECTS = [
  {
    name: "Branding Design",
    image:
      "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799/69ae7b928852077c30a9f51d_Maq-1.png",
    variant: "default" as ProjectVariant,
  },
  {
    name: "Product Design",
    image:
      "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799/69ce1dd984e68ff75cfcfcf3_prd.jpg",
    variant: "offset" as ProjectVariant,
  },
  {
    name: "Photography",
    image:
      "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799/69ce1ae0b23cca0685c7969e_photography.jpg",
    variant: "compact" as ProjectVariant,
  },
  {
    name: "Motion Graphics",
    image:
      "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799/69b273e8710a5d1e7f989103_Rectangle%2024.png",
    variant: "offset" as ProjectVariant,
  },
  {
    name: "UI UX Design",
    image:
      "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799/69ce1bd505ea321d262a6ef4_uiux.jpg",
    variant: "default" as ProjectVariant,
  },
] as const;
