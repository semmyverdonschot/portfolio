# Next.js Portfolio Website

This is my portfolio website built with Next.js, TypeScript and Tailwind CSS.
Live: https://semmyverdonschot.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

Here are the links incase you do not.

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/semmyverdonschot/portfolio.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Available Scripts

In the main directory you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console because the project uses ESlint.

### `npm run build`

Builds the app for production to the `.next` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the production server.<br />
You should run `npm run build` before this.

### `npx prettier . --check --write`

I like to use rettier this command helps organize and structure any changes to the code.

## Tech Stack

- [Next.js](https://nextjs.org/) React framework for production
- [React](https://reactjs.org/) A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) A CSS framework
- [GSAP](https://greensock.com/gsap/) JavaScript animation library
- [ESLint](https://eslint.org/) Linting utility for JavaScript and JSX
- [Prettier](https://prettier.io/) code formatter

## Folder Structure

Here is an overview of the project's folder structure:

```
/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── crimequest/
│   │   │   └── page.tsx
│   │   ├── cytric/
│   │   │   └── page.tsx
│   │   └── garage-hans/
│   │       └── page.tsx
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── metadata.ts
│   ├── middleware.ts
│   ├── page.tsx
│   └── template.tsx
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Footer.tsx
│   │   ├── Marquee.tsx
│   │   ├── Services.tsx
│   │   ├── Techstack.tsx
│   │   └── Work.tsx
│   └── ui/
│       ├── ClientWrapper.tsx
│       ├── HeroVideo.tsx
│       ├── InfiniteCarousel.tsx
│       ├── LiveClock.tsx
│       ├── NavBar.tsx
│       └── SplashScreen.tsx
├── hooks/
│   ├── Scrollanimate.tsx
│   ├── useDocumentTitle.ts
│   ├── useStaggerSlide.ts
│   └── useWindowDimensions.ts
├── public/
│   ├── Crimequest/
│   ├── Cytric/
│   ├── Garagehansverdonsot/
│   ├── img/
│   ├── Revivor/
│   ├── static/
│   ├── svg/
│   └── videos/
├── .eslintrc.js
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Deployment

The easiest way to deploy any Next.js app in my opinion is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details on deployments.
