import { Route, Routes } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ResearchPage } from './pages/ResearchPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  )
}
