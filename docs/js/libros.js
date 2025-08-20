const mes = new Date().getMonth() + 1; // Agosto=8, Diciembre=12

fetch("data/libros.json")
  .then(res => res.json())
  .then(data => {
    // Solo meses 8 a 12, fallback a agosto si no existe
    const version = data[mes] || data["8"];

    // Recorrer niveles: PRIMERO, SEGUNDO...
    Object.keys(version).forEach(nivel => {
      const libros = version[nivel];

      // Ahora recorremos libro1, libro2...
      Object.keys(libros).forEach(libroKey => {
        const libroData = libros[libroKey];

        // Buscar imagen por alt que contenga PRIMERO-libro1, SEGUNDO-libro2, etc.
        const selector = `img[alt*="${nivel}-${libroKey}"], img[src*="${nivel}-${libroKey}"]`;
        const img = document.querySelector(selector);

        if (img) {
          img.src = libroData.portada; // Portada
          const link = img.closest("a");
          if (link) link.href = libroData.link; // Link de Drive
        }
      });
    });
  })
  .catch(err => console.error("Error cargando libros.json:", err));
