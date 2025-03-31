import Header from './components/header/header';
import Title from './components/title/title';
import Hero from './components/hero/hero';
import Card from './components/card/card';
import Columns from './components/columns/columns';
import Promo from './components/promo/promo';
import Footer from './components/footer/footer';
import './styles/global-variables.scss';
import './styles/styles.scss';

export default function Home() {
  return (
    <div>
      <Header></Header>
        <main>
          <Hero></Hero>
          <Title></Title>
          <Card></Card>
          <Card isFlipped={true}></Card>
          <Columns></Columns>
          <Promo></Promo>
        </main>
      <Footer></Footer>
    </div>
  );
}
