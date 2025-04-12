# SaaS Pricing Calculator

A modern, interactive SaaS pricing calculator application that helps potential customers compare different pricing tiers and create custom pricing configurations.

## Features

- **Interactive Pricing Calculator**: Adjust users, storage, and API calls with real-time price updates
- **Feature Toggles**: Add or remove premium features like analytics, support, and SSO
- **Billing Cycle Options**: Choose between monthly and annual billing with appropriate discounts
- **Pricing Tier Comparison**: Compare features and benefits across different pricing tiers
- **User Authentication**: Secure user accounts with login and registration
- **Saved Configurations**: Save and manage custom pricing configurations for later reference

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based authentication
- **State Management**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mohammedmabdulaziz/SAaspricingcalculator.git
cd SAaspricingcalculator
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/saas_pricing
SESSION_SECRET=yoursessionsecret
```

4. Initialize the database
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Register for an account or log in with existing credentials
2. Use the pricing calculator to create custom pricing configurations
3. Save configurations for future reference
4. Compare different pricing tiers to make informed decisions

## Future Enhancements

- Export pricing configurations as PDF
- Integrate with payment gateways
- Add team collaboration features
- Implement multi-language support

## Contact

Mohammed Abdulaziz - linkedin.com/in/mohammedmabdulaziz

Project Link: [https://github.com/Mohammedmabdulaziz/SAaspricingcalculator](https://github.com/Mohammedmabdulaziz/SAaspricingcalculator)
