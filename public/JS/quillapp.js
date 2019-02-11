
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

var form = document.querySelector('form');
form.onsubmit = function() {
  var about = document.getElementById('answer');
  about.value = quill.root.innerHTML};