export type GalleryImage = {
  src: string;
  alt: string;
};

const HERO_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const WORK_CDN = "https://cdn.prod.website-files.com/69a2eb38c0f39fa49cd98ba1";
const PROJECT_CDN = "https://cdn.prod.website-files.com/69a9212ffc8e44e1794fb799";

export const VISION_GALLERY_COLUMNS: GalleryImage[][] = [
  [
    {
      src: `${HERO_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
      alt: "Brand identity design",
    },
    {
      src: `${HERO_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
      alt: "Web development project",
    },
    {
      src: `${WORK_CDN}/69bac6c472b3ddaac9735644_CMS%20Work%2001%20webp.webp`,
      alt: "Brand strategy work",
    },
    {
      src: `${PROJECT_CDN}/69ae7b928852077c30a9f51d_Maq-1.png`,
      alt: "Branding design project",
    },
  ],
  [
    {
      src: `${HERO_CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
      alt: "UI/UX design",
    },
    {
      src: `${WORK_CDN}/69bac6dee6fbe19c625613e7_CMS%20Work%2003%20webp.webp`,
      alt: "Motion graphics project",
    },
    {
      src: `${PROJECT_CDN}/69ce1dd984e68ff75cfcfcf3_prd.jpg`,
      alt: "Product design",
    },
    {
      src: `${WORK_CDN}/69c6157dc7884d040282487d_Work%207%20WebP.webp`,
      alt: "Digital experience design",
    },
  ],
  [
    {
      src: `${HERO_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
      alt: "Strategy and positioning",
    },
    {
      src: `${HERO_CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
      alt: "Motion design",
    },
    {
      src: `${PROJECT_CDN}/69ce1bd505ea321d262a6ef4_uiux.jpg`,
      alt: "UI UX design",
    },
    {
      src: `${WORK_CDN}/69bac6edbbaa23515e2a5e63_CMS%20Work%2004%20webp.webp`,
      alt: "Video and production work",
    },
  ],
];
