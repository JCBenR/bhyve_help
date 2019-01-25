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
    var bugs2a = [];
    bugs.forEach((item) => {
        var val = item.name + ": " + item.value ;
        bugs2a.push(val);
    });
    console.log(JSON.stringify(bugs2a));
};
