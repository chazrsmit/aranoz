import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, product }) {

    return(

        <>

            <Head title="Aranoz Dashboard - product details" />
    
            <NavBack auth={auth} />
    
            <Link href={route('products_back')}>back to all products</Link>

            {/* Carousel images */}
            <img src={`/storage/${product.image_main}`} alt="" width="300px" />
            <img src={`/storage/${product.image_rear}`} alt="" width="300px" />
            <img src={`/storage/${product.image_left}`} alt="" width="300px" />
            <img src={`/storage/${product.image_right}`} alt="" width="300px" />
            <p>Product name: {product.product}</p>
            <p>Product description: {product.description}</p>
            <p>Product price: {product.price} euros</p>
            <p>Promotion applied? {product.promotion?.promo ? `${product.promotion.promo}` : 'No promo applied' }</p>
            <p>Stock: {product.stock}</p>
            <p>Featured on the homepage? {product.isPinned == 1 ? 'Yes' : 'No'}</p>
            <p>Color: {product.color?.color}</p>
            <p>Category: {product.product_category?.category}</p>
            <p>Width: {product.specifications.width ? `${product.specifications.width}` : 'N/A'}</p>
            <p>Height: {product.specifications.height ? `${product.specifications.height}` : 'N/A'}</p>
            <p>Depth: {product.specifications.depth ? `${product.specifications.depth}` : 'N/A'}</p>
            <p>Weight: {product.specifications.weigth ? `${product.specifications.weigth}` : 'N/A'}</p>
            <p>In need of a quality check? {product.specifications?.quality_checking == 1? `Yes` : 'No'}</p>
        
        </>

    )
}