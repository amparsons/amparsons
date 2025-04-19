import hero from "./hero.module.scss";
import type { HeroProps } from '../../types';

export default async function Hero({ heading, images }: HeroProps) {

  return (
    <div className="wrapper">
        <div className={hero.hero}>
            <h1 className={hero.hero__title}><span>Frontend</span> <span>Developer</span></h1>
            <p className={hero.hero__text}>Freelancer collaborating with digital agencies to translate designs in to functional UI components and integrated design systems. My expertise spans various platforms, including Sitecore, Craft CMS and WordPress.</p>
            <p className={hero.hero__text}>Always playing with new platforms and more recently been learning Shopify, Umbraco Heartcore and XM Cloud.</p>
            
        </div>
    </div>
  );
}
