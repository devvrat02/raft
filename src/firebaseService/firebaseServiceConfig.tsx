const prodConfig = {
  apiKey: "AIzaSyB4hgL5vMYC1NUWkFaNRTp0pWcXyedkO6k",
  authDomain: "neo-app-706d1.firebaseapp.com",
  databaseURL: "https://neo-app-706d1-default-rtdb.firebaseio.com",
  projectId: "neo-app-706d1",
  storageBucket: "neo-app-706d1.appspot.com",
  messagingSenderId: "141248637016",
  appId: "1:141248637016:web:3ed4464e3e2e47519a022d",
  measurementId: "G-KL7NBBN6GQ"
};

const devConfig = {
  apiKey: "AIzaSyB4hgL5vMYC1NUWkFaNRTp0pWcXyedkO6k",
  authDomain: "neo-app-706d1.firebaseapp.com",
  databaseURL: "https://neo-app-706d1-default-rtdb.firebaseio.com",
  projectId: "neo-app-706d1",
  storageBucket: "neo-app-706d1.appspot.com",
  messagingSenderId: "141248637016",
  appId: "1:141248637016:web:3ed4464e3e2e47519a022d",
  measurementId: "G-KL7NBBN6GQ"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
