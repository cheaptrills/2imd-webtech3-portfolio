class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩
    //createElement = creeëren van een nieuwe HTML element
    this.element = this.createElement(title);
    console.log(this.element);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    let paragraph = document.createElement('p');
    let a = document.createElement('a');
    let textInput = document.querySelector("#txtAddNote").value;
    let textLink = "Remove";
    paragraph.innerHTML = textInput + "\n";
    a.innerHTML = textLink;
    a.href = "#";
    document.querySelector(".notes").appendChild(newNote).appendChild(paragraph).appendChild(a);
    newNote.classList.add("card");
    a.classList.add("card-remove");
    // HINT🤩
    //a.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    // .value gets the value of the input field

  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element

  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    
    let note = new Note();
    console.log("KLIK");

    // HINT🤩
    note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();