import { Routes, Route } from "react-router-dom";
import { AnnouncementDetail } from "../pages/announcementDetail";

export default function MakeRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/announcement" element={<AnnouncementDetail />} />
    </Routes>
  );
}
