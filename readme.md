Hi, Red Technologies Team!

First, this was a great project to work on. I didn't find the requests to be too difficult. That being said, I will admit I was held up with Material UI semantics. You will see immediately there final UI doesn't match the design perfectly. Being that it was my first time using this specific UI library, I would be confident replicating the design once I had a better grasp on Material UI.

Here are some general notes on what did accomplish, why I did that, and what I would have liked to finish if I had a bit more time.

- I tried to break up the Material UI components into reusable components as much as possible. IE, having a global Input or Table component instead of just reimporting the Material version over and over.
- For the API I used React Query to manage those calls. I wrote custom hooks which are in the api folder. I like there is built in caching and refetches. I would have like to make a global API client to use along side instead of calling the Fetch API multiple times.
- I did a simple modal for the add new order feature. I will admit its not the best UX and probably shold have been it's own page. If this was a production feature I would have adding custom routes for /add and used the form for bother creation and editing of the orders. I would have also like to write some custom validation and better feedback messages.
- I had time to write one small unit test for the Table component to show an example of my testing methods
- I added a very basic global theme using the Red brand colors
- I would have also refactored some of the types. I know there are instances where a better return type is needed but I ran into some issues with the UI library and "cheated" a bit to make the app error free.
