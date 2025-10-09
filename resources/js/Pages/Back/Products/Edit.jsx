import NavBack from '../../../Components/NavBack.jsx';
import Footer from '../../../Components/Footer.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, product, prod_cats, colors, promotions }) {

    const { data, setData, post, errors } = useForm({
        product: product.product,
        description: product.description,
        price: product.price,
        stock: product.stock,
        isPinned: product.isPinned,
        image_main: null,
        image_rear: null,
        image_left: null,
        image_right: null,
        color_id: product.color_id,
        productcategory_id: product.productcategory_id,
        promotion_id: product.promotion_id,
        width: product.specifications?.width,
        height: product.specifications?.height,
        depth: product.specifications?.depth,
        weight: product.specifications?.weight,
        quality_checking: product.specifications?.quality_checking
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('update_product', product.id), {
            forceFormData: true,
            _method: 'PUT'
        });
    };

    const handleFileChange = (e, field) => setData(field, e.target.files[0]);

    return (
        <>
            <Head title="Aranoz Dashboard - Edit Product" />
            <NavBack auth={auth} />

            {/* Hero Section */}
            <section
                className="hero-section back py-5"
                style={{ backgroundColor: '#e8fcfc', minHeight: '40vh' }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="fw-bold display-5 text-dark">Products</h1>
                            <p className="lead text-dark">Edit and manage product details.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img
                                src="/storage/banner/product_8.png"
                                alt="Products Banner"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href={route('products_back')} className="btn btn-secondary">
                        &larr; Back to all products
                    </Link>
                </div>

                {/* Product Edit Form Card */}
                <div className="card shadow-sm border-0 p-4">
                    <h2 className="mb-4">Edit Product</h2>

                    {/* Current Images */}
                    <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
                        {product.image_main && <img src={`/storage/${product.image_main}`} alt="Main" className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'cover' }} />}
                        {product.image_rear && <img src={`/storage/${product.image_rear}`} alt="Rear" className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'cover' }} />}
                        {product.image_left && <img src={`/storage/${product.image_left}`} alt="Left" className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'cover' }} />}
                        {product.image_right && <img src={`/storage/${product.image_right}`} alt="Right" className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'cover' }} />}
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Product Name */}
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                value={data.product}
                                onChange={e => setData('product', e.target.value)}
                                className={`form-control ${errors.product ? 'is-invalid' : ''}`}
                            />
                            {errors.product && <div className="invalid-feedback">{errors.product}</div>}
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="4"
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        {/* Price & Stock */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Price (€)</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                />
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                />
                                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                            </div>
                        </div>

                        {/* Homepage feature */}
                        <div className="mb-3">
                            <label className="form-label me-3">Feature on homepage?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={1}
                                    checked={data.isPinned == 1}
                                    onChange={() => setData('isPinned', 1)}
                                />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={0}
                                    checked={data.isPinned == 0}
                                    onChange={() => setData('isPinned', 0)}
                                />
                                <label className="form-check-label">No</label>
                            </div>
                            {errors.isPinned && <div className="text-danger small">{errors.isPinned}</div>}
                        </div>

                        {/* Dimensions & Weight */}
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label className="form-label">Width</label>
                                <input type="number" value={data.width} onChange={e => setData('width', e.target.value)} className={`form-control ${errors.width ? 'is-invalid' : ''}`} />
                                {errors.width && <div className="invalid-feedback">{errors.width}</div>}
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Height</label>
                                <input type="number" value={data.height} onChange={e => setData('height', e.target.value)} className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
                                {errors.height && <div className="invalid-feedback">{errors.height}</div>}
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Depth</label>
                                <input type="number" value={data.depth} onChange={e => setData('depth', e.target.value)} className={`form-control ${errors.depth ? 'is-invalid' : ''}`} />
                                {errors.depth && <div className="invalid-feedback">{errors.depth}</div>}
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Weight</label>
                                <input type="number" value={data.weight} onChange={e => setData('weight', e.target.value)} className={`form-control ${errors.weight ? 'is-invalid' : ''}`} />
                                {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
                            </div>
                        </div>

                        {/* Color, Promotion, Category */}
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label className="form-label">Color</label>
                                <select className={`form-select ${errors.color_id ? 'is-invalid' : ''}`} value={data.color_id} onChange={e => setData('color_id', Number(e.target.value))}>
                                    <option value="">Select color</option>
                                    {colors.map(c => (
                                        <option key={c.id} value={c.id} style={{ backgroundColor: c.color, color: '#fff' }}>{c.color}</option>
                                    ))}
                                </select>
                                {errors.color_id && <div className="invalid-feedback">{errors.color_id}</div>}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Promotion</label>
                                <select className={`form-select ${errors.promo_id ? 'is-invalid' : ''}`} value={data.promo_id} onChange={e => setData('promo_id', Number(e.target.value))}>
                                    <option value="">Select promotion</option>
                                    {promotions.map(p => <option key={p.id} value={p.id}>{p.promo}</option>)}
                                </select>
                                {errors.promo_id && <div className="invalid-feedback">{errors.promo_id}</div>}
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Category</label>
                                <select className={`form-select ${errors.productcategory_id ? 'is-invalid' : ''}`} value={data.productcategory_id} onChange={e => setData('productcategory_id', Number(e.target.value))}>
                                    <option value="">Select category</option>
                                    {prod_cats.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                                </select>
                                {errors.productcategory_id && <div className="invalid-feedback">{errors.productcategory_id}</div>}
                            </div>
                        </div>

                        {/* Quality checking */}
                        <div className="mb-3">
                            <label className="form-label me-3">Quality checking required?</label>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" value={1} checked={data.quality_checking == 1} onChange={() => setData('quality_checking', 1)} />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" value={0} checked={data.quality_checking == 0} onChange={() => setData('quality_checking', 0)} />
                                <label className="form-check-label">No</label>
                            </div>
                            {errors.quality_checking && <div className="text-danger small">{errors.quality_checking}</div>}
                        </div>

                        {/* Images Upload */}
                        <div className="mb-3">
                            {['image_main','image_rear','image_left','image_right'].map((field) => (
                                <input key={field} type="file" className={`form-control mb-2 ${errors[field] ? 'is-invalid' : ''}`} onChange={e => handleFileChange(e, field)} />
                            ))}
                        </div>

                        <button type="submit" className="btn btn-outline-secondary">Update Product</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}
