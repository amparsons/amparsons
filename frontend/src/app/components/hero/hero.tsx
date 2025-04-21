import hero from "./hero.module.scss";
import type { HeroProps } from '../../types';

export default async function Hero({ heading, headingTwo, heroText, image }: HeroProps) {

  return (
    <div className="wrapper">
        <div className={hero.hero}>
            <h1 className={hero.hero__title}><span>{heading}</span> <span>{headingTwo}</span></h1>
            {image && (
              <img
                src={image.url}
                alt={image.alt || image.filename || ''}
                width={image.width || undefined}
                height={image.height || undefined}
              />
            )}
            <div
              className={hero.hero__text}
              dangerouslySetInnerHTML={{ __html: heroText }}
            />
        </div>
    </div>
  );
}
