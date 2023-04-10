import { Routes, Route } from "react-router-dom";

export default function MakeRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
    </Routes>
  );
}
