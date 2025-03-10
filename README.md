# Job Board - Next.js Application

A modern job board application built with Next.js 15, designed to connect employers and job seekers through a clean and intuitive interface.

## Tech Stack

### Core

- **Frontend**: Next.js 15 with App Router + React 19
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Security**: ArcJet.js (for bot protection and rate limiting)
- **Background Tasks**: Inngest
- **Media Upload**: UploadThing
- **Email Client**: Resend

### UI & Styling

- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Theming**: Custom yellow theme + dark mode toggle
- **Typography**: Geist font

### Development Tools

- **Form Handling**: React Hook Form
- **Schema Validation**: Zod
- **Type Safety**: TypeScript

## Features

- 🔍 Advanced job search and filtering
- 👤 User authentication and profiles
- 💼 Job posting and management
- 📝 Application tracking
- 📱 Responsive design
- 🌓 Dark/Light mode toggle
- 🤖 Bot protection & rate limiting (Arcjet.js)
- ⚡ Background tasks:
  - Recent jobs email digests
  - Job post expiration handling
  - Payment duration management
- 🎨 Custom themed UI components
- 📊 Database migrations and type-safe queries

## Project Structure

```
job-board-next/
├── app/                    # Next.js app directory
│   ├── (main)/            # Protected routes
│   ├── api/               # API routes
│   └── login/             # Login Page
│   └── onboarding/        # Fill Details Page
│   └── payment/           # Handle Payments success
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── theme/            # Theme components
├── lib/                  # Utility functions
│   ├── prisma/          # Prisma client & schemas
│   ├── inggest/         # inggest workflows
│   ├── arcjet.ts        # arcjet client for protection
│   ├── auth.ts          # Auth.js (NextAuth)
│   ├── stripe.ts        # Stripe Payment
│   ├── resend.ts        # Email Client
│   └── zodSchemas.ts    # Zod schemas
├── styles/              # Global styles & theme
├── inngest/            # Background jobs
├── public/             # Static assets
```

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://..."
ARCJET_API_KEY="..."
INNGEST_EVENT_KEY="..."
# Add other necessary variables
```

## Development Setup

1. **Install dependencies**

```bash
npm install
```

2. **Setup Database**

```bash
npx prisma generate
npx prisma migrate dev
```

3. **Run development server**

```bash
npm run dev
```

4. **Start Inngest dev server**

```bash
npx inngest-cli dev
```

## Key Features Implementation

### Background Jobs

- Job expiration: Automatically handles job post expiration after payment duration
- Email digests: Sends recent job notifications to subscribers
- Cleanup tasks: Removes expired listings and handles data maintenance

### Security

- Arc.js integration for:
  - Rate limiting on job applications
  - Bot protection on forms
  - API route protection

### Database Operations

- Type-safe queries with Prisma
- Efficient job search and filtering
- Relationship handling between users, jobs, and applications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

Deploy using [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy!

## License

MIT License
