import { gql } from '@apollo/client';
import { createApolloClient } from '../libs/apolloClient';
import { notFound } from 'next/navigation';
import Header from '../components/header/header';
import Hero from '../components/hero/hero';
import Columns from '../components/columns/columns';
import Footer from '../components/footer/footer';
import type { PageBuilderBlock, GetPageBySlugResponse, GetSettingsPageResponse } from '../types';
import '../styles/global-variables.scss';
import '../styles/styles.scss';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
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

const GET_SETTINGS = gql`
  query GetSettingsPage {
    siteSettingsEntries {
      ... on settings_Entry {
        hireMeEmail
        hireMeEmail
        githubUrl {
          url
        }
        linkedinUrl {
          url
        }
      }
    }
  }
`;

// New function to statically generate all paths at build time
export async function generateStaticParams() {
  const client = createApolloClient();

  const GET_ALL_SLUGS = gql`
    query GetAllPageSlugs {
      entries(section: "Pages") {
        slug
      }
    }
  `;

  const { data } = await client.query({ query: GET_ALL_SLUGS });

  if (!data?.entries || data.entries.length === 0) {
    // Fallback to home page if no entries found
    return [{ slug: ['home'] }];
  }

  return data.entries.map((entry: { slug: string }) => ({
    slug: entry.slug ? [entry.slug] : ['home'],
  }));
}

// This tells Next.js to generate only the routes returned above.
export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug ?? ['home'];
  const client = createApolloClient();

  const { data } = await client.query<GetPageBySlugResponse>({
    query: PAGE_QUERY,
    variables: { slug: slugArray },
  });

  const entry = data.entries?.[0];

  if (!entry) {
    return notFound();
  }

  const blocks = entry.pageBuilder ?? [];

  const { data: settingsData } = await client.query<GetSettingsPageResponse>({
    query: GET_SETTINGS,
  });
  const settings = settingsData.siteSettingsEntries?.[0];

  return (
    <>
      <Header></Header>
      <main>
        {blocks.map((block: PageBuilderBlock, index: number) => {
          switch (block.__typename) {
            case 'hero_Entry':
              return (
                <Hero
                  key={index}
                  heading={block.heroheading || ''}
                  headingTwo={block.heroHeadingTwo || ''}
                  heroDesc={block.heroDesc || ''}
                  image={
                    block.heroimage?.[0]
                      ? {
                          url: block.heroimage[0].url,
                          filename: block.heroimage[0].filename,
                          alt: block.heroimage[0].alt ?? '',
                          width: block.heroimage[0].width,
                          height: block.heroimage[0].height,
                        }
                      : null
                  }
                />
              );
            case 'columns_Entry':
              return (
                <Columns
                  key={index}
                  title={block.columnsTitle || ''}
                  editor={block.columnsEditor || ''}
                  image={
                    block.columnsImage?.[0]
                      ? {
                          url: block.columnsImage[0].url,
                          filename: block.columnsImage[0].filename,
                          alt: block.columnsImage[0].alt ?? '',
                          width: block.columnsImage[0].width,
                          height: block.columnsImage[0].height,
                        }
                      : null
                  }
                  hireemail={settings.hireMeEmail || ''}
                  linkedin={settings.linkedinUrl?.url || ''}
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