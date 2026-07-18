// app/page.tsx
import Promotion from './components/promotion/promotion';
import Header from './components/header/header';
import Main from './components/main/main';
import Newarrivals from './components/newarrivals/newarrivals';
import Topselling from './components/topselling/topselling';
import DressStyles from './components/dressStyles/dressStyles';
import Reviews from './components/reviews/Reviews';

export default function Home() {
  return (
    <main>
      <Promotion />
      <Header />
      <Main/>
      
      {/* Остальные секции */}
    </main>
  );
}