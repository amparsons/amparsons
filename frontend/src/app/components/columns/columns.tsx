import Image from 'next/image';
import Link from 'next/link';
import columns from "./columns.module.scss";
import type { ColumnsProps } from '../../types';

export default async function Columns({ title, editor, image }: ColumnsProps) {

  return (
    <section className={columns.columns}>
      <div className={columns.columns__left}>
      <Image
            src="/images/code-computer.jpg"
            width={1280}
            height={717}
            alt="Computer code image"
            className={columns.columns__image}
          />
      </div>
      <div className={columns.columns__right}>
        <div className={`${columns.columns__wrap} ${columns.columns__wrapRight}`}>
            <h2 className={columns.columns__title}>Contact me</h2>
            <p className={columns.columns__text}>I'm open to both short-term and long-term contracts. Feel free to reach out if you're interested in collaborating or would like to know more!</p>
            <ul className={columns.columns__list}>
              <li className={columns.columns__item}>
                <Link className={columns.columns__link} href="mailto:annemarie@amparsons.co.uk?subject=I have a project lets talk" aria-label="Email me">
                  <Image
                    className={columns.columns__img}
                    priority
                    src="/images/email-icon.svg"
                    height={32}
                    width={32}
                    alt="Email me"
                    unoptimized
                  />
                  <span className={columns.columns__txt}>Email</span>
                </Link>
              </li>
              <li className={columns.columns__item}>
                <Link className={columns.columns__link} href="https://www.linkedin.com/in/annemarieparsons" aria-label="Connect on linkedin">
                  <Image
                    className={columns.columns__img}
                    priority
                    src="/images/linkedin-icon.svg"
                    height={32}
                    width={32}
                    alt="Connect on linkedin"
                    unoptimized
                  />
                  <span className={columns.columns__txt}>Linkedin</span>
                </Link>
              </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
