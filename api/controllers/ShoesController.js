import { ShoesModel } from "../models/ShoesModel.js";

// ✅ Crear producto
export const AddProduct = async (req, res) => {
  try {
    const { image, brand, model, price, stock, color } = req.body;

    if (!image || !brand || !model || !price || !stock || !color) {
      return res.status(400).json({
        msg: "Faltan datos para crear un producto",
      });
    }

    const shoes = await ShoesModel.create({
      image,
      brand,
      model,
      price,
      stock,
      color,
    });

    return res.status(201).json({
      msg: "Producto registrado con éxito",
      shoes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hubo un error al crear el producto",
    });
  }
};

// ✅ Mostrar todos los productos
export const ShowProducts = async (req, res) => {
  try {
    const shoes = await ShoesModel.find();

    if (!shoes.length) {
      return res.status(404).json({
        msg: "No existen productos",
      });
    }

    return res.status(200).json({
      msg: "Productos obtenidos con éxito",
      shoes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hubo un error al buscar productos",
    });
  }
};

// ✅ Mostrar productos por ID (opcional)
export const ShowProduct = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id || !product_id.length) {
      return res.status(400).json({
        msg: "Debes proporcionar un ID de producto",
      });
    }

    const shoes = await ShoesModel.find({ _id: { $in: product_id } });

    if (!shoes.length) {
      return res.status(404).json({
        msg: "No se encontraron productos",
      });
    }

    return res.status(200).json({
      msg: "Producto(s) encontrado(s)",
      shoes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hubo un error al buscar el producto",
    });
  }
};

// ✅ Eliminar producto por ID
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ShoesModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        msg: "Producto no encontrado o ya eliminado",
      });
    }

    return res.status(200).json({
      msg: "Producto eliminado correctamente",
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hubo un error al eliminar el producto",
    });
  }
};
