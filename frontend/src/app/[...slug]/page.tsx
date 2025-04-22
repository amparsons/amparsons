import { gql } from '@apollo/client';
import { createApolloClient } from '../libs/apolloClient';
import { notFound } from 'next/navigation';
import Header from '../components/header/header';
import Hero from '../components/hero/hero';
import Columns from '../components/columns/columns';
import Footer from '../components/footer/footer';
import type { PageBuilderBlock, GetPageBySlugResponse } from '../types';
import '../styles/global-variables.scss';
import '../styles/styles.scss';

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
            heroHeadingTwo
            heroDesc
            heroimage {
              url
              filename
              ... on images_Asset {
                id
                filename
                url
                alt
                width
                height	
              }
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

  const blocks = entry.pageBuilder ?? [];
  console.log('GraphQL data:', JSON.stringify(data, null, 2));

  return (
    <>
      <Header></Header>
      <main>
        
          {blocks.map((block: PageBuilderBlock, index: number) => {
              switch (block.__typename) {
              case 'hero_Entry':
                  return <Hero key={index} 
                  heading={block.heroheading || ''} 
                  headingTwo={block.heroHeadingTwo || ''} 
                  heroDesc={block.heroDesc || ''} 
                  image={block.heroimage?.[0] ?? null} 
                />;
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
      <Footer></Footer>
    </>
  );
}