document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-link]');
  const main = document.querySelector('main.container');

  // Función para aplicar la clase 'active' según la URL actual
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

  // Verificamos la URL actual y aplicamos la clase 'active' al link correspondiente
  setActiveLink(window.location.pathname);

  links.forEach(link => {
      link.addEventListener('click', async (e) => {
          e.preventDefault();
          const url = link.getAttribute('href');

          try {
              const res = await fetch(url);
              if (!res.ok) throw new Error(`Error al cargar ${url}`);
              const html = await res.text();

              const temp = document.createElement('div');
              temp.innerHTML = html;

              const nuevoContenido = temp.querySelector('main') || temp;
              main.innerHTML = nuevoContenido.innerHTML;

              history.pushState({}, '', url);
              setActiveLink(url);  // Aplica la clase 'active' al enlace actual
          } catch (error) {
              main.innerHTML = `<p>Error al cargar la sección.</p>`;
              console.error(error);
          }
      });
  });

  // Manejo de la navegación con el historial (popstate)
  window.addEventListener('popstate', async () => {
      const url = window.location.pathname;
      try {
          const res = await fetch(url);
          const html = await res.text();
          const temp = document.createElement('div');
          temp.innerHTML = html;
          const nuevoContenido = temp.querySelector('main') || temp;
          main.innerHTML = nuevoContenido.innerHTML;
          setActiveLink(url);  // Aplica la clase 'active' al enlace actual
      } catch (error) {
          main.innerHTML = `<p>Error al recuperar la navegación.</p>`;
      }
  });
});
