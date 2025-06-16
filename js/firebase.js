import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración directa de Firebase (sin .env)
const firebaseConfig = {
  apiKey: "AIzaSyDa153CHx7nSfCqrtoU7Scwxan2MlxOSQ0",
  authDomain: "landing-4d169.firebaseapp.com",
  projectId: "landing-4d169",
  storageBucket: "landing-4d169.firebasestorage.app",
  messagingSenderId: "729627021270",
  appId: "1:729627021270:web:0ce6fb5c5d2b25dc6dde77"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la base de datos en tiempo real
const database = getDatabase(app);

export function saveVote(productID) {
  const votesRef = ref(database, 'votes');
  const newVoteRef = push(votesRef);
  const voteData = {
    productID,
    timestamp: new Date().toISOString()
  };
  return set(newVoteRef, voteData)
    .then(() => {
      return { message: "Voto guardado exitosamente." };
    })
    .catch((error) => {
      return { message: "Error al guardar el voto: " + error.message };
    });
}

export function getVotes() {
  const dbRef = ref(database);
  return get(child(dbRef, 'votes'))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val(); // Retorna todos los votos como objeto
      } else {
        return null; // No hay votos aún
      }
    })
    .catch(error => {
      console.error("Error al obtener votos:", error);
      throw error;
    });
}