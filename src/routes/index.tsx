import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { AnnouncementDetail } from "../pages/announcementDetail";
import { Profile } from "../pages/profile";


export default function MakeRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/announcement" element={<AnnouncementDetail />} />
      <Route path="/announcement/:id" element={<h1>anuncio por id</h1>} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
