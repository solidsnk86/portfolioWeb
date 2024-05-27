import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Experience from '../components/Experience'
import { documentEnCv, documentEsCv } from '../components/const'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				navLink1: 'Contact',
				navLink2: 'Projects',
				navLink3: 'Go to github repo',
				language: 'Change language',
				title: 'Portfolio of Calcagni Gabriel',
				description: 'Hey, come and take a look at my portfolio!',
				projectsTitle: 'My Projects...',
				aboutMe: `Hi, my name is Gabriel. I am Front End developer with +${Experience()} year of experience, using technologies such as React and Next.js. I work on my project`,
				sectionLF: '"Library, frameworks, and languages that I mostly use"',
				project1: 'Documentation for Web Programming',
				project2: 'Digital Scoreboard for Bocce',
				project3: 'Web Scraping App with Flask',
				project4: 'Demo Project for Online Invoicing',
				profileViews: 'Profile Visits:',
				lastVisit: 'Last visit on:',
				city: 'City',
				country: 'Country',
				flag: 'Flag',
				lastVisitFrom: 'from',
				aboutMeLast:
					'during the evenings. Currently, I am studying at the National Technological University of San Rafael, Mendoza and keep learning!',
				blogTitle: 'Welcome to my blog!',
				latestPost: 'Latest post:',
				buttonPost: 'Post Something',
				whatCanI: '¿What can i post?',
				m1: 'Basically you can post whatever',
				m2: 'Whats going on?',
				name: 'Name',
				telephone: 'Telephone',
				email: 'Email',
				subject: 'Subject',
				comment: 'Message',
				titlePost: 'Post Title',
				githubUser: 'Github user ID',
				postDescription: 'Description about your post..',
				urlPost: 'Your site URL',
				last_footer:
					'All product names, logos, and brands are property of their respective creators.',
				backButton: 'Back to Home',
				documentCv: 'Check my Cv',
				cvLink: `${documentEnCv}`,
				cvTitle: 'See the document at Google Docs',
				footerLink: 'Go to github profile',
				update: 'Last portfolio update: ',
				contact: 'Contact',
				send: 'Send',
				sending: 'Sending...',
				toastAlert: 'Please, complete all fields.',
				toastError: 'Error submitting the form. Please try again later.'
			}
		},
		es: {
			translation: {
				navLink1: 'Contacto',
				navLink2: 'Proyectos',
				navLink3: 'Ir al repo de github',
				language: 'Cambiar idioma',
				title: 'Portfolio de Calcagni Gabriel',
				description: '¡Ey, pásate y echa un vistazo a mi portfolio!',
				projectsTitle: 'Mis Proyectos...',
				aboutMe: `Hola, mi nombre es Gabriel. Soy desarrollador Front End con +${Experience()} año de experiencia, utilizando tecnologías como React y Next.js. Trabajo en mi proyecto`,
				sectionLF: '"Librería, marcos, y lenguajes que más utilizo"',
				project1: 'Documentación para Programación Web',
				project2: 'Tablero Digital para bochas',
				project3: 'Aplicación de web scraping con Flask',
				project4: 'Proyecto para emitir Facturas Demo',
				profileViews: 'Visitas del Perfil:',
				lastVisit: 'Última visita el:',
				city: 'Ciudad',
				country: 'País',
				flag: 'Bandera',
				lastVisitFrom: 'desde',
				aboutMeLast:
					'durante las tardes. Actualmente, estoy estudiando en la Universidad Tecnológica Nacional de San Rafael, Mendoza y continúo aprendiendo.',
				blogTitle: 'Bienvenidos a mi blog!',
				latestPost: 'Último post:',
				buttonPost: 'Publica algo!',
				whatCanI: '¿Qué puedo publicar?',
				m1: 'Básicamente puedes publicar lo que sea',
				m2: 'Que esta sucediendo?',
				name: 'Nombre',
				telephone: 'Teléfono',
				email: 'Correo',
				subject: 'Asunto',
				comment: 'Mensaje',
				titlePost: 'Título de la publicación',
				githubUser: 'Usuario de Github',
				postDescription: 'Descripción acerca de tu publicación..',
				urlPost: 'La URL de tu sitio',
				last_footer:
					'Todos los nombres de productos, logos y marcas son propiedad de sus respectivos creadores.',
				backButton: 'Volver al Inicio',
				documentCv: 'Chequea mi CV',
				cvLink: `${documentEsCv}`,
				cvTitle: 'Ver el documento en Google Docs',
				footerLink: 'Ir al perfil de github',
				update: 'Última actualización del portfolio: ',
				contact: 'Contacto',
				send: 'Enviar',
				sending: 'Enviando...',
				toastAlert: 'Por favor, completa todos los campos.',
				toastError: 'Error al enviar el formulario. Por favor, intenta nuevamente más tarde.'
			}
		}
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false
	}
})

export default i18n
