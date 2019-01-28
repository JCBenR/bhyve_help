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


function test1ab (){
    var bugs = document.querySelectorAll('input[type=checkbox]:checked');
    var bugs2a = {};
    bugs.forEach((item) => {
        bugs2a[item.name] = item.value
    });
    var data = {
        method: 'POST',
        data: {"test": "hello world"},
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch('/help/new', data)

    return (JSON.stringify(bugs2a));
};
