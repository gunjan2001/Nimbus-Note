const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea'); //here querySelectorAll means selecting the all notes as a textarea aapde select kariye kem ke ene aapde local storage ma store karvanu hoy chhe etle 
    const notes = []; // jyare user badhi notes ma kaik lakhse ene aapde one by one as one element aapde array ma store karvanu chhe.||| suppose ek notes no data as a one element of array
    console.log(textAreaData);  
    textAreaData.forEach((note) => {
        return notes.push(note.value); //daresk notes na sentence ne as a one element notes ni andar push karie chhiye
    })

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes)); //local storage ma koi item add karvi hoy to setitem and access karvi hoy to getitem:
    // syntax: localStorage.setItem(key,value);
    // local storage key value pair ma data store kare etle aapde aahiya array ke object pass na karisakiye etle aapde e array ne string ma convert karvu pade using json and pachhi e store karse. 


}

const addNewNote = (text = '') =>{

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData =`
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class="" ${text ? "hidden" : ""}></textarea> `;

    note.insertAdjacentHTML('afterbegin',htmlData);
    console.log(note);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting note
    delButton.addEventListener('click', () =>{
        note.remove();
        updateLSData(); //isko wapis is liye call kiya kyuki jab ham notes delete karte he tab refresh karne par wo wapis aa jata he so hamne yaha update local store wala function call kiya .
    });

    // edit button
    textArea.value = text;
    maindiv.innerHTML = text;


    editButton.addEventListener('click', () =>{
        maindiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    // ham jab edit button par wapis click kare tab hame wo note wale block me dikhna chahiye
        textArea.addEventListener('change', (event) => {
            const value = event.target.value; //here we use the change because when that div is changed then it will store that value other wise if we use input event then it will print every character in console when we run below

        // console.log(value);
            maindiv.innerHTML = value;

            updateLSData(); //for storing the data at local storage
    });

    document.body.appendChild(note);

}

// aa jo have aapdo data local storage ma store thai gayo have jyare user farithi aave to ene eni notes data sathe madvi joie e mate aapde niche no code lakhiye chhiye
// gettin json data 

const notes = JSON.parse(localStorage.getItem('notes'));  //ye local ke data ko wapis array ke form me leta he kyuki hame local me shayad ddata ho user ka to hame use display karana hoga iss liye

if (notes){ //note ma data present chhe to 
notes.forEach((note) => addNewNote(note) );  ///yaha hamne kiya heki jab hamare local me data hoga to wo use waha se lekar webpage me display karvayega
}
addButton.addEventListener('click', () => addNewNote() );
