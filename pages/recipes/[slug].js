import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
  }); // your fetch function here

  const paths = items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  }); // your fetch function here

  return {
    props: {
      recipe: items[0],
    },
  };
};
export default function RecipeDetails({ recipe }) {
  const { fields } = recipe;
  return (
    <div>
      {" "}
      <strong>{fields.title}</strong> Recipe Details
    </div>
  );
}
