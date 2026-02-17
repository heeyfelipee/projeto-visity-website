/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Activities from './pages/Activities';
import Analytics from './pages/Analytics';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Team from './pages/Team';
import Visits from './pages/Visits';
import RecuperarSenha from './pages/RecuperarSenha';
import ResetarSenha from './pages/ResetarSenha';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Activities": Activities,
    "Analytics": Analytics,
    "Clients": Clients,
    "Dashboard": Dashboard,
    "Help": Help,
    "Profile": Profile,
    "Reports": Reports,
    "Schedule": Schedule,
    "Settings": Settings,
    "Team": Team,
    "Visits": Visits,
    "RecuperarSenha": RecuperarSenha,
    "ResetarSenha": ResetarSenha,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};