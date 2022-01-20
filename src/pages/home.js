import logoWhite from "../home-assets/images/Haba-Logo-White.png";
import appwhite from "../home-assets/haba-images/app-iphone-white-edited.png";
import phonehand from "../home-assets/images/phone-hand.png";

import "../home-assets/css/animate.css";
import "../home-assets/css/bootstrap.min.css";
import "../home-assets/css/glightbox.min.css";
import "../home-assets/css/LineIcons.2.0.css";
import "../home-assets/css/main.css";
import "../home-assets/css/styles.css";
import "../home-assets/css/tiny-slider.css";
import { Link } from "react-router-dom";
import { useRef } from 'react'
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const productRef = useRef(null)
  const benefitsRef = useRef(null)
  const journeyRef = useRef(null)
  const homeRef = useRef(null)

  return (
    <div className="App">
      <header className="header navbar-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="nav-inner">
                <nav className="navbar navbar-expand-lg">
                  <a className="navbar-brand" href="/">
                    <img
                      src={logoWhite}
                      alt="Logo"
                      style={{ "maxWidth": "120px" }}
                    />
                  </a>
                  <button
                    className="navbar-toggler mobile-menu-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <a
                          href
                          onClick={(e) => {
                            e.preventDefault()
                            homeRef.current.scrollIntoView()
                          }}
                          className="page-scroll active"
                          aria-label="Toggle navigation"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href
                          onClick={(e) => {
                            e.preventDefault()
                            productRef.current.scrollIntoView()
                          }}
                          className="page-scroll"
                          aria-label="Toggle navigation"
                        >
                          Products
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="page-scroll"
                          href
                          onClick={(e) => {
                            e.preventDefault()
                            benefitsRef.current.scrollIntoView()
                          }}
                          aria-label="Toggle navigation"
                        >
                          Benefits
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          className="page-scroll"
                          href="/login"
                          aria-label="Toggle navigation"
                        >
                          Login
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="button add-list-button">
                    <Link to="/members" className="btn page-scroll">
                      Sign up
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="hero-area" ref={homeRef}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 col-12">
              <div
                className="hero-content"
                style={{ "paddingBottom": "70px" }}
              >
                <h1 className="wow fadeInLeft" data-wow-delay=".4s">
                  Your money companion.
                </h1>
                <p
                  className="wow fadeInLeft"
                  data-wow-delay=".6s"
                  style={{ "textAlign": "justify" }}
                >
                  Helping you earn while saving or paying bills without breaking
                  your bank or putting dents in your wallet. <br />
                 
                </p>
                <div className="button wow fadeInLeft" data-wow-delay=".8s">
                  {/* <a
                    href="https://play.google.com/store/apps/details?id=com.haba"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="btn btn-alt"
                  >
                    <i className="lni lni-play-store"></i> Google Play
                  </a> */}

                  <button onClick={(e) => {
                            e.preventDefault()
                           journeyRef.current.scrollIntoView()
                          }} className="btn btn-alt mb-2">
                    Start your saving journey
                  </button>

                  <Link className="btn btn-alt mb-2" to="/loans">
                    Request Loan
                  </Link>

                  <Link className="btn btn-alt mb-2" to="/loans">
                    Investments
                  </Link>

                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <div
                className="hero-image text-center wow fadeInRight"
                data-wow-delay=".4s"
              >
                <img src={phonehand} style={{ "maxWidth": "300px" }} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="features section" ref={productRef}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".4s">
                  Products
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Invest securely to pre-vetted stock and bond markets. With
                  Haba Invest, you are one click away from making your money
                  work for you.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".2s">
                <i className="lni lni-cloud-upload"></i>
                <h3>Haba Save</h3>
                <p>
                  Whether you are saving for rent or school fee or that dream
                  car, Haba will give you upto %14 interest on your locked
                  savings. Good news is that you can even access instant loan to
                  your bank account or mobile wallet if you are saving with Haba
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".4s">
                <i className="lni lni-lock"></i>
                <h3>Haba Loans</h3>
                <p>
                  With Haba loans, you will stop avoiding that your friend you
                  are owing! You can pay them off with haba and have rest of
                  mind! Haba loans are instant and non collateral loans that
                  allows you to borrow instantly and the money is all yours in
                  one second.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".6s">
                <i className="lni lni-reload"></i>
                <h3>Haba Remit</h3>
                <p>
                  Haba remit allows you to share love with your family and
                  friends. You can instantly request or credit your friends,
                  family or acquaintances. Haba pay will allow you to request or
                  send money from relatives abroad with instant delivery.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".2s">
                <i className="lni lni-shield"></i>
                <h3>Haba Pay</h3>
                <p>
                  Go cashless with haba pay. You can pay any vendor, from retail
                  stores, bars, churches and wholesalers. With haba, you can pay
                  any vendor from bank account or mobile wallet that is
                  integrated to your haba account
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".4s">
                <i className="lni lni-cog"></i>
                <h3>Haba Groups</h3>
                <p>
                  You can now create savings and credit groups with your friends
                  and family wherever they are in the world. Haba brings you
                  closer to your loved ones through Haba group.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-feature wow fadeInUp" data-wow-delay=".6s">
                <i className="lni lni-layers"></i>
                <h3>Haba Invest</h3>
                <p>
                  Invest securely to pre-vetted stock and bond markets. With
                  Haba Invest, you are one click away from making your money
                  work for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-achievement section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12 col-12">
              <div className="title">
                <h2>Your money pal</h2>
                <br />
                <p>
                  Haba enables you to earn even when you are spending or saving
                  for that special moment in your life. With Haba loans, you can
                  access instant loan to avoid that your neighbour or friend’s
                  embarrassment. Haba is unlocking financial freedom for
                  underserved markets to ensure inclusive financing
                  opportunities for all. We are closing financial gaps by
                  enabling the unbanked to have instant access to financial
                  services at a go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="benefits" ref={benefitsRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="title">
                <h3>Secured by Haba</h3>
              </div>
              <br />

              <div className="single-feature wow fadeInUp" data-wow-delay=".6s">
                <h5>Haba Invest</h5>
                <p>
                  Invest securely to pre-vetted stock and bond markets. With
                  Haba Invest, you are one click away from making your money
                  work for you
                </p>
              </div>
              <br />

              <div className="single-feature wow fadeInUp" data-wow-delay=".6s">
                <h5>Vetted Investment</h5>
                <p>
                  We offer vetted investment opportunities to help our users
                  grow their income with good returns
                </p>
              </div>
              <br />

              <div className="single-feature wow fadeInUp" data-wow-delay=".6s">
                <h5>Go cashless with Haba</h5>
                <p>
                  Make all your financial transactions in one place. Control
                  your expenditure and save on transaction fees by making your
                  payment with Haba
                </p>
              </div>
              <br />
            </div>

            <div className="col-lg-6 col-md-6">
              <div
                className="hero-image wow text-center fadeInRight"
                data-wow-delay=".4s"
              >
                <img src={appwhite} style={{ "maxWidth": "200px" }} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" ref={journeyRef} id="journey">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mb-2">
              <h4>Start Building your Wealth with Haba Save</h4>
              <p>
              You can now save with friends, family and peers and access instant, non-collateral loans from your Haba Save Group. <br/> You will be eligible to access instant loans after saving with your group for at least 3 months.
              </p>
              <br />
              <Link to="/groups" style={{padding: '15px 60px', fontSize: '15pt', fontWeight: '800', background:'#00a49f', border: '1px solid #00a49f'}} className="btn btn-success btn-lg">
              Start your saving Journey - Sign Up Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section call-action" id="download">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-md-12 col-12">
              <div className="cta-content">
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                  Download the App
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  Now Available on the Google PlayStore.
                </p>
                <div className="button wow fadeInUp" data-wow-delay=".6s">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.haba"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="btn btn-alt"
                  >
                    <i className="lni lni-play-store"></i> Google Play
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <a href="javaScript:void(0);" className="scroll-top">
          <i className="lni lni-chevron-up"></i>
        </a> */}
    </div>
  );
}

export default Home;
