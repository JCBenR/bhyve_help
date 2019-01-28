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
        toolbar: toolbarOptions
    },

    theme: 'snow'
});

const getPosts = () => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(res => res.json())
    .then(posts => console.log(posts))
}



function test1ab (){
    var bugs = document.querySelectorAll('input[type=checkbox]:checked');
    var bugs2a = {};
    var quesB;
    var ansB;
    bugs.forEach((item) => {
        bugs2a[item.name] = item.value
    });
    quesB = document.getElementById('question1').value;
    ansB = quill.root.innerHTML;
    const post = {
        categories: bugs2a,
        title: quesB,
        body: ansB, 
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
        return fetch(`https://jsonplaceholder.typicode.com/posts`, options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.error(`Error: ${error}`))
    };
    
    newPost(post);
};
