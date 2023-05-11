const Category = require('../schemas/category.schema')

async function getCategories(req, res) {
    try {
        const categories = await Category.find()
        
        return res.status(200).send({
            msg: 'Categorias obtenidas',
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('No se pudieron cargar las cat')
    }



}

async function createCategory(req, res) {
    try {
        const category = new Category(req.body);

        const newCategory = await category.save()

        return res.status(201).send({
            msg: 'Categoria creada',
            newCategory
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('No se pudo crear la categoria')
    }
}

// async function loadSubCategory(req, res) {
//     const Subcategory.find({ categoryId: req.params.idParent })
// }


module.exports = {
    getCategories,
    createCategory
}