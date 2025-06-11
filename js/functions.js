"use strict";

let fetchFakerData =  (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {

            return {
                success: false,
                error: `Error en la petición: ${error.message}`
            };
        });
}
export { fetchFakerData }