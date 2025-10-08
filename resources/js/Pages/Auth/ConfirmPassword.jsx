import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import NavFront from '../../Components/NavFront';
import Footer from '../../Components/Footer';

export default function ConfirmPassword({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <NavFront auth={auth} />
            <GuestLayout>
                <Head title="Confirm Password" />

                <section className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm border-0 p-4 rounded-4">
                                <h3 className="fw-bold mb-3 text-center text-dark">
                                    Confirm Your Password
                                </h3>
                                <p className="text-muted text-center mb-4">
                                    This is a secure area of the site — please confirm your password before continuing.
                                </p>

                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-100 form-control"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2 text-danger" />
                                    </div>

                                    <div className="d-grid mt-4">
                                        <PrimaryButton
                                            className="btn btn-danger py-2 fw-semibold"
                                            disabled={processing}
                                        >
                                            {processing ? 'Confirming...' : 'Confirm'}
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
