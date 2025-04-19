import { gql } from '@apollo/client';
import { createApolloClient } from '../libs/apolloClient';
import { notFound } from 'next/navigation';
import Hero from '../components/hero/hero';
import Columns from '../components/columns/columns';
import type { PageBuilderBlock, GetPageBySlugResponse } from '../types';

interface PageProps {
  params: {
    slug?: string[];
  };
}

const PAGE_QUERY = gql`
  query GetPageBuilderBlocks($slug: [String]) {
    entries(slug: $slug, section: "Pages") {
      id
      title
      slug
      ... on componenets_Entry {
        pageBuilder {
          __typename
          ... on hero_Entry {
            heroheading
            heroimage {
              url
              filename
              alt
            }
          }
          ... on columns_Entry {
            columnsTitle
            columnsEditor
            columnsImage {
              url
              filename
              alt
            }
          }
        }
      }
    }
  }
`;

export default async function Page(props: PageProps) {
  const params = await props.params;

  const slugArray = params.slug ?? [];
  const slugPath = slugArray.join('/') || 'home';

  const client = createApolloClient();

  const { data } = await client.query<GetPageBySlugResponse>({
    query: PAGE_QUERY,
    variables: { slug: slugPath },
  });

  const entry = data.entries?.[0];

  if (!entry) {
    return notFound();
  }

  console.log(entry.pageBuilder);

  const blocks = entry.pageBuilder ?? [];

  return (
    <main>
        {blocks.map((block: PageBuilderBlock, index: number) => {
            switch (block.__typename) {
            case 'hero_Entry':
                return <Hero key={index} heading={block.heroheading || ''} images={block.heroimage || []}  />;
            case 'columns_Entry':
                return (
                <Columns
                    key={index}
                    title={block.columnsTitle || ''}
                    editor={block.columnsEditor || ''}
                    images={block.columnsImage || []}
                />
                );
            default:
                return null;
            }
        })}
    </main>
  );
}