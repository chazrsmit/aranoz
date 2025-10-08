import { useForm } from "@inertiajs/react"

export default function Footer() {

    const { data, setData, errors, post, reset } = useForm({
        email: '',
    });

    const submitNewsletter = (e) => {
        e.preventDefault();

        post(route('store_newsletter'), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => reset('email'),
        });
    };

    return(
        <>
            <footer className="footer-section">
                <div className="container">
                    {/* Main Footer Content */}
                    <div className="row">
                        {/* Top Products Column */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="footer-title">Top Products</h5>
                            <ul className="footer-list">
                                <li><a href="#">Managed Website</a></li>
                                <li><a href="#">Manage Reputation</a></li>
                                <li><a href="#">Power Tools</a></li>
                                <li><a href="#">Marketing Service</a></li>
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="footer-title">Quick Links</h5>
                            <ul className="footer-list">
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Brand Assets</a></li>
                                <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Features Column */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="footer-title">Features</h5>
                            <ul className="footer-list">
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Brand Assets</a></li>
                                <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="footer-title">Resources</h5>
                            <ul className="footer-list">
                                <li><a href="#">Guides</a></li>
                                <li><a href="#">Research</a></li>
                                <li><a href="#">Experts</a></li>
                                <li><a href="#">Agencies</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="row mt-4">
                        <div className="col-lg-6">
                            <h5 className="footer-title">Newsletter</h5>
                            <p className="newsletter-text">
                                Subscribe to our newsletter.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="newsletter-form" style={{ marginTop: '35px' }}>
                                <form onSubmit={submitNewsletter} className="newsletter-form mt-3">
                                <div className="input-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            className="newsletter-input form-control"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="newsletter-btn">
                                            SUBSCRIBE
                                        </button>
                                    {errors.email && (
                                        <div className="invalid-feedback d-block mt-2">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="row mt-5 pt-4 copyright-border">
                        <div className="col-12 text-center">
                            <p className="copyright">
                                Copyright ©2025 | This template is made with <span className="heart">♥</span> by Charlotte
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}