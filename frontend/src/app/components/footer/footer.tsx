import Link from 'next/link';
import Image from 'next/image';
import footer from "./footer.module.scss";

export default async function Footer() {

  return (
    <footer className={footer.footer}>
      <div className={footer.footer__wrap}>
        <Link className={footer.footer__link} href="mailto:annemarie@amparsons.co.uk?subject=Freelance work" className={footer.footer__logo}>Hire me!</Link>
          <div className={footer.footer__build}>
            <p className={footer.footer__txt}>This site is built Headless with NextJS 15 and</p>
            <Link href="https://craftcms.com" target='_blank'>
              <Image
                className={footer.footer__craft}
                priority
                src="/images/craft-cms-logo.svg"
                width={220}
                height={54}
                alt="Crat CMS Logo"
                unoptimized
              />
            </Link>
          </div>
      </div>
    </footer>
  );
}
