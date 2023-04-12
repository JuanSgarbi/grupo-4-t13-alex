import { Routes, Route } from "react-router-dom";
import { AnnouncementDetail } from "../pages/announcementDetail";
import { CardAdvertisement } from "../components/cardAdvertisement";

export default function MakeRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CardAdvertisement isActive={true} isGoodBuy={true} isHomePage={false} description="aaaaaaaaaaa" image="https://thumbs.dreamstime.com/b/carro-vermelho-do-m%C3%BAsculo-em-um-fundo-branco-54430793.jpg" km="0" owner="Gabriel Ogawa" price="0" title="Carro" year="2023" />} />
      <Route path="/announcement" element={<AnnouncementDetail />} />
    </Routes>
  );
}
