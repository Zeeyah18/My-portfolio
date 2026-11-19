import { NextRequest, NextResponse } from "next/server";
import icons from "simple-icons/icons.json";

export const dynamic = "force-dynamic";

type RawIcon = {
  title: string;
  slug: string;
  hex: string;
  aliases?: { aka?: string[] };
};

type CatalogIcon = {
  title: string;
  slug: string;
  hex: string;
  search: string;
};

const POPULAR_SLUGS = [
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "html5",
  "css",
  "tailwindcss",
  "nodedotjs",
  "python",
  "git",
  "github",
  "figma",
  "docker",
  "postgresql",
  "mongodb",
  "vercel",
];

let catalog: CatalogIcon[] | null = null;

function getCatalog(): CatalogIcon[] {
  if (!catalog) {
    catalog = (icons as RawIcon[]).map((icon) => ({
      title: icon.title,
      slug: icon.slug,
      hex: icon.hex,
      search: [icon.title, icon.slug, ...(icon.aliases?.aka ?? [])].join(" ").toLowerCase(),
    }));
  }
  return catalog;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const slug = request.nextUrl.searchParams.get("slug")?.trim().toLowerCase() ?? "";
  const list = getCatalog();

  if (slug) {
    const match = list.find((icon) => icon.slug === slug);
    return NextResponse.json(match ? [{ title: match.title, slug: match.slug, hex: match.hex }] : []);
  }

  const matches = query
    ? list.filter((icon) => icon.search.includes(query)).slice(0, 60)
    : POPULAR_SLUGS.map((popular) => list.find((icon) => icon.slug === popular)).filter(
        (icon): icon is CatalogIcon => Boolean(icon),
      );

  return NextResponse.json(matches.map(({ title, slug: iconSlug, hex }) => ({ title, slug: iconSlug, hex })));
}
