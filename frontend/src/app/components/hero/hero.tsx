import hero from "./hero.module.scss";
import type { HeroProps } from '../../types';

export default async function Hero({ heading, headingTwo, heroDesc, image }: HeroProps) {

  return (
    <div className="wrapper">
        <div className={hero.hero}>
            <h1
              className={hero.hero__title}
              style={image ? { backgroundImage: `url(${image.url})` } : undefined}
            >
              {heading && <span>{heading}</span>}
              {headingTwo && <span>{headingTwo}</span>}
            </h1>
           
            {heroDesc && (
              <div
                className={hero.hero__text}
                dangerouslySetInnerHTML={{ __html: heroDesc }}
              />
            )}
        </div>
    </div>
  );
}
