"use strict";

import { fetchFakerData } from "./functions";
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