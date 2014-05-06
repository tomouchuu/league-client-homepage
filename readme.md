# League Homepage

## A page to replace the Homepage of the League Client.

![League Homepage](http://fairu.pagu.co/VLkU/Screen%20Shot%202014-05-05%20at%207.06.05.png)

So this replaces the lobby homepage of the league client with a webpage that shows you the latest hot links on r/leagueoflegends and recent news from newsoflegends aswell as summoner information from Ranked, Unranked & ARAMs.

More of a proof of concept/weekend project, so not intended to be used but if you want to set it up then be prepared for stupidity:

1. Clone this repo
2. Run `npm install && bower install`
3. Rename `example.config.js` in `src/js` to `config.js` and fill in the variables. You'll need to get an API key from Riot [here](http://developer.riotgames.com/).
4. After this run `gulp` twice in the root of the project.
5. Next `gulp watch` will watch your project for changes and build them on the fly.
6. `gulp build` will build your project into `dist/`
7. Now place it on a webserver somewhere & find a service to pre-render the site. I used http://prerender.io for this, which meant I had to go and change the paths to the stylesheets/scripts to point to the website rather then relative.
8. After confirming the site works with the link provided by prerender or another similar service it's time to add it to the client. To do this go to `[path to league]/RADS/projects/lol_air_client_config_[region]/releases/[latest release]/deploy` and backup the exisiting lol.properties.
9. In the original lol.properties modify `lobbyLandingURL=` to be where your site is.
10. Open up league and confirm it works.

The reason it uses pre-render is because the league client web browser is super bad and can't use Angular's $http requests, so you have to pre-render the site first and serve this version to league. Downside to this is that it won't be fully dynamic as intended since it's cached.

I'll probably come back and do a version in PHP which should remove these issues in the next few weeks.