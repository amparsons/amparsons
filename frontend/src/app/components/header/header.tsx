import { gql } from '@apollo/client';
import { createApolloClient } from '../../libs/apolloClient';
import { GetNavigationPagesResponse } from '../../types';
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

export default async function Header() {
  const client = createApolloClient();

  const { data } = await client.query<GetNavigationPagesResponse>({
    query: GET_NAVIGATION,
  });

  return (
    <header className={header.header} role="banner">
      <div className={header.header__wrap}>
        <Link href="/" className={header.header__logo}>
          <div className={header.header__logoType}>Annemarie Parsons</div>
        </Link>

        <ul className={header.header__menu}>
          {data.entries.map((entry) => (
            <li key={entry.id} className={header.header__item}>
              <Link href={entry.slug} className={header.header__link}>
                {entry.title}
              </Link>
            </li>
          ))}
          {/* <li className={`${header.header__item} ${header.header__itemLast}`}>
            <Link
              className={`${header.header__link} ${header.header__linkCta}`}
              href="mailto:annemarie@amparsons.co.uk?subject=Freelance work"
              aria-label="Email me to hire me"
            >
              Hire me!
            </Link>
          </li> */}
        </ul>
      </div>
    </header>
  );
}