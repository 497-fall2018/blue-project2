DJPrudo - Your Personal Music Creation App

To visit live site: https://dj-prudo.firebaseapp.com/

To download firebase:

```
yarn add firebase --dev
```
To use firebase cloud functions:
```
cd functions/
npm i firebase-functions
npm i firebase-admin
```

To use graphql with apollo-server and react-apollo:
```
npm i graphql-tag
npm i react-apollo
npm i apollo-boost

cd functions/
npm i cors
npm i express
npm i graphql
npm i graphql-tools
npm i apollo-server
npm i apollo-server-express


```


To use material-ui:
```
npm install @material-ui/core

npm i @material-ui/icons



```


To download Typeaway for React (https://github.com/ericgio/react-bootstrap-typeahead): 

```
yarn add react-bootstrap-typeahead
```

To download Bootstrap for React:

```
npm install bootstrap --save
npm install --save reactstrap react react-dom
```


To use react-redux:
```
yarn add redux react-redux

```


To download react-googlemap:

```
npm install --save google-maps-react
```

To download Spotify player:

```
npm install react-spotify-player
```

To add tooltips:

```
npm install react-tooltip
```

To add Twitter widget:
```
npm install --save react-twitter-widgets
```

To download Menu Bar:
```
npm install react-sidebar
```


When things are broken, please try:
```
rm ./yarn.lock
yarn
yarn start
```

To initialize firebase, do the following: 
1. Log in to firebase
2. ``` firebase init ```
3. ###DON'T OVERWRITE ANYTHING
4. When you see something like this 
```
? What do you want to use as your public directory? (public)
```
Type in "Build"

To deploy, do the following: 
1. Log in to Firebase
2. ``` yarn build ```
3. ``` yarn global add serve && serve -s global ```
4. firebase deploy
