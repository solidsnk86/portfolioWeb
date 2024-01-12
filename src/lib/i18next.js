import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				navLink1: 'Contact',
				navLink2: 'Projects',
				title: 'Portfolio of Calcagni Gabriel',
				description: 'Hey, come and take a look at my portfolio!',
				projectsTitle: 'My Projects...',
				aboutMe:
					'Hi, my name is Gabriel. I am a Front End developer with 1 year of experience, using technologies such as React and Next.js. I work on my projectNeotecsduring the evenings. Currently, I am studying and keep learning!',
				sectionLF: '"Frameworks, tools, and languages that I mostly use"',
				project1: 'Documentation for Web Programming',
				project2: 'Digital Scoreboard for Bocce',
				project3: 'Web Scraping App with Flask',
				project4: 'Demo Project for Online Invoicing',
				profileViews: 'Profile Visits:',
				aboutMeLast: 'durante las tardes. Actualmente, estoy estudiando y continúo aprendiendo.'
			}
		},
		es: {
			translation: {
				navLink1: 'Contacto',
				navLink2: 'Proyectos',
				title: 'Portfolio de Calcagni Gabriel',
				description: '¡Ey, pásate y echa un vistazo a mi portfolio!',
				projectsTitle: 'Mis Proyectos...',
				aboutMe:
					'Hola, mi nombre es Gabriel. Soy un desarrollador Front End con 1 año de experiencia, utilizando tecnologías como React y Next.js. Trabajo en mi proyecto NeoTecs durante las tardes. Actualmente, estoy estudiando y continúo aprendiendo.',
				sectionLF: '"Marcos, herramientas, y lenguajes que más utilizo"',
				project1: 'Documentación para Programación Web',
				project2: 'Tablero Digital para bochas',
				project3: 'Aplicación de web scraping con Flask',
				project4: 'Proyecto para emitir Facturas Demo',
				profileViews: 'Visitas del Perfil:',
				aboutMeLast: 'during the evenings. Currently, I am studying and keep learning!'
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
