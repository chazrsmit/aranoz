import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import NavFront from '../../Components/NavFront';
import Footer from '../../Components/Footer';

export default function Login({ status, canResetPassword, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <NavFront auth={auth} />
            <GuestLayout>
                <Head title="Log in" />

                {/* Login Section */}
                <section className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm border-0 p-4 rounded-4">
                                <h3 className="fw-bold mb-4 text-center text-dark">Login to Your Account</h3>

                                {status && (
                                    <div className="alert alert-success text-center" role="alert">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit}>
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
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
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
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2 text-danger" />
                                    </div>

                                    {/* Remember Me */}
                                    <div className="form-check mb-3">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                            className="form-check-input"
                                            id="remember"
                                        />
                                        <label
                                            htmlFor="remember"
                                            className="form-check-label ms-2 text-muted"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Forgot password + Button */}
                                    <div className="d-flex align-items-center justify-content-between">
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-decoration-none text-danger small fw-semibold"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}

                                        <PrimaryButton
                                            className="btn btn-danger px-4 py-2 fw-semibold"
                                            disabled={processing}
                                        >
                                            {processing ? 'Logging in...' : 'Log in'}
                                        </PrimaryButton>
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="mb-0 text-muted">
                                        Don’t have an account?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-danger fw-semibold text-decoration-none"
                                        >
                                            Register here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </GuestLayout>
        </>
    );
}
