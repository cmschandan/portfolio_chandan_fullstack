# Changelog

All notable changes to this portfolio project are documented in this file.

## [1.0.0] - 2026-02-05

### Added

#### Theme System
- **5 Color Themes**: Cyan (Cyber), Purple (Galaxy), Green (Matrix), Orange (Sunset), Pink (Neon)
- **Theme Switcher**: Dropdown in navbar with color previews and effect names
- **Persistent Themes**: Selected theme saved to localStorage

#### Theme-Based Hero Background Effects
Each theme has a unique animated canvas background:
- **Cyan (Cyber Cyan)**: Digital code streams with programming keywords (`const`, `function`, `useState`, etc.) and binary rain
- **Purple (Galaxy Purple)**: Twinkling starfield with shooting stars and floating nebula clouds
- **Green (Matrix Green)**: Classic matrix rain effect with Japanese katakana characters and glowing trails
- **Orange (Sunset Orange)**: Light beams falling from top with floating embers rising up
- **Pink (Neon Pink)**: Colorful bubbles rising with 4-point sparkle effects

#### UI/UX Enhancements
- **Glass Hover Effects**: Navigation items have glassmorphism effect with backdrop blur on hover
- **Light Color Outline**: Menu items show cyan border glow on hover
- **Glass Sweep Animation**: Left-to-right shine effect on all buttons (glow-btn, outline-btn)
- **Cursor Pointer**: Hand cursor on all interactive elements (links, buttons, clickable items)

#### Sections
- **Hero Section**: Animated greeting, typewriter effect for title, social links, scroll indicator
- **About Section**: Profile card with hover-to-reveal image, stats, journey locations
- **Skills Section**: Categorized skills with progress indicators
- **Experience Section**: Timeline view of work history
- **Projects Section**: Project cards with tech stack tags
- **Contact Section**: Contact form and social links
- **Footer**: Navigation links and copyright

#### 3D Elements
- Three.js powered 3D scene in hero background
- Floating geometric shapes
- Particle field effects

### Fixed
- Removed decorative corner rectangle from About section profile card

### Technical Stack
- **Framework**: Next.js 16.1.6 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Language**: TypeScript

---

## File Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, animations, theme variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page component
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx         # Three.js scene setup
│   │   ├── FloatingShapes.tsx # Animated 3D shapes
│   │   └── ParticleField.tsx  # Particle effects
│   ├── sections/
│   │   ├── Hero.tsx      # Hero section
│   │   ├── About.tsx     # About me section
│   │   ├── Skills.tsx    # Skills section
│   │   ├── Experience.tsx # Experience timeline
│   │   ├── Projects.tsx  # Projects showcase
│   │   ├── Contact.tsx   # Contact form
│   │   └── Footer.tsx    # Footer
│   ├── ui/
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── ThemeSwitcher.tsx # Theme dropdown
│   │   └── HeroBackground.tsx # Theme-based animated backgrounds
│   └── Providers.tsx     # Context providers wrapper
├── context/
│   └── ThemeContext.tsx  # Theme state management
└── constants/
    └── index.ts          # Personal info, skills, projects data
```
