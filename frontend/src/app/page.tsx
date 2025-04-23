import Header from './components/header/header';
import Title from './components/title/title';
import Card from './components/card/card';
import Promo from './components/promo/promo';
import Footer from './components/footer/footer';
import './styles/global-variables.scss';
import './styles/styles.scss';

export default function Home() {
  return (
    <div>
      <Header></Header>
        <main>
          <Title></Title>
          <Card></Card>
          <Card isFlipped={true}></Card>
          <Promo></Promo>
        </main>
      <Footer></Footer>
    </div>
  );
}
