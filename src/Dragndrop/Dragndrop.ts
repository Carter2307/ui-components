import { validFileSize, validFileType } from '@roger.b/functions'

export class Dragndrop {
	fileType: string
	dropZone: HTMLElement
	inputFile: HTMLInputElement
	fileNameElementUi: HTMLElement
	fileErrorElementUi: HTMLElement
	cssClassess: { error: string; success: string }
	fileErrorMessages: { error: string; success: string }
	file: File | null
	fileSizeLimit: number

	constructor(
		dropZone: HTMLElement,
		inputFile: HTMLInputElement,
		fileType: string,
		fileSizeLimit: number,
		fileNameElementUi: HTMLElement,
		fileErrorElementUi: HTMLElement,
		cssClassess: { error: string; success: string },
		fileErrorMessages: { error: string; success: string }
	) {
		this.dropZone = dropZone
		this.inputFile = inputFile
		this.fileNameElementUi = fileNameElementUi
		this.fileErrorElementUi = fileErrorElementUi
		this.cssClassess = cssClassess
		this.fileErrorMessages = fileErrorMessages
		this.fileType = fileType
		this.fileSizeLimit = fileSizeLimit
		this.file = null
		this.init()
	}

	init() {
		this.eventListener()
	}

	//Files Functions
	handleFile(e) {
		const files = e.currentTarget.files

		for (let i = 0; i < files.length; i++) {
			const element: File = files[i]
			console.log(element)

			if (validFileType(element, this.fileType) && validFileSize(element, this.fileSizeLimit)) {
				this.file = element
				if (this.dropZone.classList.contains(this.cssClassess.error)) this.dropZone.classList.remove(this.cssClassess.error)
				this.dropZone.classList.add(this.cssClassess.success)
				this.fileNameElementUi.textContent = this.file.name
				this.fileErrorElementUi.textContent = this.fileErrorMessages.success
			} else {
				if (this.dropZone.classList.contains(this.cssClassess.success)) this.dropZone.classList.remove(this.cssClassess.success)
				this.dropZone.classList.add(this.cssClassess.error)
				this.fileErrorElementUi.textContent = this.fileErrorMessages.error
			}
		}
	}

	//Drag and Drop Functions
	dragOver(e) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	dragEnter(e) {
		e.preventDefault()
		if (!e.target.classList.contains(this.cssClassess.success)) {
			e.target.classList.add(this.cssClassess.success)
		}
	}

	dragLeave(e) {
		e.preventDefault()
		if (e.target.classList.contains(this.cssClassess.success)) {
			e.target.classList.remove(this.cssClassess.success)
		}
	}

	onDrop(e) {
		e.preventDefault()

		const data = e.dataTransfer.items

		for (let f = 0; f < data.length; f++) {
			const elem = data[f]

			if (elem.kind === 'file') {
				let file = elem.getAsFile()
				if (validFileType(file, this.fileType) && validFileSize(file, this.fileSizeLimit)) {
					this.file = file
					this.fileNameElementUi.textContent = file.name
					this.fileErrorElementUi.textContent = this.fileErrorMessages.success
				} else {
					//le fichier est d'un autre type (non valide)
					this.fileErrorElementUi.textContent = this.fileErrorMessages.success
				}
			}
		}
	}

	eventListener() {
		//EVENT
		//Manipule les fichier par selection
		this.inputFile.addEventListener('change', this.handleFile.bind(this))

		//Manipule les fichier deposer en drag en drop
		this.dropZone.addEventListener('dragover', this.dragOver.bind(this))
		this.dropZone.addEventListener('dragenter', this.dragEnter.bind(this))
		this.dropZone.addEventListener('dragleave', this.dragLeave.bind(this))
		this.dropZone.addEventListener('drop', this.onDrop.bind(this))
	}
}
