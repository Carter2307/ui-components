import { createHTMLelement } from '@roger.b/functions'
import { CustomElementClass } from '@roger.b/types'

export class Breadcrumb extends HTMLElement implements CustomElementClass {
	constructor() {
		super()
	}

	connectedCallback() {
		const icon = this.innerHTML
		this.innerHTML = ''
		this.render(icon)
	}

	render(icon: string) {
		const pagePath: string = window.location.origin
		const urls: string[] = location.pathname.split('/').filter((el: string) => el !== '')
		const separatorIconUrl = 'svg/arrowRight.svg'

		const nav = createHTMLelement('nav', 'breadcrumb', ['breadcrumb'])
		const ul = createHTMLelement('ul', 'breadcrumb__list', ['breadcrumb__list'])
		//const separator = createHTMLelement("img", "", ["breadcrumb__separator"], [{ name: "href", value: separatorIconUrl }, {name:"height", value: "24px"}, {name: "width", value:"24px"}])
		const separator = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>`
		//Homme link
		const li = createHTMLelement('li', '', ['breadcrumb__list__element'])
		const a = createHTMLelement('a', '', ['breadcrumb__list__url'], [{ name: 'href', value: pagePath }])
		a.innerHTML = icon
		li.appendChild(a)
		ul.appendChild(li)

		//childrens link
		const links = () => {
			let u: string[] = []
			let l: string = ''
			urls.forEach((url, index) => {
				if (url === urls[0]) {
					l = url
					u.push(l)
				} else {
					l = `${u[index - 1]}/${url}`
					u.push(l)
				}
			})
			return u
		}

		urls.forEach((url: string, index) => {
			const li = createHTMLelement('li', '', ['breadcrumb__list__element'])
			let link: string = links()[index]
			console.log(link)
			const a = createHTMLelement('a', '', ['breadcrumb__list__url'], [{ name: 'href', value: link }])
			const separatorIcon = createHTMLelement('span', '', ['breadcrumb__separator'])

			separatorIcon.innerHTML = separator

			a.textContent = url
			li.appendChild(a)
			ul.appendChild(li)
			ul.insertBefore(separatorIcon, li)
		})

		nav.appendChild(ul)

		this.appendChild(nav)
	}
}
