# CareerCraft - Professional Career Development Platform

A comprehensive career development platform built with Next.js 14, Supabase, and Tailwind CSS. Build your complete professional brand with ATS-optimized CVs, cover letters, career documents, and advanced career tools designed to accelerate your professional growth.

## ✨ Features

### Core Career Features
- **Professional Document Builder**: Create CVs, resumes, cover letters, and career portfolios with guided workflows
- **Industry-Specific Templates**: Templates crafted for Tech, Finance, Healthcare, Creative, and Executive roles
- **ATS Optimization**: Ensure your documents pass Applicant Tracking Systems
- **Multi-Format Export**: PDF, DOCX, and web formats for different application needs  
- **Smart Auto-save**: Cloud sync ensures your work is never lost

### Career Management
- **Professional Authentication**: Secure access with enterprise-grade security
- **Executive Career Dashboard**: Manage your complete professional document portfolio
- **Professional Profile Sharing**: Share your career profiles with custom URLs and analytics

### Customization
- **Template Switching**: Choose and switch between different templates
- **Color Customization**: Personalize with custom colors
- **Font Options**: Select from various professional fonts
- **Section Reordering**: Drag and drop to reorder CV sections

### Advanced Career Tools
- **Career Analytics**: Track document performance, views, and professional engagement
- **Professional Branding**: Complete responsive design across all devices and platforms
- **LinkedIn Integration**: Optimize for professional networks and search engines
- **Team Features**: Enterprise tools for HR teams and career coaches

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth with Row Level Security
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: @react-pdf/renderer
- **Rich Text Editor**: TipTap
- **Drag & Drop**: @hello-pangea/dnd

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/careercraft.git
   cd careercraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Set up the database**
   
   Run the SQL schema in your Supabase SQL editor:
   ```bash
   # Copy the contents of lib/supabase/schema.sql and run in Supabase
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: Extended user profiles
- **cvs**: CV data with JSONB fields for flexible schema
- **templates**: CV template definitions
- **analytics**: View and download tracking

See `lib/supabase/schema.sql` for the complete schema.

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the schema from `lib/supabase/schema.sql`
3. Enable Google OAuth in Authentication > Providers (optional)
4. Configure RLS policies (included in schema)

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add your domain to authorized origins
4. Add the credentials to your environment variables

## 📱 Usage

### Creating a CV

1. Sign up or log in to your account
2. Click "New CV" from the dashboard
3. Follow the step-by-step wizard:
   - Personal Information
   - Work Experience
   - Education
   - Skills
   - Projects
   - Certifications
   - Template Selection
   - Customization

### Sharing and Exporting

- **Private**: Keep CVs private for your own use
- **Public**: Make CVs public with shareable URLs
- **PDF Export**: Download high-quality PDF versions
- **Analytics**: Track views and downloads for public CVs

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository**
   ```bash
   npx vercel --prod
   ```

2. **Set environment variables**
   
   Add the same environment variables from your `.env.local` file to Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_CLIENT_ID` (optional)
   - `GOOGLE_CLIENT_SECRET` (optional)

3. **Update Supabase settings**
   
   Add your Vercel domain to Supabase:
   - Go to Authentication > URL Configuration
   - Add your Vercel URL to "Site URL"
   - Add your Vercel URL to "Redirect URLs"

### Other Deployment Options

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **AWS Amplify**: Connect your Git repository
- **Railway**: Deploy with automatic builds
- **DigitalOcean App Platform**: Deploy from GitHub

## 🎨 Customization

### Adding New Templates

1. Create a new template component in `components/cv-templates/`
2. Add the template to the database via Supabase
3. Update the template rendering logic in `app/cv/[slug]/page.tsx`

### Styling Customization

- Colors: Modify the color scheme in `tailwind.config.js`
- Fonts: Add new fonts and update the font options
- Templates: Create new template designs with Tailwind CSS

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](README.md)
2. Search existing [issues](https://github.com/yourusername/cv-maker/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for seamless deployment

---

Built with ❤️ using Next.js and Supabase