import { gql } from '@apollo/client';
import { createApolloClient } from '../libs/apolloClient';
import { notFound } from 'next/navigation';
import Header from '../components/header/header';
import Hero from '../components/hero/hero';
import Columns from '../components/columns/columns';
import Footer from '../components/footer/footer';
import type { GetPageBySlugResponse, GetSettingsPageResponse } from '../types';
import '../styles/global-variables.scss';
import '../styles/styles.scss';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const dynamicParams = false;

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
    return [{ slug: ['home'] }];
  }

  return data.entries.map((entry: { slug: string }) => ({
    slug: entry.slug ? [entry.slug] : ['home'],
  }));
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const slugArray = (await params).slug ?? ['home']; // Await the Promise here
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
      <Header />
      <main>
        {blocks.map((block, index) => {
          switch (block.__typename) {
            case 'hero_Entry':
              return (
                <Hero key={index} heading={block.heroheading || ''} headingTwo={block.heroHeadingTwo || ''} heroDesc={block.heroDesc || ''} image={block.heroimage?.[0] ?? null} />
              );
            case 'columns_Entry':
              return (
                <Columns
                  key={index}
                  title={block.columnsTitle || ''}
                  editor={block.columnsEditor || ''}
                  image={block.columnsImage?.[0] ?? null}
                  hireemail={settings.hireMeEmail || ''}
                  linkedin={settings.linkedinUrl?.url || ''}
                />
              );
            default:
              return null;
          }
        })}
      </main>
      <Footer />
    </>
  );
}