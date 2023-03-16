import { createHTMLelement, $ } from '@roger.b/functions'
import { CustomElementClass } from '@roger.b/types'

export class Stepper extends HTMLElement implements CustomElementClass {
	classes: { [key: string]: string }

	constructor() {
		super()
		this.classes = {
			ul: '.stepper__list',
			li: '.stepper__list__item',
			liner: '.stepper__liner',
			fill: '.stepper__fill',
		}
	}

	connectedCallback() {
		this.innerHTML = ''
		this.render()
	}

	render() {
		this.className = 'stepper'
		const liner = createHTMLelement('div', 'stepper__liner', ['stepper__liner'])
		const linerFill = createHTMLelement('span', 'stepper__fill', ['stepper__fill'])
		const list = createHTMLelement('ul', 'stepper__list', ['stepper__list'], [{ name: 'role', value: 'list' }])

		liner.appendChild(linerFill)
		liner.appendChild(list)

		this.appendChild(liner)
	}

	updateStep(length: number) {
		this.clean()
		for (let i = 0; i < length; i++) {
			const listItem = createHTMLelement('li', '', ['stepper__list__item'])
			const listItemText = this.addListElement(i)
			listItem.appendChild(listItemText)
			document.querySelector(this.classes.ul)?.appendChild(listItem)
		}
	}

	addListElement(index: number): HTMLElement {
		const listItemText = createHTMLelement('span', '', ['stepper__list__item__text'])
		listItemText.innerHTML = index.toString()
		return listItemText
	}

	clean() {
		const ul = document.querySelector('.stepper__list')
		if (ul) {
			ul.innerHTML = ''
		}
	}

	next(index: number, length: number) {
		const lastElement = $(this.classes.ul).children[index - 1]
		const currentElement = $(this.classes.ul).children[index]
		const liner = $(this.classes.liner)
		const fill = $(this.classes.fill)

		//Liner width calculation
		const linerWidth = liner.getBoundingClientRect().width
		const ratio = linerWidth / length
		fill.style.width = `${ratio * index}px`

		//class for state
		currentElement.classList.add('stepper-actived')
		lastElement.classList.add('stepper-finished')

		//InnerHTML of li
		lastElement.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.35497 3.60499C9.30849 3.55813 9.25319 3.52093 9.19226 3.49555C9.13133 3.47016 9.06598 3.45709 8.99997 3.45709C8.93397 3.45709 8.86862 3.47016 8.80769 3.49555C8.74676 3.52093 8.69146 3.55813 8.64498 3.60499L4.91998 7.33499L3.35497 5.76499C3.30671 5.71837 3.24974 5.68172 3.18732 5.65711C3.12489 5.63251 3.05823 5.62045 2.99114 5.62161C2.92405 5.62277 2.85784 5.63713 2.7963 5.66388C2.73476 5.69062 2.67909 5.72923 2.63247 5.77749C2.58586 5.82575 2.5492 5.88272 2.5246 5.94515C2.49999 6.00758 2.48793 6.07424 2.48909 6.14133C2.49025 6.20842 2.50461 6.27463 2.53136 6.33616C2.55811 6.3977 2.59671 6.45337 2.64497 6.49999L4.56498 8.41999C4.61146 8.46686 4.66676 8.50405 4.72769 8.52944C4.78862 8.55482 4.85397 8.56789 4.91998 8.56789C4.98598 8.56789 5.05133 8.55482 5.11226 8.52944C5.17319 8.50405 5.22849 8.46686 5.27498 8.41999L9.35497 4.33999C9.40573 4.29317 9.44623 4.23634 9.47393 4.17309C9.50164 4.10984 9.51594 4.04154 9.51594 3.97249C9.51594 3.90344 9.50164 3.83514 9.47393 3.77189C9.44623 3.70864 9.40573 3.65181 9.35497 3.60499V3.60499Z" fill="white"/>
</svg>
`
	}

	prev(index: number, length: number) {
		const nextElement = $(this.classes.ul).children[index]

		const currentElement = $(this.classes.ul).children[index + 1]

		const liner = $(this.classes.liner)
		const fill = $(this.classes.fill)

		//Width of liner calculation
		const linerWidth = liner.getBoundingClientRect().width
		const ratio = linerWidth / length
		fill.style.width = `${ratio * index}px`

		//change the innertHTML
		const listItemtext = this.addListElement(index + 1)
		currentElement.innerHTML = ''
		currentElement.appendChild(listItemtext)

		//Class for state
		currentElement.classList.remove('stepper-actived')
		currentElement.classList.remove('stepper-finished')
		nextElement.classList.add('stepper-finished')
		nextElement.classList.add('stepper-active')
	}
}
