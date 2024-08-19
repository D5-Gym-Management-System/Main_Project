import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 
import { Provider } from 'react-redux'; 
import { store } from './Pages/Redux/store'; 
import App from './app.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> {/* Wrap the app with Provider */}
    <App/>
  </Provider>
);
















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from '.app';


// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <>
  

//     <App />

 

//   </>



// );

