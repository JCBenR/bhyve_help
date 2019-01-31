
var toolbarOptions = [
    [{'header': [1,2,3,4, false]}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']
];

var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions,
    },
    placeholder: 'compose an epic...',

    theme: 'snow'
});


function test1ab (){
    var bugs = document.querySelectorAll('input[type=checkbox]:checked:not(#check1)'); //this looks for all checkboxes that are checked, but because #check1 (the make live toggle), is also a checkbox, it was returning that as well to the array. this let me specifically tell it not to inclulde that input.
    var bugs2a = [];
    var quesB;
    var ansB;
    var isLive;

    bugs.forEach((item) => {
        bugs2a.push({cat: item.name, subcat: item.value}) //this was initially an array '[]', but i changed it to an object with '{}' instead and it worked giving the item they key names.
        // [item.name] = item.value
    });
    quesB = document.getElementById('question1').value;
    ansB = quill.root.innerHTML;
    isLive = document.getElementById('check1').checked;
    
    const post = {
        categories: bugs2a,
        title: quesB,
        body: ansB,
        live: isLive,
        userId: 3
    }
    
    const newPost = post => {
        const options = {
            method: "POST",
            body: JSON.stringify(post),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        return fetch(`/help/new`, options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.error(`Error: ${error}`))
    };
    
    newPost(post);
};

