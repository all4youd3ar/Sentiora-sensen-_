# How to Enable Authentication & Database

To make the Login, Sign Up, and Social features work for real, you need to set up a free Firebase project. Follow these steps:

## Step 1: Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"**.
3.  Name it `Sentiora-Web` (or anything you like).
4.  Disable Google Analytics (not needed for this) and click **"Create project"**.

## Step 2: Enable Authentication
1.  In your new project, click **"Build"** in the left sidebar, then select **"Authentication"**.
2.  Click **"Get started"**.
3.  Select **"Email/Password"** from the Sign-in method list.
4.  Toggle **"Enable"** to ON.
5.  Click **"Save"**.

## Step 3: Enable Firestore Database
1.  Click **"Build"** -> **"Firestore Database"**.
2.  Click **"Create database"**.
3.  Choose a location (e.g., `nam5 (us-central)` or one close to you).
4.  **Important**: Select **"Start in test mode"** for now (this allows easy reading/writing during development).
5.  Click **"Create"**.

## Step 4: Get Configuration Keys
1.  Click the **Gear icon** (Project settings) next to "Project Overview" in the top left.
2.  Scroll down to the **"Your apps"** section.
3.  Click the **Web icon** (`</>`).
4.  Register the app with a nickname (e.g., "Sentiora Web").
5.  You will see a code block with `const firebaseConfig = { ... }`.

## Step 5: Configure Your App
1.  In your project folder, look for a file named `.env.example`.
2.  Rename it to `.env` (or create a new file named `.env`).
3.  Copy the values from your Firebase config and paste them into the `.env` file like this:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...
```

**Note**: Do not include quotes `""` or spaces around the `=` sign.

## Step 6: Restart the App
1.  Stop the running server (Ctrl+C in the terminal).
2.  Run `npm run dev` again.

🎉 **Done!** You can now Sign Up, Log In, and create real posts!
