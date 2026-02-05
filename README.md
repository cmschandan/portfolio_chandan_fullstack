# Chandan Kumar - Full Stack Developer Portfolio

A modern, interactive portfolio website built with Next.js, featuring 3D elements, theme switching, and stunning animated backgrounds.

![Portfolio Preview](public/images/preview.png)

## Features

- **5 Dynamic Themes** - Cyber Cyan, Galaxy Purple, Matrix Green, Sunset Orange, Neon Pink
- **Animated Backgrounds** - Each theme has a unique canvas-based animation (Matrix rain, starfield, code streams, etc.)
- **3D Elements** - Three.js powered floating shapes and particle effects
- **Responsive Design** - Fully responsive across all devices
- **Smooth Animations** - Framer Motion powered transitions
- **Glass Morphism UI** - Modern glassmorphism design elements
- **Interactive Components** - Hover effects, typewriter text, and more

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:cmschandan/portfolio_chandan_fullstack.git
   cd portfolio_chandan_fullstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Deploy on Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done)

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository: `portfolio_chandan_fullstack`
   - Click "Import"

4. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For preview deployment
   vercel

   # For production deployment
   vercel --prod
   ```

### Custom Domain (Optional)

1. Go to your project on Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Project Structure

```
├── public/
│   ├── images/           # Static images
│   └── ChandanKumar.pdf  # Resume file
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   │   ├── 3d/          # Three.js components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # UI components
│   ├── context/         # React context
│   └── constants/       # Data constants
├── CHANGELOG.md         # Version history
└── README.md           # This file
```

## Customization

### Update Personal Info
Edit `src/constants/index.ts` to update:
- Name, title, location
- Social links (GitHub, LinkedIn, Email)
- Skills and experience
- Projects

### Change Themes
Edit `src/context/ThemeContext.tsx` to modify:
- Color schemes
- Theme names
- Add new themes

### Modify Backgrounds
Edit `src/components/ui/HeroBackground.tsx` to customize:
- Animation effects
- Particle counts
- Animation speeds

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Chandan Kumar**
- GitHub: [@cmschandan](https://github.com/cmschandan)
- LinkedIn: [Chandan Kumar](https://linkedin.com/in/cmschandan)
- Email: cmschandan10@gmail.com

---

Built with Next.js and deployed on Vercel
