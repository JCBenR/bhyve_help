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


