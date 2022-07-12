let cropper = null;

document.getElementById('input-file').addEventListener('change', () => {
    let image = document.getElementById('img-cropper')
    let input = document.getElementById('input-file')

    let archivos = input.files
    let extensiones = input.value.substring(input.value.lastIndexOf('.'), input.value.lenght)
    

    if(!archivos || !archivos.length){        
        image.src = "";
        input.value = "";
        
    } else if(input.getAttribute('accept').split(',').indexOf(extensiones) < 0){
         alert('Debes seleccionar una imagen')
         input.value = "";

    } else {
        let imagenUrl = URL.createObjectURL(archivos[0])
        image.src = imagenUrl

        cropper = new Cropper(image, {
            aspectRatio: 1, // es la proporción en la que queremos que recorte en este caso 1:1
            preview: '.img-sample', // contenedor donde se va a ir viendo en tiempo real la imagen cortada
            zoomable: false, //Para que no haga zoom 
            viewMode: 1, //Para que no estire la imagen al contenedor
            responsive: false, //Para que no reacomode con zoom la imagen al contenedor
            dragMode: 'none', //Para que al arrastrar no haga nada
            ready(){ // metodo cuando cropper ya este activo, le ponemos el alto y el ancho del contenedor de cropper al 100%
                document.querySelector('.cropper-container').style.width = '100%'
                document.querySelector('.cropper-container').style.height = '100%'
            }
        })

       
        document.getElementById('modal').classList.add('active')
        document.getElementById('modal-content').classList.add('active')
        document.getElementById('modal').classList.remove('remove')
        document.getElementById('modal-content').classList.remove('remove')
    }
})

document.getElementById('close').addEventListener('click', () => {
    let image = document.getElementById('img-cropper')
    let input = document.getElementById('input-file')

    image.src = "";
    input.value = "";

    cropper.destroy()

    document.getElementById('modal').classList.add('remove')
    document.getElementById('modal-content').classList.add('remove')
    document.getElementById('modal').classList.remove('active')
    document.getElementById('modal-content').classList.remove('active')
})

document.getElementById('cut').addEventListener('click', () => {
    let crop_image = document.getElementById('crop-image')
    let canva = cropper.getCroppedCanvas()
    let image = document.getElementById('img-cropper')
    let input = document.getElementById('input-file')

    canva.toBlob(function(blob){
        let url_cut = URL.createObjectURL(blob)
        crop_image.src = url_cut;

        let frag= new File([blob], 'image.png', { type: blob.type})

        let container = new DataTransfer();
        container.items.add(frag);
        input.files = container.files;
    })


    image.src = "";
    // input.value = "";

    cropper.destroy()

    document.getElementById('modal').classList.add('remove')
    document.getElementById('modal-content').classList.add('remove')
    document.getElementById('modal').classList.remove('active')
    document.getElementById('modal-content').classList.remove('active')
})
