# Recipes
Fullstack GraphQL App with Apollo, React and Mongo - v 0.6

### Setup
<pre>
cd server
touch variables.env
</pre>

Set mlab credential in <code>variables.env</code>
<pre>
NODE_ENV=production
PORT=4444
MONGO_URI=mongodb://<user>:<password>@<ad>.mlab.com:<port>/<db>
SECRET=1l2k3jrlk12fj908a0913uf
</pre>

Run <code>server</code>:
<pre>
yarn
yarn start
</pre>

Run <code>react</code>:
<pre>
cd ../react
yarn
yarn start
</pre>
