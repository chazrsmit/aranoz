import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import NavFront from '../../Components/NavFront';
import Footer from '../../Components/Footer';

export default function Register({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        prenom: '',
        pseudo: '',
        email: '',
        password: '',
        image: null,
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <NavFront auth={auth} />
            <GuestLayout>
                <Head title="Register" />

                <section className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm border-0 p-4 rounded-4">
                                <h3 className="fw-bold mb-4 text-center text-dark">Create an Account</h3>

                                <form onSubmit={submit}>
                                    {/* Name */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2 text-danger" />
                                    </div>

                                    {/* Prenom */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="prenom" value="Prenom" />
                                        <TextInput
                                            id="prenom"
                                            name="prenom"
                                            value={data.prenom}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="prenom"
                                            onChange={(e) => setData('prenom', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.prenom} className="mt-2 text-danger" />
                                    </div>

                                    {/* Pseudo */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="pseudo" value="Pseudo" />
                                        <TextInput
                                            id="pseudo"
                                            name="pseudo"
                                            value={data.pseudo}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="pseudo"
                                            onChange={(e) => setData('pseudo', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.pseudo} className="mt-2 text-danger" />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2 text-danger" />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2 text-danger" />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-100 form-control"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2 text-danger" />
                                    </div>

                                    {/* Avatar Upload */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="image" value="Add an Avatar" />
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className={`form-control mt-1 ${errors.image ? 'is-invalid' : ''}`}
                                            onChange={(e) => setData('image', e.target.files[0])}
                                        />
                                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                    </div>

                                    {/* Submit */}
                                    <div className="d-flex align-items-center justify-content-between mt-4">
                                        <Link
                                            href={route('login')}
                                            className="text-decoration-none text-danger small fw-semibold"
                                        >
                                            Already registered?
                                        </Link>

                                        <PrimaryButton
                                            className="btn btn-danger px-4 py-2 fw-semibold"
                                            disabled={processing}
                                        >
                                            {processing ? 'Registering...' : 'Register'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </GuestLayout>
        </>
    );
}
