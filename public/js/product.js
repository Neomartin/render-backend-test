let products = [];
const token = localStorage.getItem('token');
const selectCategoryHTML = document.getElementById('category')


const URL = 'http://localhost:9100/api';
const URL_public = 'http://localhost:9100';

(async function cargarCategorias() {
    try {
        const response = await axios.get(`${URL}/category`);
        console.log(response.data.categories);
        const categories = response.data.categories;
        selectCategoryHTML.innerHTML = '<option value="" selected></option>';
        categories.forEach((cat) => {
            selectCategoryHTML.innerHTML += `<option value="${cat._id}" selected>${cat.name}</option>`
        })

    } catch (error) {
        console.log(error)
    }
})()

async function cargarProductos() {
   try {
    const respuesta = await axios.get(`${URL}/products`)
    products = respuesta.data.products;
    renderizarTabla(products)
    
   } catch (error) {
    console.log(error);
   }

}

cargarProductos();

let favorites = [];

const productForm = document.getElementById('add-product');
const submitBtn = document.getElementById('submit-btn');
//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');

let editIndex;

//2- Definir una función para iterar el array
function renderizarTabla(arrayProductos) {
    tableBody.innerHTML = '';

    if(arrayProductos.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"><td colspan="6">NO SE ENCONTRARON PRODUCTOS</td> </tr>`;
        return
    }
    //3- Iterar el array para acceder a cada producto
    arrayProductos.forEach((producto, index) => {
        // let imageSrc = '/assets/images/no-product.png';
        // if(producto.image) {
        //     imageSrc = producto.image;
        // }

        let imageSrc = producto.image ? `${URL_public}/upload/product/${producto.image}` : '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="product">
                            <td class="product__img-cell">
                                <img    class="product__img" 
                                        src="${imageSrc}" 
                                        alt="${producto.name}">
                                </td>
                            <td class="product__name">${producto.name}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            <td class="product__info">
                                <span 
                                    class="product__info-icon
                                            ${ producto.stock   ?   ''    :    'disabled'    }
                                    "
                                >
                                    📦
                                </span>
                                <span class="product__info-icon  ${ producto.joystick ? '' : 'disabled' }">
                                    🎮
                                </span>
                            </td>
                            <td class="product__actions">
                                <button class="btn btn-sm btn-danger product__action-btn" onclick="deleteProduct('${producto._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="btn btn-sm btn-success product__action-btn" onclick="editProduct(${index})">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>

                                <button class="btn btn-sm btn-warning product__action-btn ${ favorites.includes(index) ? 'active': '' }" 
                                        onclick="setFavoriteProduct(${index})">
                                    <i class="fa-regular fa-star"></i>
                                </button>
                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;
    });
    
}

// ************ ADD/EDIT PRODUCT ************/
async function addProduct(evt) {

    try {
        evt.preventDefault();
        console.dir(evt.target);
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target);

        // TODO: remover Observar que tengo
        const obj = Object.fromEntries(formFile);
        console.log(obj);

        const { data } = await axios.post(`${URL}/product`, formFile, {
            headers: {
                Authorization: token
            }
        });
        cargarProductos();

    } catch (error) {
        console.log(error)
    }
   

}


async function deleteProduct(id) {
    swal({
        title: `Borrar producto`,
        text: `Esta seguro que desea borrar el producto ${products[indice].name}`,
        icon: 'warning',
        buttons: {
            cancel: `Cancelar`,
            delete: `Borrar`
        }
    }).then(async function(value) {
        if(value === `delete`) {
            // ? LLAMADA AL BACKEND axios.delete
            try {
                const respuesta = await axios.delete(`${URL}/products/${id}`)


                cargarProductos()
            } catch (error) {
                console.log(error)
            }
            swal({
                title: `Elemento borrado correctamente`,
                icon: 'error'
            })
            renderizarTabla();
        } 
    })
    

}


function editProduct(idx) {

    submitBtn.classList.add('edit-btn');
    submitBtn.innerText = 'Modificar Producto'

    let product = products[idx];

    // console.table(product);
    const el = productForm.elements;
    console.log(el)
    el.description.value = product.description;
    el.name.value = product.name;
    el.price.value = product.price;
    el.image.value = product.image;
    el.stock.checked = product.stock;
    el.joystick.checked = product.joystick;

  
    //** VAN A MANDAR ESTE OBJETO A EL BACKEND AL ENDPOINT DE HACER PUT, UNA VEZ RESUELTO EL LLAMADO, VUELVEN A A PEDIR LOS PRODUCTOS

}

function setFavoriteProduct(index) {
    const favCount = 0;
    const prodFiltradosFavoritos = products.forEach(prod => {
        if(prod.favorite) {
            favCount++;
        }
    })

    if(favCount >= 3) {
        favorites.shift();
    }
    favorites.push(index);
    localStorage.setItem('favorites', JSON.stringify(favorites))
    renderizarTabla();


    //Llamar a la función desde el botón favoritos
    
    // Checkear si en el array productos hay algun producto cuyo indice sea distinto al elegido con la propieda favorite: true tenemos que setearla en falso

    // Setear el producto elegido como favorite: true

}
