import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import NavFront from '../../Components/NavFront';
import Footer from '../../Components/Footer';

export default function ForgotPassword({ status, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <NavFront auth={auth} />
            <GuestLayout>
                <Head title="Forgot Password" />

                <section className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm border-0 p-4 rounded-4">
                                <h3 className="fw-bold mb-3 text-center text-dark">
                                    Forgot Your Password?
                                </h3>
                                <p className="text-muted text-center mb-4">
                                    No worries — enter your email and we’ll send you a link
                                    to reset your password.
                                </p>

                                {status && (
                                    <div className="alert alert-success text-center">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-100 form-control"
                                            placeholder="Enter your email address"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2 text-danger" />
                                    </div>

                                    <div className="d-grid mt-4">
                                        <PrimaryButton
                                            className="btn btn-danger py-2 fw-semibold"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Sending...'
                                                : 'Email Password Reset Link'}
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
