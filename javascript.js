const dropZone = document.querySelector('.drop-zone');
const inputFile = document.querySelector('#file');

function onEnter() {
    dropZone.classList.add('active'); // adiciona o azul
}

function onLeave() {
    dropZone.classList.remove('active'); // tira o azul
}

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    onEnter();
});

dropZone.addEventListener('dragleave', onLeave);
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    onLeave();

    const arquivo = e.dataTransfer.files[0]; // pega só o 1º arquivo
    
    // 1. Seta no input pra enviar depois
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(arquivo);
    inputFile.files = dataTransfer.files;

    // 2. Mostra o preview
    const reader = new FileReader();
    reader.onload = (event) => {
        dropZone.innerHTML = `<img src="${event.target.result}">`;
    };
    reader.readAsDataURL(arquivo);

    console.log('Arquivo:', arquivo.name);
});


const reader = new FileReader();
reader.onload = (e) => {
    dropZone.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">`;
};
reader.readAsDataURL(e.dataTransfer.files[0]);
