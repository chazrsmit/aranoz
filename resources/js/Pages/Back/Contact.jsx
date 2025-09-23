
import { useEffect, useState } from 'react';
import NavBack from '../../Components/NavBack.jsx';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Contact({ auth, contact }) {

    const { data, setData, put, errors } = useForm({

        street: contact.street,
        city: contact.city,
        country: contact.country,
        zip: contact.zip,
        email: contact.email,
        phone: contact.phone

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('update_contact', contact.id));
    }

    return(
        <>

            <Head title="Aranoz Dashboard - Contact" />
    
            <NavBack auth={auth} />

            {/* Google iFrame dynamique */}

            <h2>Update your contact data</h2>

            <div className="d-flex justify-content-around">

                <form onSubmit={handleSubmit}>

                    {/* Street */}
                    <input type="text" name="street" value={data.street} onChange={(e) => setData('street', e.target.value)} id=""
                    className={`form-control ${errors.street ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.street &&
                            <div className="invalid-feedback">{errors.street}</div>
                        }
                    
                    {/* City */}
                    <input type="text" name="city" value={data.city} onChange={(e) => setData('city', e.target.value)} id=""
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.city &&
                            <div className="invalid-feedback">{errors.city}</div>
                        }

                    {/* Zip */}
                    <input type="text" name="zip" value={data.zip} onChange={(e) => setData('zip', e.target.value)} id=""
                    className={`form-control ${errors.zip ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.zip &&
                            <div className="invalid-feedback">{errors.zip}</div>
                        }

                    {/* Country */}
                    <input type="text" name="country" value={data.country} onChange={(e) => setData('country', e.target.value)} id=""
                    className={`form-control  ${errors.country ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.country &&
                            <div className="invalid-feedback">{errors.country}</div>
                        }

                    {/* Email */}
                    <input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} id=""
                    className={`form-control  ${errors.email ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.email &&
                            <div className="invalid-feedback">{errors.email}</div>
                        }

                    {/* Phone */}
                    <input type="tel" name="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} id=""
                    className={`form-control  ${errors.phone ? 'is-invalid' : ''}`} />
                        {/* message d'erreur */}
                        { errors.phone &&
                            <div className="invalid-feedback">{errors.phone}</div>
                        }
                    <button type="submit" className="btn btn-secondary">Update contact</button>
                </form>

                {/* Infos affichées */}
                <div>
                    {/* adresse */}
                    <div>
                        <div>
                            {contact.street}
                        </div>
                        <div>
                            {contact.city} {contact.zip}
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="mt-3">
                        <div>
                            {contact.phone}
                        </div>
                        <div>
                            <p>Monday to Friday 9am to 6pm</p>
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <div>
                            {contact.email}
                        </div>
                        <div>
                            <p>Send us your query!</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}