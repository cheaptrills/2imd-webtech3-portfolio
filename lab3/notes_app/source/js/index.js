class Note{
  constructor(title) {
    this.title = title;
    //createElement = creeëren van een nieuwe HTML element
    this.element = this.createElement(title);
    //console.log(this.element);
  }
  
  createElement(title){
    let newNote = document.createElement('div');

    // .value gets the value of the input field
    this.title = document.querySelector("#txtAddNote").value;

    //innerHTML = we change the existing html of the note with the newly added information
    newNote.innerHTML = `<p>${this.title}</p><br><a href="#" class="card-remove">Remove</a>`;

    // Add class to the note for layout
    newNote.classList.add("card");

    /*
      promise = after a while it makes an asynchronous calculation

      After creating a note, it will check for a class card-remove to put an eventlistener on.
      Without the promise, an error will occur as it can't find the respective class.
    */

    new Promise((resolve, reject) =>{
      setTimeout(() =>{
        let a = document.querySelector('.card-remove');
        a.addEventListener('click', this.remove.bind(newNote));
      });
    });
    
    i++;
    return newNote;
  }
  
  add(){
    // this function should append the note to the screen somehow

    // .appendChild() = we add a child div (the note) to the notes div
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(){
    /*
      If there are no entries, we create a new array where we store all of our entries. If there already is an array, we just add our entries to the already existing array.
    */
    // JSON.stringify converts this.title to a String
    // localStorage only supports strings, not arrays
    let notesArray = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
    //setItem puts an key and value in localstorage
    localStorage.setItem('notes', JSON.stringify(notesArray));
    //push adds it to the already existing array
    notesArray.push(this.title);
    //we update the array
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
  
  remove(){
    // the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let removedElement = this;
    removedElement.style.display = "none";
    //console.log("delete");
    //also remove of local storage
    //localStorage.removeItem("entry");
    let notesArray = JSON.parse(localStorage.getItem("notes"));
    const index = notesArray.indexOf(this);
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.txtAdd = document.querySelector('#txtAddNote');
    
    // add note by pressing enter
    this.txtAdd.addEventListener("keydown", event => {
      if(event.keyCode === 13){
        this.createNote();
      }
    });

    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice

    if (localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        let array = localStorage.getItem("notes");
        let entryArray = JSON.parse(array);
        entryArray.forEach(element => {
          console.log(element);
          //let note = new Note(note.element);
          //note.title = element;
        });
        }
      }
      else {
        console.log("Error: you don't have localStorage!");
      }
    }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let note = new Note();
    console.log("KLIK");

    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form 
    document.querySelector("#txtAddNote").value = "";
    document.querySelector("#txtAddNote").focus();
  }
  
}

let i = 0;
let app = new App();