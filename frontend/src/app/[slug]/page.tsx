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
  params: { slug: string }; // Changed to a string since we are using [slug] (single-segment)
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

  try {
    const response = await client.query({ query: GET_ALL_SLUGS });
    const entries = response.data?.entries;

    console.log('✅ Slugs fetched from Craft CMS:', entries);

    if (!entries || entries.length === 0) {
      console.warn('⚠️ No entries found in Craft CMS during build.');
      return [{ slug: 'home' }]; // Return a single string for "home"
    }

    // Return slugs as a simple string, not an array
    return entries.map((entry: { slug: string }) => ({
      slug: entry.slug || 'home', // Default to 'home' if no slug
    }));
  } catch (error) {
    console.error('❌ Error fetching slugs from Craft CMS:', error);
    return [{ slug: 'home' }]; // Fallback to 'home' if error occurs
  }
}

// This tells Next.js to generate only the routes returned above.
export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = params; // Destructure slug from params (since it's now a string)
  const client = createApolloClient();

  const { data } = await client.query<GetPageBySlugResponse>({
    query: PAGE_QUERY,
    variables: { slug: slug }, // Pass slug as an array
  });

  const entry = data.entries?.[0];

  if (!entry) {
    return notFound();
  }

  const blocks = entry.pageBuilder ?? [];

  const { data: settingsData } = await client.query<GetSettingsPageResponse>({
    query: GET_SETTINGS,
  });
  const settings = settingsData.siteSettingsEntries?.[0] || {};

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
