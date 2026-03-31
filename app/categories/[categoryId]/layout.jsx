import { getCategoryRoute } from "../../../lib/categoryRoutes";
import { socialMetadata } from "../../../lib/socialMetadata";

export async function generateMetadata({ params }) {
  const { categoryId } = await params;
  const cat = getCategoryRoute(categoryId);
  const title = cat.title;
  const description = cat.description;
  const images = cat.image
    ? [{ url: cat.image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    ...socialMetadata(`/categories/${categoryId}`, {
      title,
      description,
      ...(images ? { images } : {}),
    }),
  };
}

export default function CategoryLayout({ children }) {
  return children;
}
