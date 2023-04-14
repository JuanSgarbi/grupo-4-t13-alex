import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { AnnouncementDetail } from "../pages/announcementDetail";

export default function MakeRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/announcement" element={<AnnouncementDetail />} />
    </Routes>
  );
}
