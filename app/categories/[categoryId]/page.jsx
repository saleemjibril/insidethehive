"use client";

import { useParams } from "next/navigation";
import AllEpisodes from "../../components/allEpisodes";
import { getCategoryRoute } from "../../../lib/categoryRoutes";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId;
  const category = getCategoryRoute(categoryId);

  return (
    <div className="category-page">
      <div className="category-page__header">
        <div className="category-page__header__content">
          <h1 className="category-page__header__title">{category.title}</h1>
          <p className="category-page__header__description">{category.description}</p>
        </div>
      </div>

      <div className="category-page__episodes">
        <AllEpisodes
          clientId={"34a81146217d4ccaa855f8e53f8163ac"}
          clientSecret={"90750daa64184a31bf03e6ac2426b3bd"}
          showId={"0wOOX8mdQUoRP1adnxV9VD"}
          categoryKeywords={category.keywords}
        />
      </div>
    </div>
  );
}
