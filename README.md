<img src="https://drive.google.com/uc?id=1ryauiCoq5JZhhf1kbaulbmy2M07wRSlB" alt="Spellbound" width="300">

## Spellbound

Welcome to Spellbound, an exciting and fun packed spelling game that test your spelling agsinst mysterious magic forces.

## Project description

This is a spelling game project intended for students. Upon loading the game, 

<img src="https://drive.google.com/uc?id=1Is_iw_gua1ssOYNx6QDEORt3nLnyebp6" alt="Game UI" width="800">

1. The user is presented with a description of what the game entails and the rule
2. User will be presented with a UI with three wards button representing three spelling difficulty. 
3. User can click on any one of the buttons to choose their difficulty level.
4. A voice will play saying the word to be spell. (" Your word is [word].") A defintion of the word will also be displayed for user having difficulty in listening.
5. User will attempt to spell the word by typing in the text field.
6. User will press enter or "Check" button after spelling is completed.
7. The game will check the spelling is correct or not and give verbal prompts. A message will also be displayed below the text field to indicate the spelling is correct or not.
8. If the spelling is correct, user will be given score according to the difficuly of the word.
9. User can press the End Game button when ready to end the game.
10. A score card will be displayed. A list of incorrectly spelt words will also be displayed.



## Purpose of solution:
The problem statement we were given addressed the issue of the lack of engagement by students in non-stem subjects. Students feel like some subjects are heavily relied on textbooks and therefore don’t find learning enjoyable. So, we set out to create a fun, interactive game that allows students to test their spelling, expand their vocabulary, and essentially enhance their literacy skills.

## Project planning and delivery

###Our project timeline
- Coming up with an idea
- Establishing roles
- Setting out the functions of the app
- Creating a Kanban board using Trello to manage the tasks
- Creating wireframes with Figma to get a clear idea of how the app would look, at the same time giving life to the game.

<table>
  <tr>
    <td>
      <img src="https://drive.google.com/uc?id=1cBt7SoAbPIMrWk7F73WYR2b8jQXa0wNm" alt="Low Fi wireframe" width="400">
      <p style="text-align: center;">Low Fi wireframe</p>
    </td>
    <td>
      <img src="https://drive.google.com/uc?id=1vQGbpVKyizO1VjiNHKkJfj8lJtMqE2cV" alt="High Fi wireframe" width="400">
      <p style="text-align: center;">High Fi wireframe</p>
    </td>
  </tr>
</table>


- Having regular meetings throughout the day using Slack in addition to our scheduled stand-ups and sound checks to maintain constant communication.
- Using Github for version control and distributed development in a team

## Technologies

Technologies used
- HTML
- CSS
- JavaScript
- REST APIs

Our UI used HTML and CSS to render a sleek and stylish interface for the user. Responsive styling and animations on buttons and modals provide a smooth and natural user experiece our intended users. We had implemented consisent colour themes and our UI design to complete the project.

Our frontend used JavaScript connect the UI, the backend and an external ditionary API, and also executed the game logic. 

- Query Selectors and Event Listeners were use to interact with the UI. 
- REST APIs is used to fetch defintion of words from the external dictionary API (https://api.dictionaryapi.dev).
- REST APIs is also used to connect with our self-developed backend.
- We use a speech synthesis function to provide verbal prompts to users.

Our backend used JavaScript to respond to REST APIs queries made by the frontend. It will retrieve a pre-defined word list in a JSON file and keep track of the word list the user is playing to avoid giving out repeated words.

## How to Install and Run the Project

1. Your local machine should have node.js and npm installed. Here is a guide (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Clone the repo via Github
3. Install the dependencies for backend by running `npm install`
    - express.js
    - cors
    - nodemon
4. Run the server by `npm run start` or `node index.js`
5. Run `index.html` under `/Client/assets/` in *VS Code* via the *Live Server* plugin

## How to Use the Project

Play the game according to on screen instructions.

## Credits

This project is a collorbative work from four members in alphabatical order.

- [Anastasija](https://github.com/Nastasia777)
- [Danise](https://github.com/daniserosales)
- [Mahir](https://github.com/mahirjalil)
- [YF](https://github.com/yf-chau)
