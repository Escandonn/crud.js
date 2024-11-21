let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = -1;

document.getElementById('productForm').addEventListener('submit', addOrUpdateProduct);

function addOrUpdateProduct(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const image = document.getElementById('image').value.trim();
    const description = document.getElementById('description').value.trim();

    if (editIndex === -1) {
        const product = { id: Date.now(), title, image, description };
        products.push(product);
        alert("Producto agregado con éxito");
    } else {
        products[editIndex] = { ...products[editIndex], title, image, description };
        alert("Producto actualizado con éxito");
        editIndex = -1; // Resetear el índice de edición
        document.querySelector('button[type="submit"]').innerText = "Agregar Producto";
    }

   // Simulación del método POST
   localStorage.setItem('products', JSON.stringify(products));
    
   loadProducts();
}

function loadProducts() {
   const productList = document.getElementById('productList');
    
   productList.innerHTML = '';

   products.forEach((product, index) => {
       const productDiv = document.createElement('div');
       productDiv.className = 'product';
       productDiv.innerHTML = `
           <img src="${product.image}" alt="${product.title}">
           <h2>${product.title}</h2>
           <p>${product.description}</p>
           <button class="edit" onclick="editProduct(${index})">Editar</button>
           <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
       `;
       productList.appendChild(productDiv);
   });
}

// Simulación del método DELETE
function deleteProduct(index) {
   if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
       products.splice(index, 1);
       localStorage.setItem('products', JSON.stringify(products));
       loadProducts();
   }
}

// Simulación del método GET
function editProduct(index) {
   const productToEdit = products[index];
   document.getElementById('title').value = productToEdit.title;
   document.getElementById('image').value = productToEdit.image;
   document.getElementById('description').value = productToEdit.description;

   editIndex = index; // Guardar el índice del producto que se está editando
   document.querySelector('button[type="submit"]').innerText = "Actualizar Producto";
}

// Cargar productos al inicio
loadProducts();