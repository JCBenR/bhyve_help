
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
    var tugs = document.querySelectorAll('a[class="ui label transition visible"]'); //this looks for all checkboxes that are checked, but because #check1 (the make live toggle), is also a checkbox, it was returning that as well to the array. this let me specifically tell it not to inclulde that input.
    var tugs2a = [];
    var quesB;
    var ansB;
    var isLive;

    tugs.forEach((item) => {
        tugs2a.push({cat: item.innerText})
    });
    quesB = document.getElementById('question1').value;
    ansB = quill.root.innerHTML;
    isLive = document.getElementById('check1').checked;
    
    const post = {
        categories: tugs2a,
        title: quesB,
        body: ansB,
        live: isLive,
        userId: 3
    }
    
    const newPost = post1 => {
        const options = {
            method: "POST",
            body: JSON.stringify(post1),
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

function test2ab (){
    var tugs = document.querySelectorAll('a[class="ui label transition visible"]'); //this looks for all checkboxes that are checked, but because #check1 (the make live toggle), is also a checkbox, it was returning that as well to the array. this let me specifically tell it not to inclulde that input.
    var tugs2a = [];

    tugs.forEach((item) => {
        tugs2a.push({cat: item.innerText})
    });
    let quesB = document.getElementById('question1').value;
    let ansB = quill.root.innerHTML;
    let isLive = document.getElementById('check1').value;
    
    const post = {
        products: tugs2a,
        question: quesB,
        answer: ansB,
        display: isLive,
        userId: 3
    }
    console.log('post:', post);

    return fetch('/help/:id', {
            method: "PUT",
            body: JSON.stringify(post),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => console.log('res from fetch quillapp.js:', res))
        .catch(err => console.log('Error yo:', err))

    
    //   const newPost = post => {
    //     const options = {
    //         method: "PUT",
    //         body: JSON.stringify(post),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     }
    //     return fetch('/help/:id', options)
    //         .then(res => res.json())
    //         .then(res => console.log(res))
    //         .catch(error => console.error(`Error: ${error}`))
    // };
    // newPost(post);
};