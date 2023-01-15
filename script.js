const notePrototype = {
	create() {
		const createNoteContainer = document.createElement("div");
		const createNote = document.createElement("span");
		const createDeleteButton = document.createElement("span");
		createDeleteButton.innerHTML = "X";
		createNoteContainer.classList.add("note-container");
		createNote.classList.add("note");

		createDeleteButton.classList.add("delete-note-button");

		createNote.innerText = this.note;
		notesContainer.appendChild(createNoteContainer);
		createNoteContainer.appendChild(createNote);
		createNoteContainer.appendChild(createDeleteButton);
		objectsArray.push(this);
		createDeleteButton.addEventListener("click", (e) => {
			createNoteContainer.remove();
			console.log(this);
			objectsArray.splice(objectsArray.indexOf(this), 1);
		});
		createNote.addEventListener("click", () => {
			if (!this.editing) {
				this.editing = true;
				createNote.classList.toggle("hidden");
				createDeleteButton.classList.toggle("hidden");
				const createChangeNoteInput = document.createElement("textarea");
				createChangeNoteInput.value = this.note;
				createNoteContainer.appendChild(createChangeNoteInput);
				createChangeNoteInput.style.width = "100%";
				createChangeNoteInput.style.height = "35%";
				createChangeNoteInput.focus();
				createChangeNoteInput.select();
				createChangeNoteInput.addEventListener("keyup", (e) => {
					if (e.key === "Enter") {
						createChangeNoteInput.blur();
					}
					if (e.key === "Escape") {
						createChangeNoteInput.blur();
					}
				});
				createChangeNoteInput.addEventListener("focusout", (e) => {
					this.editing = false;
					const value = createChangeNoteInput.value.trim();
					if (value) {
						this.edit(value);
						createNote.innerText = this.note;
					}
					createChangeNoteInput.remove();
					createDeleteButton.classList.toggle("hidden");
					createNote.classList.toggle("hidden");
				});
			}
		});
	},
	delete() {
		objectsArray.splice(objectsArray.indexOf(this), 1);
	},
	edit(note) {
		this.note = note;
		this.editing = false;
	},
};

function Note(note) {
	this.note = note;
	this.editing = false;
}

Object.assign(Note.prototype, notePrototype);

const objectsArray = [];

const button = document.querySelector("button");
const input = document.querySelector("input");

const notesContainer = document.querySelector(".notes_container");

button.addEventListener("click", () => {
	const value = input.value;
	if (value) {
		const note = new Note(value);
		note.create();
		input.value = "";
	}
});

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		const value = input.value;
		if (value) {
			const note = new Note(value);
			note.create();
			input.value = "";
		}
	}
});
