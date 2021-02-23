# Code challenge

Final steps are to do the take home challenge, then come back and pair on it.  Any questions, don't hesitate ask.  It's outlined below;

* Query a list of Star Wars films from https://swapi.dev/api.
* Print the titles in a table ordered by release_date.
* Place a “Vote” button next to each one with a vote counter.
* Once a user clicks on a “Vote” button, increment and show the number of votes for that film.
* Show the total number of votes for all the films at the bottom of the table.

Do the test in React. You may want to use create-react-app to bootstrap a new project, although it’s up to you.
Show us your best practices. Write the code you proud of. For bonus points, make a few unit tests. We recommend react-testing-library. If you are new to it, start here and here.

---
# Considerations

* Project can be viewed here: https://giant-psychedelic-bellflower.glitch.me/ (Might need a bit of time to wake up)
* Github repo: https://github.com/Yojimb0/ReactCodeChallenge
* Glitch URL: https://glitch.com/edit/#!/giant-psychedelic-bellflower
* I decided to use the Glitch platform for the ease of use, and to get the static hosting which I assumed would be easier for you to browse and review. I've used a create-react-app glitch template (I kept its original readme below). I kept the provided `server.js` as-is, as this was not the focus of the exercise.
* I originally started coding this app with a `Class-Components` approach. Discussing with a friend got me to realise that functional components is the ongoing trend. You can find this early implentation here: https://glitch.com/edit/#!/lava-trite-act - Moving to functional component was more confortable for me, and got me to learn more about hooks.
* I've experimented with `react-snap`, to improve LightHouse score with a pre-rendered static version. It's not perfect, as a re-hydration flash happens, but gets me to 100 performance score.
* I also wanted to get a feel of `styled-components` although I believe it's a bit overkill in that situation.
* I'm not very familiar with testing in a React world, but I decided to spend a bit more time, and fill some knowledge gaps. It's not very user-friendly to run it within Glitch, so I would recommend to clone the repo. I've added Nock to cleanly mock API calls.
* I've spend about 9h in total: 3h on the original app, 3h on optimisations (migration to functional, static rendering), 3h on tests.

All in all, I'm happy with the result, and am grateful for this exercise and for the opportunity to get out of my comfort zone.


---

# Original Glitch-CRA Readme

https://glitch.com/~starter-cra-and-express

## Starter create-react-app and Express

Glitch only serves content on one port. This is typically not an issue, unless you're trying to run both a webpack development server for front-end work and a back-end server in the same project, at the same time — you get one port for serving resources, but both the front-end and back-end servers each want their own port! This is a common scenario when you're building your front end with [create-react-app], and your back end with [Express].

This starter app will get you on your way with this scenario!

### Forwarding requests via a proxy

In **package.json**...

1. if you set your `start` script to `"npm run production"`, it will build the React app and Express will serve the static bundle over port 3000.

2. if you set your `start` script to `"npm run development"`, it will concurrently start the webpack dev server/watcher and the Express server. The latter will be listening on port 3001, but you don't need to change anything in your code because: proxies!

As it stands, the server listens for requests to `/api`; to get this working in `development` mode, we're using [`http-proxy-middleware`] in **src/setupProxy.js** to forward any incoming request to `/api/whatever/endpoint/you/have` over to the `target`, i.e., the Express server.

### Live-reloading and watch.json

There's a **watch.json** file that specifies a couple of conditions to keep Webpack and Glitch from interfering with each others' file watchers:

1. We only want to run `install` scripts when changes are made to the **package.json** and **.env** files. Installation can take a while, so we don't want to trigger it with any other changes.
2. We only want to `restart` the project when changes are made in the **/server** folder, or to the **watch.json** file. We're including **watch.json** in case we need to kick off a restart — a change to the `throttle` value will trigger this. We're also explicitly ignoring any files in the **/public** and **/src** directories from kicking off a restart — we only want the Webpack watcher to handle these files.
3. We're setting a `throttle` of 100, which means that the Glitch watcher will wait 100 milliseconds before restarting anything. If that seems too quick, you can increase it.

### Made with Glitch

Glitch is a collaborative programming environment that lives in your browser and deploys code as you type.

Use Glitch to build anything from a good ol’ static webpage to full-stack Node apps.


[create-react-app]: https://create-react-app.dev
[Express]: https://expressjs.com/
[`http-proxy-middleware`]: https://github.com/chimurai/http-proxy-middleware