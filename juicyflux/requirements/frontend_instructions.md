# Project Overview
    Use this guide to build a complete web app called JuicyFlux where users can give a text prompt to generate an image using the model hosted on Replicate (lucataco/flux-dev-lora). The app will have the following main features:

    1. A user-friendly interface with a form for entering text prompts
    2. Image generation using the Replicate API
    3. Display of generated images
    4. A grid view of all previously generated images
    5. Interactive elements for each image (hover effects, download, like)

    The tech stack for this project includes:
    - Next.js for the frontend framework
    - ShadCN UI for styled components
    - Lucid for icons
    - Supabase for backend database
    - Clerk for authentication

    Follow the instructions in this document and refer to the mockup.png for the UI design to build the complete JuicyFlux app.

# Implementation Steps
    1. Set up the project structure (already done as per the Current File Structure)
    2. Implement the main page layout (app/page.tsx)
    3. Create the ImageGenerator component (components/image-generator.tsx)
    4. Implement the API route for image generation (app/api/generate/route.ts)
    5. Create the ImageGrid component (components/image-grid.tsx)
    6. Create the ImageCard component (components/image-card.tsx)
    7. Set up Supabase for storing generated images and their metadata
    8. Implement Clerk authentication
    9. Add finishing touches and optimize performance

# Detailed Component Instructions
    1. ImageGenerator (components/image-generator.tsx):
       - Create a form with an input field for the prompt
       - Add a "Generate" button that calls the API route
       - Display a loading animation while generating
       - Show the generated image when ready
       - Add a "Clear" button to reset the form and image

    2. ImageGrid (components/image-grid.tsx):
       - Fetch all generated images from Supabase
       - Display images in a responsive grid layout
       - Implement infinite scrolling or pagination

    3. ImageCard (components/image-card.tsx):
       - Display individual image
       - Show prompt on hover
       - Add download icon and functionality
       - Implement like button and functionality

    4. Main Page (app/page.tsx):
       - Integrate ImageGenerator and ImageGrid components
       - Implement responsive layout as per mockup.png

    5. API Route (app/api/generate/route.ts):
       - Handle POST requests with prompt data
       - Call Replicate API to generate image
       - Store generated image and metadata in Supabase
       - Return generated image URL to client

# Styling and UI
    - Use ShadCN UI components for consistent styling
    - Implement smooth transitions and animations
    - Ensure responsive design for various screen sizes
    - Follow the color scheme and layout from mockup.png

# Authentication
    - Implement Clerk for user authentication
    - Restrict image generation to authenticated users
    - Associate generated images with user accounts

# Performance Optimization
    - Implement lazy loading for images in the grid
    - Use Next.js Image component for optimized image loading
    - Implement caching strategies for API responses

# Testing
    - Write unit tests for components using Jest and React Testing Library
    - Implement end-to-end tests using Cypress or Playwright

# Deployment
    - Deploy the application on Vercel or a similar platform
    - Set up environment variables for API keys and database connections

Follow these instructions to build a fully functional JuicyFlux app that meets all the requirements specified in the feature list.
# Feature requirements
    - We will use Next.Js, ShadCN UI, Lucid, Supabase, Clerk
    - Create a form where users can put in prompt, and clicking on button that calls the replicate model to generate an image.
    - Display the generated image to the user.
    - Have a button to clear the image, Have a nice UI & Animation when the emoji is blank or generating. 
    - Display all images ever generated in grid.
    - When hover each generated image, display the prompt that generated that image, an icon for download, and button for like and should be shown on top of the image.

# Relevant Docs
    - How to use Replicate model to generate an image: https://replicate.com/docs/how-does-replicate-work
    Set the REPLICATE_API_TOKEN environment variable

# export REPLICATE_API_TOKEN=<#####>

# Current File Structure
   juicyflux/
├── .next/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── image-generator.tsx
│   ├── image-grid.tsx
│   └── image-card.tsx
├── lib/
│   ├── utils.ts
│   └── replicate.ts
├── node_modules/
├── requirements/
│   ├── frontend_instructions.md
│   └── mockup.png
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json 

# Rules
    - All new components should go in /components and be named like example-component.tsx unless otherwise specified.
    - All new pages should go in /app unless otherwise specified.