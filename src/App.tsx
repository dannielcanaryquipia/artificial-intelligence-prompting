import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Lesson } from "@/pages/Lesson";
import { CaseStudies } from "@/pages/CaseStudies";
import { Activity } from "@/pages/Activity";
import { About } from "@/pages/About";
import { Resources } from "@/pages/Resources";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
