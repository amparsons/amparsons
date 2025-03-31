import Link from 'next/link';
import header from "./header.module.scss";

export default async function Header() {

  return (
      <header className={header.header}>
        <div className={header.header__wrap}>
          <Link href="/" className={header.header__logo}>
            <div className={header.header__logoType}>
              Annemarie Parsons
            </div>
          </Link>
          <ul className={header.header__menu}>
              <li className={header.header__item}><Link className={header.header__link} href="/about">About</Link></li>
              <li className={header.header__item}><Link className={header.header__link} href="/blog">Blog</Link></li>
              <li className={header.header__item}><Link className={`${header.header__link} ${header.header__linkCta}`} href="mailto:annemarie@amparsons.co.uk?subject=Freelance work" aria-label="Email me to hire me">Hire me!</Link></li>
          </ul>
        </div>
      </header>
  );
}
