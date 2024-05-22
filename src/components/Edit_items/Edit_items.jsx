import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
import "./Edit_items.css";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

const Edit_items = async (item) => {
  try {
    // Fetch the item's image from Supabase Storage
    const { data: imageData, error: imageError } = await supabase
      .storage
      .from('imagens') 
      .download(item.imagem); // Assuming item.imagem contains the image path

    if (imageError) {
      throw new Error("Error downloading image from Supabase: " + imageError.message);
    }

    const imageBlob = new Blob([imageData], { type: "image/*" });
    const imageUrl = URL.createObjectURL(imageBlob);

    return new Promise((resolve, reject) => {
      swal({
        title: "Editar Item",
        content: {
          element: "form",
          attributes: {
            className: "edit-form",
            id: "edit-form",
            innerHTML: `
              <div class="modal">
                <div class="modal-group">
                  <img id="image-preview" src="${imageUrl}" style="width: 250px; height: 250px; cursor: pointer;">
                  <h4 style="text-align: center;">Editar imagem</h4>
                  <input class="modal-input" type="file" id="imagem" placeholder="Imagem" accept="image/*" style="display: none;"><br>
                </div>
                <div class="modal-group">
                <p>Título</p>
                <input class="modal-input" type="text" id="titulo" value="${item.titulo}" placeholder="Título"><br>
              </div>
              <div class="modal-group">
                <p>Marca</p>
                <input class="modal-input" type="text" id="marca" value="${item.marca}" placeholder="Marca"><br>
              </div>
              <div class="modal-group">
                <p>Cores</p>
                <input class="modal-input" type="text" id="cores" value="${item.cores}" placeholder="Cores"><br>
              </div>
              <div class="modal-group">
                <p>Categorias</p>
                <select id="categoria" class="modal-input" placeholder="Categoria">
                  <option value="T-shirt" ${item.categoria === 'T-shirt' ? 'selected' : ''}>T-shirt</option>
                  <option value="Sweats" ${item.categoria === 'Sweats' ? 'selected' : ''}>Sweats</option>
                  <option value="Casacos" ${item.categoria === 'Casacos' ? 'selected' : ''}>Casacos</option>
                  <option value="Jeans" ${item.categoria === 'Jeans' ? 'selected' : ''}>Jeans</option>
                  <option value="Chapeus" ${item.categoria === 'Chapeus' ? 'selected' : ''}>Chapeus</option>
                  <option value="Vestidos" ${item.categoria === 'Vestidos' ? 'selected' : ''}>Vestidos</option>
                  <option value="Tops" ${item.categoria === 'Tops' ? 'selected' : ''}>Tops</option>
                  <option value="Saias" ${item.categoria === 'Saias' ? 'selected' : ''}>Saias</option>
                </select><br>
              </div>
              <div class="modal-group">
                <p>Gênero</p>
                <select id="genero" class="modal-input" placeholder="Gênero">
                  <option value="Homem" ${item.genero === 'Homem' ? 'selected' : ''}>Homem</option>
                  <option value="Mulher" ${item.genero === 'Mulher' ? 'selected' : ''}>Mulher</option>
                </select><br>
              </div>
              <div class="modal-group">
                <p>Tamanhos</p>
                <input class="modal-input" type="text" id="tamanho" value="${item.tamanho}" placeholder="Tamanho"><br>
              </div>
              <div class="modal-group">
                <p>Preço</p>
                <input class="modal-input" type="text" id="preco" value="${item.preco}" placeholder="Preço"><br>
              </div>
            </div>
          `
        },
      },
      buttons: {
        cancel: "Cancelar",
        confirm: {
          text: "Salvar",
          closeModal: false,
        },
      },
      }).then(async (value) => {
        if (value !== null && value !== "") {
           try {
          const imagem = document.getElementById('imagem').files[0];
          const titulo = document.getElementById('titulo').value;
          const marca = document.getElementById('marca').value;
          const cores = document.getElementById('cores').value;
          const categoria = document.getElementById('categoria').value;
          const genero = document.getElementById('genero').value;
          const tamanho = document.getElementById('tamanho').value;
          const preco = document.getElementById('preco').value;

          const updates = { imagem,titulo, marca, cores, categoria, genero, tamanho, preco };

          if (imagem) {
            // Upload image to Supabase Storage
            const filePath = `${Date.now()}_${imagem.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('imagens') // Replace with your actual bucket name
              .upload(filePath, imagem);

            if (uploadError) {
              throw new Error("Error uploading image to Supabase: " + uploadError.message);
            }

            // Get public URL of the uploaded image
            const { publicURL, error: urlError } = supabase
              .storage
              .from('imagens') // Replace with your actual bucket name
              .getPublicUrl(filePath);

            if (urlError) {
              throw new Error("Error getting public URL of the image: " + urlError.message);
            }

            updates.imagem = publicURL;
          }

          // Update the record in the database
          const { data: updateData, error: updateError } = await supabase
            .from("roupa")
            .update(updates)
            .eq("id", item.id);

          if (updateError) {
            throw new Error("Error updating item in Supabase: " + updateError.message);
          }

          swal("Sucesso", "Item editado com sucesso!", "success").then(() => {
            resolve(); // Resolve the promise after the edit is complete
          });
        } catch (error) {
          console.error("Erro ao editar item no Supabase:", error.message);
          swal("Erro", "Ocorreu um erro ao editar o item.", "error");
          reject(error); // Reject the promise if an error occurs
        }
        } else {
          swal("Aviso", "Operação cancelada", "info");
          resolve(); // Resolve the promise if the operation is canceled
        }
      });

      // Add click event listener to the image for selecting a new image
      document.getElementById('image-preview').addEventListener('click', () => {
        document.getElementById('imagem').click();
      });

      // Add event listener for image preview
      document.getElementById('imagem').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            document.getElementById('image-preview').src = e.target.result;
          }
          reader.readAsDataURL(file);
        }
      });
    });
  } catch (error) {
    console.error("Erro ao buscar imagem do item no Supabase:", error.message);
    swal("Erro", "Ocorreu um erro ao buscar a imagem do item.", "error");
    return Promise.reject(error); // Reject the promise if an error occurs
  }
};

export default Edit_items;
