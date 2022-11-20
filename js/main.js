var nameInput= document.getElementById("nameInput");
var urlInput= document.getElementById("urlInput");
var inputs= document.getElementsByClassName("form-control")
var addBtn= document.getElementById("addBtn");
var searchInput =document.getElementById("searchInput");
var currentIndex=0;

var books=[];
if(JSON.parse(localStorage.getItem("booksList")) !=null){
    books= JSON.parse(localStorage.getItem("booksList"));
    displayData();
}

addBtn.onclick=function(){
    if(addBtn.innerHTML=="submit"){
        addBook();
    }else{
        updateData();
    }    
    displayData()
    clearForm()
}

function addBook(){
    var book={
        name:nameInput.value,
        url:urlInput.value,
    }
    books.push(book);
    localStorage.setItem("booksList",JSON.stringify(books));
}

function displayData(){
    var cartona='';
    for(i=0;i<books.length;i++){
        cartona+=`
        <div class="markers my-3 py-4">
        <table class="">
                <thead>
                    <th></th>
                    <th></th>
                    <th></th>
                    <tbody>
        <tr><td>${books[i].name}</td>
        <td><a href="${books[i].url}" class="btn btn-primary btns ms-5" target="_blank" >visit</a></td>
        <td><button onclick="getbookInfo(${i})" class="btn btn-warning btns ms-5">update</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger btns ms-5">delete</button></td>
        </tr>
        </tbody>
        </thead>
    </table>
</div>        `
    }
    document.getElementById("mark").innerHTML=cartona;
}

function deleteBook(index){
    books.splice(index,1);
    displayData();
    localStorage.setItem("booksList",JSON.stringify(books));
}

function clearForm(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
};

searchInput.onkeyup=function(){
    var cartona='';
    for(i=0;i<books.length;i++){
        if(books[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            cartona+=`
        <div class="markers my-3 py-4">
        <table class="">
                <thead>
                    <th></th>
                    <th></th>
                    <th></th>
                    <tbody>
        <tr><td>${books[i].name}</td>
        <td><a href="${books[i].url}"  class="btn btn-primary btns ms-5" target="_blank" >visit</a></td>
        <td><button onclick="getbookInfo(${i})" class="btn btn-warning btns ms-5">update</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger btns ms-5">delete</button></td>
        </tr>
        </tbody>
        </thead>
    </table>
</div>        `
        }
    }
    document.getElementById("mark").innerHTML=cartona;
}

function getbookInfo(index){
    currentIndex=index;
    var currentBook=books[index];
    nameInput.value = currentBook.name;
    urlInput.value = currentBook.url;
    addBtn.innerHTML = 'update';
}

function updateData(){
    var book =
    {
        name: nameInput.value,
        url: urlInput.value,
    }
    books[currentIndex]=book;
    localStorage.setItem('booksList', JSON.stringify(books))
    addBtn.innerHTML = 'submit';
}

var nameAlert=document.getElementById("nameAlert");
nameInput.onkeyup=function(){
    var nameRejex =/^[A-Za-z]{1,50}\s?([0-9]{1,3})?/;
    if(nameRejex.test(nameInput.value)){
        addBtn.removeAttribute("disabled");
        nameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    
    }
    else{
        addBtn.setAttribute("disabled","true");
        nameInput.classList.add("is-invalid");
        nameAlert.classList.remove("d-none");
    }
}



