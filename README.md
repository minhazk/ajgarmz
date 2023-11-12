# Ajgarmz - Online Clothing Store

## Table of Contents

-   [Project Description](#project-description)
-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Configuration](#configuration)
-   [Database Setup](#database-setup)
-   [Usage](#usage)
-   [APIs](#apis)

## Project Description

Ajgarmz is a full-stack eCommerce platform designed for online shopping enthusiasts. This platform allows users to explore, filter, and purchase a wide variety of clothing items from the comfort of their homes. Built with the latest web technologies, Ajgarmz offers a seamless shopping experience, powered by Next.js, tRPC, Prisma, and PostgreSQL, while ensuring secure and convenient transactions through the Stripe API. With user authentication handled by NextAuth and efficient client queries managed by React Query, Ajgarmz provides a user-friendly and feature-rich online clothing shopping destination.

In addition to shopping, the website also includes an admin section, where admin users can access detailed data of placed orders, manage and edit items in the store, create new items, and send newsletter emails to all newsletter subscribers. This admin section adds a layer of control and customization, making it easier for administrators to manage the online store efficiently.

## Technologies Used

-   Next.js
-   tRPC
-   Prisma
-   PostgreSQL
-   NextAuth
-   React Query
-   Nodemailer
-   Stripe API
-   Uploadthing API

## Features

-   Browse and filter a wide range of clothing items.
-   Secure user authentication with NextAuth.
-   Efficient client queries managed by React Query.
-   Seamless payment processing through the Stripe API.
-   Storage and retrieval of product images using the Uploadthing API.
-   Detailed statistics on placed orders in the admin section.
-   Item management, editing, and creation for administrators.
-   Newsletter email sending functionality to all subscribers.

## Getting Started

To run this project, follow these steps:

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   [Node.js](https://nodejs.org/) installed on your system.
-   **Stripe Account**: You'll need a Stripe account to obtain the Stripe API keys.
-   **Planetscale Account**: A Planetscale account is required to obtain the `DATABASE_URL` for your database.
-   **Uploadthing Account**: You'll need an Uploadthing account to get the Uploadthing keys.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/minhazk/ajgarmz.git
    cd ajgarmz

    ```

    2. Install the required Node.js modules:
    
    ```bash
     npm install
    ```

## Configuration

Create a `.env` file in the project root directory with the following environment variables:

```
DATABASE_URL=your_planetscale_database_url
NEXTAUTH_SECRET=any_universally_unique_id
NEXTAUTH_URL=http://localhost:3000/
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
CONTACT_EMAIL=your_nodemailer_email
MAILER_PASSWORD=your_nodemailer_gmail_password
NEXT_PUBLIC_DOMAIN_URL=http://localhost:3000
```

Please replace the placeholders (e.g., your_stripe_public_key) with your actual credentials and information.

## Database Setup

1. Create a new database on Planetscale. Make sure to follow the appropriate steps for creating a database on the Planetscale platform.

2. Once you have created the database, obtain the database URL. This URL will be used to connect your project to the database.

3. Open your `.env` file, which you previously created in the [Configuration](#configuration) section.

4. Update the `DATABASE_URL` environment variable in the `.env` file with the Planetscale database URL you obtained in step 2.

5. In your terminal, run the following commands to apply the database schema and generate the Prisma client:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

## Usage

1. Make sure you have completed the [Configuration](#configuration) steps to set up the necessary environment variables.

2. Start the development server with the following command:

    ```bash
    npm run dev
    ```

This will launch the project locally, and you can access it in your web browser at http://localhost:3000.

## APIs

### Stripe API

The Stripe API is utilized to handle secure payment processing. When users make a purchase on the website, their payments are securely processed through the Stripe API. Additionally, a Stripe webhook is configured to listen for and handle incoming payment events. This webhook is used to create a database order record for each customer's order, ensuring accurate and detailed order tracking.

### Uploadthing API

The Uploadthing API serves as an image bucket for storing product images. Product images are stored on the Uploadthing platform, and their corresponding links are saved in the database for reference. This allows for efficient management and retrieval of product images, enhancing the overall user experience.
