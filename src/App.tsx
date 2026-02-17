import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVisity from './components/auth/LoginVisity';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Home from '@/pages/Home';
import DashboardArea from '@/pages/DashboardArea';
import Register from '@/pages/Register';
import Payment from '@/pages/Payment';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';
import Documentation from '@/pages/Documentation';
import Status from '@/pages/Status';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import ChatWidget from '@/components/custom/ChatWidget';
import CookieBanner from '@/components/custom/CookieBanner';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pagamento" element={<Payment />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/carreiras" element={<Careers />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/ajuda" element={<Help />} />
            <Route path="/documentacao" element={<Documentation />} />
            <Route path="/status" element={<Status />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/dashboard" element={<LoginVisity />} />
            <Route path="/dashboard-area" element={<DashboardArea />} />
          </Routes>
          <ChatWidget />
          <CookieBanner />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
