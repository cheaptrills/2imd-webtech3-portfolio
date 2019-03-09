class Note{
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
    this.title = document.querySelector("#txtAddNote").value;
    let textLink = "Remove";
    paragraph.innerHTML = this.title + "\n";
    a.innerHTML = textLink;
    a.href = "#";
    document.querySelector(".notes").appendChild(newNote).appendChild(paragraph).appendChild(a);
    newNote.classList.add("card");
    a.classList.add("card-remove");
    // HINT🤩
    a.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    // .value gets the value of the input field
  }
  
  saveToStorage(){
    /*
      If there are no entries, we create a new array where we store all of our entries. If there already is an array, we just add our entries to the already existing array.
    */
    // JSON.stringify converts this.title to a String
    // localStorage only supports strings, not arrays
    let entryArray = localStorage.getItem('entry') ? JSON.parse(localStorage.getItem('entry')) : [];
    //setItem puts an key and value in localstorage
    localStorage.setItem('entry', JSON.stringify(entryArray));
    //push adds it to the already existing array
    entryArray.push(this.title);
    //we update the array
    localStorage.setItem('entry', JSON.stringify(entryArray));
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let removedElement = this;
    removedElement.style.display = "none";

    //also remove of local storage
  }
}

class App {
  constructor() {
    this.id = 0;
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice

    if (localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        let array = localStorage.getItem("entry");
        let entryArray = JSON.parse(array);
        entryArray.forEach(element => {
          console.log(element);
          let note = new Note();
          note.title = element;
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

    // HINT🤩
    note.add();
    note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();