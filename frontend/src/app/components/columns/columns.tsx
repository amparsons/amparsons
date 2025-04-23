import Image from 'next/image';
import Link from 'next/link';
import columns from "./columns.module.scss";
import type { ColumnsProps } from '../../types';

export default async function Columns({ title, editor, image, hireemail, linkedin }: ColumnsProps) {

  return (
    <section className={columns.columns}>
      <div className={columns.columns__left}>
        {image &&
          <Image
              src={image?.url || ''}
              width={1280}
              height={717}
              alt={image?.alt || image?.filename || 'Image'}
              className={columns.columns__image}
          />
        }
      </div>
      <div className={columns.columns__right}>
        <div className={`${columns.columns__wrap} ${columns.columns__wrapRight}`}>
            {title && <h2 className={columns.columns__title}>{title}</h2>}
            {editor &&<p className={columns.columns__text}>{editor}</p>}
            <ul className={columns.columns__list}>
              <li className={columns.columns__item}>
                {hireemail && <Link className={columns.columns__link} href={`mailto:${hireemail}?subject=I have a project lets talk`} aria-label="Email me">
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
                </Link>}
              </li>
              <li className={columns.columns__item}>
                {linkedin && <Link className={columns.columns__link} href={linkedin} target="_blank" aria-label="Connect on linkedin">
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
                </Link>}
              </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
