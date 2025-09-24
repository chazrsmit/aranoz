
import NavBack from '../../../Components/NavBack.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, promotions, prod_cats, colors }) {

    // infos à envoyer au back
    const {data, setData, post, errors} = useForm({
        product : "",
        description : "",
        price: "",
        stock: "",
        isPinned: null,
        image_main: null,
        image_rear: null,
        image_left: null,
        image_right: null,
        color_id: "",
        productcategory_id: "",
        promotion_id: "",
        width: "",
        height: "",
        depth: "",
        weight: "",
        quality_checking: ""
    });

    // fonction qui passe par une route pour envoyer les infos dans le back (lorsqu'on clique sur submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        // mettre le post ici:
        post(route('store_product'), {
            forceFormData: true
        });
    };



    return (
        <>

        <Head title="Aranoz Dashboard - Create a new product" />

        <NavBack auth={auth} />

        <h2>Create a new product</h2>

        <form onSubmit={handleSubmit}>
            {/* Name */}
            <label htmlFor="product" className="form-label">Name</label>
            <input type="text" name="product" id="" value={data.product} onChange={(e) => setData('product', e.target.value,)}
            className={`form-control w-25 ${errors.product ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.product &&
                    <div className="invalid-feedback">{errors.product}</div>
                }

            {/* Description */}
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" id="" value={data.description} onChange={(e) => setData('description', e.target.value,)}
            className={`form-control w-25 ${errors.description ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.description &&
                    <div className="invalid-feedback">{errors.description}</div>
                }

            {/* Price */}
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" name="price" id="" value={data.price} onChange={(e) => setData('price', e.target.value,)}
            className={`form-control w-25 ${errors.price ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.price &&
                    <div className="invalid-feedback">{errors.price}</div>
                }

            {/* stock */}

            <label htmlFor="stock" className="form-label">Stock</label>
            <input type="number" name="stock" id="" value={data.stock} onChange={(e) => setData('stock', e.target.value,)}
            className={`form-control w-25 ${errors.stock ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.stock &&
                    <div className="invalid-feedback">{errors.stock}</div>
                }

            {/* isPinned */}
            <div className="mb-3">
                <fieldset>
                    {/* fieldset permet de regoruper plusieurs attributs d'un même gorupe au sein d'un form */}
                    <input
                        type="radio"
                        name="isPinned"
                        value={1}
                        onChange={() => setData('isPinned', 1)}
                        className="me-1"
                    /> Oui
                    <input
                        type="radio"
                        name="isPinned"
                        value={0}
                        onChange={() => setData('isPinned', 0)}
                        className="ms-3 me-1"
                    /> Non
                </fieldset>
                {errors.isPinned && <div className="text-danger small">{errors.isPinned}</div>}
            </div>

            {/* width */}
            <label htmlFor="width" className="form-label">Width</label>
            <input type="number" name="width" id="" value={data.width} onChange={(e) => setData('width', e.target.value,)}
            className={`form-control w-25 ${errors.width ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.width &&
                    <div className="invalid-feedback">{errors.width}</div>
                }

            {/* height */}

            <label htmlFor="height" className="form-label">Height</label>
            <input type="number" name="height" id="" value={data.height} onChange={(e) => setData('height', e.target.value,)}
            className={`form-control w-25 ${errors.height ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.height &&
                    <div className="invalid-feedback">{errors.height}</div>
                }

            {/* depth */}
            <label htmlFor="depth" className="form-label">depth</label>
            <input type="number" name="depth" id="" value={data.depth} onChange={(e) => setData('depth', e.target.value,)}
            className={`form-control w-25 ${errors.depth ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.depth &&
                    <div className="invalid-feedback">{errors.depth}</div>
                }

            {/* weight */}
            <label htmlFor="weight" className="form-label">weight</label>
            <input type="number" name="weight" id="" value={data.weight} onChange={(e) => setData('weight', e.target.value,)}
            className={`form-control w-25 ${errors.weight ? 'is-invalid' : ''}`} />
                {/* message d'erreur */}
                { errors.weight &&
                    <div className="invalid-feedback">{errors.weight}</div>
                }

            {/* color_id */}
            <select
            name="color_id"
            id=""
            className={`form-select ${errors.color_id ? 'is-invalid' : ''}`}
            // on utilise Number() pour être sûr d'envoyer un nombre et pas un string pour l'id
            onChange={(e)=> setData('color_id', Number(e.target.value))}
            value={data.color_id}
        >
            <option value="">Choose a color</option>
            {colors.map(c => (
                <option key={c.id} value={c.id}>
                    {c.color}
                </option>
            ))}
            </select>
            {errors.color_id && <div className="invalid-feedback">{errors.color_id}</div>}

            {/* promo_id */}
            <select
            name="promo_id"
            id=""
            className={`form-select ${errors.promo_id ? 'is-invalid' : ''}`}
            // on utilise Number() pour être sûr d'envoyer un nombre et pas un string pour l'id
            onChange={(e)=> setData('promo_id', Number(e.target.value))}
            value={data.promo_id}
        >
            <option value="">Select a promotion if applicable</option>
            {promotions.map(prom => (
                <option key={prom.id} value={prom.id}>
                    {prom.promo}
                </option>
            ))}
            </select>
            {errors.promo_id && <div className="invalid-feedback">{errors.promo_id}</div>}

            {/* Product category */}
            <select
            name="productcategory_id"
            id=""
            className={`form-select ${errors.productcategory_id ? 'is-invalid' : ''}`}
            // on utilise Number() pour être sûr d'envoyer un nombre et pas un string pour l'id
            onChange={(e)=> setData('productcategory_id', Number(e.target.value))}
            value={data.productcategory_id}
        >
            <option value="">Choose a product category</option>
            {prod_cats.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.category}
                </option>
            ))}
            </select>
            {errors.productcategory_id && <div className="invalid-feedback">{errors.productcategory_id}</div>}

            {/* images */}

            <button className="btn btn-outline-secondary" type="submit">Ajouter</button>
        </form>
        
        </>
    )
}