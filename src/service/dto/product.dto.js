export default class ProductDTO {
    constructor(product) {
        this.id = product.id || product._id || ""
        this.title = product.title || ""
        this.author = product.author || ""
        this.description = product.description || ""
        this.lang = product.lang || ""
        this.code = product.code || ""
        this.price = product.price || 0
        this.status = product.status || true
        this.stock = product.stock || 0
        this.categories = product.categories || []
        this.thumbnails = product.thumbnails || []
    }
}