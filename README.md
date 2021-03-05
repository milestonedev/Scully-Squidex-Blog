# Scully-Squidex-Blog

##Description
This is an (extremely) simple starter for a blog that is an Angular site driven by [Squidex](https://squidex.io) as the headless CMS. It uses [Scully](https://scully.io) as the Static Site Generator.

##Getting Started
###Squidex Setup
1. Create an account with Squidex
2. Create your app w/ Squidex
3. Add a new Schema
   1. Call it 'posts'
   2. Use the 'import schema' option and paste the Json from '/squidex/post.schema.json'
4. Create at least 1 new post under the 'Content' blade
5. Go to Settings > Clients > default 
   1. Copy your App Name and Client Secret and place them in the .env.dev files. Your app name is the portion of the client id before the colon.

###Angular
1. Open the site in your preferred editor
2. Run ``` npm install```
3. Run ``` npm start```
   1. This will run ```dotenv``` (which will create your environment files based on the .env.dev file) then ```ng serve```
4. You should now be able to browse the site on http://localhost:4200

###Scully
1. Run ```npm build``` 
   1. This will run ```dotenv``` to create your ```environment.prod.ts``` file based on your .env.prod file then ```ng build --prod```.
2. Run ```npm run scully  --scanRoutes``` 
3. Run ```npm run scully:serve```
4. You should now be able to browse the STATIC version of the site at the url provided

##Hosting
I'm working on documenting the hosting setup I have where the static version of the site is in an azure blob.  The workflow is:
1. You make a change to a post in Squidex
2. Squidex calls to let Azure DevOps(ADO) know the change has occured
3. ADO runs a build including Scully, generating a static version of the new content.
4. ADO deploys the static content to the azure blob
