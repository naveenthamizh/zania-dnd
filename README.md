## To Run This Project, Follow These Steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the application**:

   ```bash
   npm run start
   ```

   The app will be available at `http://localhost:3000`.

## Functionalities

1. **Drag and Drop**

   - The application allows users to reorder the document cards using drag-and-drop functionalities.
   - The drag-and-drop functionality is implemented by attaching event listners. Each card has an associated `position` property that determines its order.
   - When a card is dragged and then dropped in a new position, the function recalculates the positions and updates the card order accordingly.
   - The layout is maintained such that the first row always contains 3 cards, and the second row contains 2, even after the cards have been rearranged.

2. **Last Refreshed Time**

   - The application keeps track of the last time data was saved or refreshed.
   - This is achieved using a custom hook that calculates the time elapsed since the last update (e.g., "5 sec ago", "2 min ago").
   - The last updated time is stored in `localStorage`, and the displayed message is dynamically updated to reflect the time elapsed since the last save. The time is recalculated every time data changes.

3. **Modal View on Card Click**

   - Clicking on a card opens a modal that displays a detailed varsion of image.
   - The modal appears in the center of the screen with a background overlay to focus attention on the content.
   - This modal can also display additional information about the selected document if needed, providing an enhanced user experience.

4. **Close Modal on 'Escape' Key Press**

   - The modal can be closed by pressing the 'Escape' key, offering an alternative way to exit without using a close button.
   - An event listener detects the 'Escape' key press and triggers the close modal functionality if the modal is open, making it easy for users to close the modal.

5. **Using MSW (Mock Service Worker) for Local Storage**
   - MSW is used to simulate backend API interactions, enabling the app to work with mock data during development.
   - MSW intercepts requests to update and retrieve data from local storage, mimicking a real API environment.
   - This setup provides a realistic testing environment without the need for a live server, allowing functionalities like updating the last refreshed time and persisting the card order to be tested effectively.

## Project Structure

```
project-root/
├── public/
│   ├── documents.json       # Static JSON file with document data
│   ├── images/              # Thumbnails for different document types
├── src/
│   ├── components/          # React components
|   ├── Hooks/               # Hooks
|   ├── Mocks/               # Test mocks
│   ├── App.tsx              # Main application file
│   ├── index.tsx            # Entry point for React application
├── README.md
└── package.json
```

## Dependencies

- **React**: For building the user interface.
- **MSW**: For mocking API requests.
