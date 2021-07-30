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

export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": slug,
  }); // your fetch function here

  return {
    props: {
      recipe: items[0],
    },
  };
};
export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  const { fields } = recipe;
  return (
    <div>
      <strong>{fields.title}</strong>::Recipe Details
    </div>
  );
}
