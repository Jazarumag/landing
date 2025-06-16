"use strict";

import { fetchFakerData } from "./functions.js";
import { saveVote, getVotes } from './firebase.js';

function enableForm() {
  const form = document.getElementById('form_voting');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const selectProduct = document.getElementById('select_product');
    const productID = selectProduct.value;

    if (!productID) {
      alert('Por favor, selecciona un producto.');
      return;
    }

    try {
      const result = await saveVote(productID);
      console.log(result.message);
      form.reset();
      displayVotes(); // Actualizar tabla tras guardar voto
    } catch (error) {
      console.error('Error al guardar el voto:', error);
    }
  });
}

async function displayVotes() {
  const results = document.getElementById('results');

  try {
    const votes = await getVotes();

    if (!votes) {
      results.innerHTML = `<p class="text-gray-500 text-center mt-4">No hay votos aún.</p>`;
      return;
    }

    // Contar votos por producto
    const voteCounts = {};
    for (const key in votes) {
      const vote = votes[key];
      if (vote.productID) {
        voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
      }
    }

    // Crear tabla HTML
    let tableHTML = `
      <table class="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">Producto</th>
            <th class="border border-gray-300 px-4 py-2">Total de Votos</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const productID in voteCounts) {
      tableHTML += `
        <tr>
          <td class="border border-gray-300 px-4 py-2">${productID}</td>
          <td class="border border-gray-300 px-4 py-2">${voteCounts[productID]}</td>
        </tr>
      `;
    }

    tableHTML += `</tbody></table>`;

    results.innerHTML = tableHTML;

  } catch (error) {
    console.error("Error mostrando votos:", error);
    results.innerHTML = `<p class="text-red-500 text-center mt-4">Error al cargar votos.</p>`;
  }
}

(function () {
  enableForm();
  displayVotes(); // Mostrar votos al cargar la página
})();

const renderCards = (items) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;
    // Limpiar el contenedor
    container.innerHTML = "";

    // Iterar sobre los tres primeros elementos
    items.slice(0, 3).forEach(({ title, author, genre, content }) => {
        const card = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 class="text-xl font-bold mb-2">${title}</h2>
                <p class="text-gray-700 mb-1"><span class="font-semibold">Autor:</span> ${author}</p>
                <p class="text-gray-500 mb-2"><span class="font-semibold">Género:</span> ${genre}</p>
                <p class="text-gray-600">${content}</p>
            </div>
        `;
        container.innerHTML += card;
    });
};
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        setTimeout(()=>toast.classList.add("md:block"),2000);
    }
};
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};
const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';
    try {
        const result = await fetchFakerData(url);
        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }
    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);
    }
};

(() => {
    loadData();
    showToast();
    showVideo();
})();