# Pantry Management Application

This is a simple pantry management application built using React and Firebase Firestore. The application allows users to add, edit, and remove items from their pantry. It also includes sorting functionality to organize items by name or quantity.

## Features

- **Add Items**: Add new items to the pantry with an initial quantity.
- **Edit Items**: Edit the quantity of existing items in the pantry.
- **Remove Items**: Remove items from the pantry.
- **Sort Items**: Sort items by name or quantity.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Firebase Firestore**: NoSQL database to store pantry items.
- **Material-UI**: React components for faster and easier web development.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pantry-management.git
    ```
2. Navigate to the project directory:
    ```bash
    cd pantry-management
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up Firebase Firestore:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore in your Firebase project.
    - Create a `.env.local` file in the root of the project and add your Firebase configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
5. Run the application:
    ```bash
    npm run dev
    ```
6. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

### Adding Items

1. Click on the "Add New Item" button.
2. Enter the name of the item.
3. Click "Add" to add the item to the pantry.

### Editing Items

1. Click the "Edit" button next to the item you want to edit.
2. Enter the new quantity.
3. Click "Save" to update the item quantity.

### Removing Items

1. Click the "Remove" button next to the item you want to remove.
2. Confirm the removal if prompted.

### Sorting Items

1. Use the "Sort By" dropdown to select the sorting criterion.
2. Choose between sorting by "Name" or "Quantity".

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add new feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request on GitHub.

## Acknowledgements

- [Firebase](https://firebase.google.com/) for providing the backend services.
- [Material-UI](https://mui.com/) for the UI components.
- [React](https://reactjs.org/) for the front-end library.

## License

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
