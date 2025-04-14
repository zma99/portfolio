document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-link]');
  const main = document.querySelector('main.container');
  
  // Esta función se llama para cargar dinámicamente el contenido
  const loadContent = (section) => {
    switch (section) {
      case 'home':
        main.innerHTML = `<h1>Home</h1><p>Bienvenido a la página de inicio.</p>`;
        break;
      case 'projects':
        main.innerHTML = `<h1>Proyectos</h1><p>Aquí irían los proyectos.</p>`;
        break;
      case 'about':
        main.innerHTML = `<h1>Sobre mí</h1><p>Información sobre mí.</p>`;
        break;
      case 'contact':
        main.innerHTML = `<h1>Contacto</h1><p>Formulario de contacto.</p>`;
        break;
      default:
        main.innerHTML = `<h1>Bienvenido</h1><p>Selecciona una sección.</p>`;
        break;
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
