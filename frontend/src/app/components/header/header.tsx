import { gql } from '@apollo/client';
import { createApolloClient } from '../../libs/apolloClient';
import { GetNavigationPagesResponse, GetSettingsPageResponse } from '../../types';
import Link from 'next/link';
import header from './header.module.scss';

const GET_NAVIGATION = gql`
  query GetNavigationPages {
    entries(section: "Pages", orderBy: "title ASC", drafts: false) {
      id
      title
      slug
      url
    }
  }
`;

const GET_SETTINGS = gql`
  query GetSettingsPage {
    siteSettingsEntries {
      ... on settings_Entry {
        hireMeLabel
        hireMeEmail
        hireMeSubject
      }
    }
  }
`;

export default async function Header() {
  const client = createApolloClient();

  const { data } = await client.query<GetNavigationPagesResponse>({
    query: GET_NAVIGATION,
  });

  const { data: settingsData } = await client.query<GetSettingsPageResponse>({
    query: GET_SETTINGS,
  });
  const settings = settingsData.siteSettingsEntries?.[0];

  return (
    <header className={header.header} role="banner">
      <div className={header.header__wrap}>
        <Link href="/" className={header.header__logo}>
          <div className={header.header__logoType}>Annemarie Parsons</div>
        </Link>

        <ul className={header.header__menu}>
          {data.entries.map((entry) => (
            <li key={entry.id} className={header.header__item}>
              <Link href={`/${entry.slug}`} className={header.header__link}>
                {entry.title}
              </Link>
            </li>
          ))}

          {settings && (
            <li className={`${header.header__item} ${header.header__itemLast}`}>
              <a
                className={`${header.header__link} ${header.header__linkCta}`}
                href={`mailto:${settings.hireMeEmail}?subject=${encodeURIComponent(settings.hireMeSubject)}`}
                aria-label={`Email me to ${settings.hireMeLabel?.toLowerCase()}`}
              >
                {settings.hireMeLabel}
              </a>
            </li>
          )}
          
        </ul>
      </div>
    </header>
  );
}