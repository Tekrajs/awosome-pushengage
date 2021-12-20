import React from "react";

const Subscription = props => {

    let Url = new URL(window.location.href);
    let status = Url.searchParams.get('status');
    let reason = Url.searchParams.get('reason');

    return (
        <div className="container mt-100 mt-60">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="section-title mb-4 pb-2">
                        <h4 className="title mb-4">Awosome motive latest Blog &amp; News</h4>
                        <p className="text-muted para-desc mx-auto mb-0">Be updated with awosome motive latest updates</p>
                    </div>
                </div>
            </div>

            <div className="">
                <section id="blog" className="blog">
                    <div className="container aos-init aos-animate" data-aos="fade-up">
                        <div className="row" style={ { padding: '20px', textAlign: 'center', background: '#e59191' } }>

                            <div className="col col-lg-12">
                                <p>{ status }</p>
                            </div>

                            <div className="col col-lg-12">
                                <p>{ reason }</p>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>

    );

};

export default Subscription;;