document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-link]');
  const main = document.querySelector('main.container');
  
  // Esta función carga el contenido del archivo HTML correspondiente
  const loadContent = async (section) => {
    try {
      const res = await fetch(`${section}.html`);
      if (!res.ok) throw new Error(`Error al cargar ${section}.html`);
      const html = await res.text();

      // Coloca el contenido del archivo HTML en el contenedor 'main'
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const nuevoContenido = temp.querySelector('main') || temp;
      main.innerHTML = nuevoContenido.innerHTML;
    } catch (error) {
      main.innerHTML = `<p>Error al cargar la sección.</p>`;
      console.error(error);
    }
  };

  // Función para aplicar la clase 'active' al enlace correspondiente
  const setActiveLink = (url) => {
    links.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === url) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Cargar contenido según la ruta inicial
  const path = window.location.pathname.split('/')[1] || 'home';
  loadContent(path);
  setActiveLink(`/${path}`);

  // Agregar el listener de click en cada enlace
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const section = url.substring(1); // Obtén el nombre de la sección

      // Actualiza el contenido de 'main' y la URL sin recargar la página
      loadContent(section);
      history.pushState({}, '', url);
      setActiveLink(url);  // Aplica la clase 'active' al enlace actual
    });
  });

  // Manejo de la navegación con el historial (popstate)
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.split('/')[1] || 'home';
    loadContent(path);
    setActiveLink(`/${path}`);
  });
});
