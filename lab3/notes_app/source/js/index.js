class Note{
  constructor(title) {
    this.title = title;
    //createElement = creeëren van een nieuwe HTML element
    this.element = this.createElement(title);
    //console.log(this.element);
  }
  
  createElement(title){
    let newNote = document.createElement('div');

    this.title = title;

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
        let a = document.getElementsByTagName('a');
        a[i].addEventListener('click', this.remove.bind(newNote));
        a[i].addEventListener('click', this.removeFromStorage.bind(this.title));
        i++;
      }, 1000);
    });
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
    
    //setItem = puts an key and value in localstorage
    localStorage.setItem('notes', JSON.stringify(notesArray));
    //push adds it to the already existing array
    //notesArray.push(this.title);

    /*
      You can't use push and slice with each other.
      So I updated the push() to splice() so an item is still added to the localstorage array.
    */
    notesArray.splice(i+1, 0, this.title);
    
    //we update the array
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
  
  remove(){
    // the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let removedElement = this;

    //Fade out animation
    removedElement.style.transition = "opacity 1s";
    removedElement.style.opacity = 0;

    //console.log("delete");
  }

  removeFromStorage(){
    //also remove of local storage
    let notesArray = JSON.parse(localStorage.getItem("notes"));
    const index = notesArray.indexOf(this);
    
    /*
      splice = adds/remove items to/from array
      splice(index number, how many need to removed, ...)
    */

    notesArray.splice(index, 1);
    //After removing an item, we update the localstorage update.
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
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
    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    /*
      If there are values stored in localhost read them out in a foreach loop.
    */
    if(storedNotes.length > 0){
      storedNotes.forEach(notes => {
        let note = new Note(notes);
        note.add();
      });
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    // .value = gets the value of the input field
    let text = document.querySelector("#txtAddNote").value;
    let note = new Note(text);
    console.log("KLIK");

    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form 
    this.txtAdd.value = "";
    this.txtAdd.focus();
  }
  
}

let i = 0;
let app = new App();