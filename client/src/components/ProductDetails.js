import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

function ProductDetails() {
  return (
    <>
      <NavBar></NavBar>
      {/* // <!-- Product Detail Start --> */}
      <div className="product_detail">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="product_detail-top">
                <div className="row align-items-center">
                  <div className="col-md-5">
                    <div className="product_slider-single normal-slider">
                      <img
                        src="assets/images/product_1.png"
                        alt="Product Image"
                      />
                      <img
                        src="assets/images/product_3.png"
                        alt="Product Image"
                      />
                      <img
                        src="assets/images/product_5.png"
                        alt="Product Image"
                      />
                      <img
                        src="assets/images/product_7.png"
                        alt="Product Image"
                      />
                      <img
                        src="assets/images/product_9.png"
                        alt="Product Image"
                      />
                      <img
                        src="assets/images/product_10.png"
                        alt="Product Image"
                      />
                    </div>
                    <div className="product_slider-single-nav normal-slider">
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_1.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_3.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_5.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_7.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_9.png"
                          alt="Product Image"
                        />
                      </div>
                      <div className="slider-nav-img">
                        <img
                          src="assets/images/product_10.png"
                          alt="Product Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="product_content">
                      <div className="title">
                        <h2>Product Name</h2>
                      </div>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="price">
                        <h4>Price:</h4>
                        <p>
                          $99 <span>$149</span>
                        </p>
                      </div>
                      <div className="quantity">
                        <h4>Quantity:</h4>
                        <div className="qty">
                          <button className="btn-minus">
                            <i className="fa fa-minus"></i>
                          </button>
                          <input type="text" value="1" />
                          <button className="btn-plus">
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="p-size">
                        <h4>Size:</h4>
                        <div className="btn-group btn-group-sm">
                          <button type="button" className="btn">
                            S
                          </button>
                          <button type="button" className="btn">
                            M
                          </button>
                          <button type="button" className="btn">
                            L
                          </button>
                          <button type="button" className="btn">
                            XL
                          </button>
                        </div>
                      </div>
                      <div className="p-color">
                        <h4>Color:</h4>
                        <div className="btn-group btn-group-sm">
                          <button type="button" className="btn">
                            White
                          </button>
                          <button type="button" className="btn">
                            Black
                          </button>
                          <button type="button" className="btn">
                            Blue
                          </button>
                        </div>
                      </div>
                      <div className="action">
                        <a className="btn" href="#">
                          <i className="fa fa-shopping-cart"></i>Add to Cart
                        </a>
                        <a className="btn" href="#">
                          <i className="fa fa-shopping-bag"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row product_detail-bottom">
                <div className="col-lg-12">
                  <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="pill"
                        href="#description"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="pill"
                        href="#specification"
                      >
                        Specification
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="pill"
                        href="#reviews"
                      >
                        Reviews (1)
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div id="description" className="container tab-pane active">
                      <h4>Product description</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In condimentum quam ac mi viverra dictum. In efficitur
                        ipsum diam, at dignissim lorem tempor in. Vivamus tempor
                        hendrerit finibus. Nulla tristique viverra nisl, sit
                        amet bibendum ante suscipit non. Praesent in faucibus
                        tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam
                        et sapien eget arcu rhoncus scelerisque. Suspendisse sit
                        amet neque neque. Praesent suscipit et magna eu iaculis.
                        Donec arcu libero, commodo ac est a, malesuada finibus
                        dolor. Aenean in ex eu velit semper fermentum. In leo
                        dui, aliquet sit amet eleifend sit amet, varius in
                        turpis. Maecenas fermentum ut ligula at consectetur.
                        Nullam et tortor leo.
                      </p>
                    </div>
                    <div id="specification" className="container tab-pane fade">
                      <h4>Product specification</h4>
                      <ul>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                      </ul>
                    </div>
                    <div id="reviews" className="container tab-pane fade">
                      <div className="reviews-submitted">
                        <div className="reviewer">
                          Phasellus Gravida - <span>01 Jan 2020</span>
                        </div>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam.
                        </p>
                      </div>
                      <div className="reviews-submit">
                        <h4>Give your Review:</h4>
                        <div className="ratting">
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                        <div className="row form">
                          <div className="col-sm-6">
                            <input type="text" placeholder="Name" />
                          </div>
                          <div className="col-sm-6">
                            <input type="email" placeholder="Email" />
                          </div>
                          <div className="col-sm-12">
                            <textarea placeholder="Review"></textarea>
                          </div>
                          <div className="col-sm-12">
                            <button>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product">
                <div className="section-header">
                  <h1>Related Products</h1>
                </div>

                <div className="row align-items-center product_slider product_slider-3">
                  <div className="col-lg-3">
                    <div className="product_item">
                      <div className="product_title">
                        <a href="#">Product Name</a>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product_image">
                        <a href="product_detail.html">
                          <img
                            src="assets/images/product_10.png"
                            alt="Product Image"
                          />
                        </a>
                        <div className="product_action">
                          <a href="#">
                            <i className="fa fa-cart-plus"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product_price">
                        <h3>
                          <span>$</span>99
                        </h3>
                        <a className="btn" href="">
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="product_item">
                      <div className="product_title">
                        <a href="#">Product Name</a>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product_image">
                        <a href="product_detail.html">
                          <img
                            src="assets/images/product_8.png"
                            alt="Product Image"
                          />
                        </a>
                        <div className="product_action">
                          <a href="#">
                            <i className="fa fa-cart-plus"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product_price">
                        <h3>
                          <span>$</span>99
                        </h3>
                        <a className="btn" href="">
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="product_item">
                      <div className="product_title">
                        <a href="#">Product Name</a>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product_image">
                        <a href="product_detail.html">
                          <img
                            src="assets/images/product_6.png"
                            alt="Product Image"
                          />
                        </a>
                        <div className="product_action">
                          <a href="#">
                            <i className="fa fa-cart-plus"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product_price">
                        <h3>
                          <span>$</span>99
                        </h3>
                        <a className="btn" href="">
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="product_item">
                      <div className="product_title">
                        <a href="#">Product Name</a>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product_image">
                        <a href="product_detail.html">
                          <img
                            src="assets/images/product_4.png"
                            alt="Product Image"
                          />
                        </a>
                        <div className="product_action">
                          <a href="#">
                            <i className="fa fa-cart-plus"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product_price">
                        <h3>
                          <span>$</span>99
                        </h3>
                        <a className="btn" href="">
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="product_item">
                      <div className="product_title">
                        <a href="#">Product Name</a>
                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product_image">
                        <a href="product_detail.html">
                          <img
                            src="assets/images/product_2.png"
                            alt="Product Image"
                          />
                        </a>
                        <div className="product_action">
                          <a href="#">
                            <i className="fa fa-cart-plus"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-heart"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product_price">
                        <h3>
                          <span>$</span>99
                        </h3>
                        <a className="btn" href="">
                          <i className="fa fa-shopping-cart"></i>Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Side Bar Start --> */}
            <div className="col-lg-4 sidebar">
              <div className="sidebar-widget category">
                <h2 className="title">Category</h2>
                <nav className="navbar bg-light">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-female"></i>Fashion & Beauty
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-child"></i>Kids & Babies Clothes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-tshirt"></i>Men & Women Clothes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-mobile-alt"></i>Gadgets &
                        Accessories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-microchip"></i>Electronics &
                        Accessories
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="sidebar-widget widget-slider">
                <div className="sidebar-slider normal-slider">
                  <div className="product_item">
                    <div className="product_title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product_image">
                      <a href="product_detail.html">
                        <img
                          src="assets/images/product_7.png"
                          alt="Product Image"
                        />
                      </a>
                      <div className="product_action">
                        <a href="#">
                          <i className="fa fa-cart-plus"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                    <div className="product_price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="product_item">
                    <div className="product_title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product_image">
                      <a href="product_detail.html">
                        <img
                          src="assets/images/product_8.png"
                          alt="Product Image"
                        />
                      </a>
                      <div className="product_action">
                        <a href="#">
                          <i className="fa fa-cart-plus"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                    <div className="product_price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="product_item">
                    <div className="product_title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product_image">
                      <a href="product_detail.html">
                        <img
                          src="assets/images/product_9.png"
                          alt="Product Image"
                        />
                      </a>
                      <div className="product_action">
                        <a href="#">
                          <i className="fa fa-cart-plus"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                    <div className="product_price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-widget brands">
                <h2 className="title">Our Brands</h2>
                <ul>
                  <li>
                    <a href="#">Nulla </a>
                    <span>(45)</span>
                  </li>
                  <li>
                    <a href="#">Curabitur </a>
                    <span>(34)</span>
                  </li>
                  <li>
                    <a href="#">Nunc </a>
                    <span>(67)</span>
                  </li>
                  <li>
                    <a href="#">Ullamcorper</a>
                    <span>(74)</span>
                  </li>
                  <li>
                    <a href="#">Fusce </a>
                    <span>(89)</span>
                  </li>
                  <li>
                    <a href="#">Sagittis</a>
                    <span>(28)</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-widget tag">
                <h2 className="title">Tags Cloud</h2>
                <a href="#">Lorem ipsum</a>
                <a href="#">Vivamus</a>
                <a href="#">Phasellus</a>
                <a href="#">pulvinar</a>
                <a href="#">Curabitur</a>
                <a href="#">Fusce</a>
                <a href="#">Sem quis</a>
                <a href="#">Mollis metus</a>
                <a href="#">Sit amet</a>
                <a href="#">Vel posuere</a>
                <a href="#">orci luctus</a>
                <a href="#">Nam lorem</a>
              </div>
            </div>
            {/* <!-- Side Bar End --> */}
          </div>
        </div>
      </div>
      {/* <!-- Product Detail End --> */}

      {/* <!-- Brand Start --> */}
      <div className="brand">
        <div className="container-fluid">
          <div className="brand-slider">
            <div className="brand-item">
              <img src="assets/img/brand-1.png" alt="" />
            </div>
            <div className="brand-item">
              <img src="assets/img/brand-2.png" alt="" />
            </div>
            <div className="brand-item">
              <img src="assets/img/brand-3.png" alt="" />
            </div>
            <div className="brand-item">
              <img src="assets/img/brand-4.png" alt="" />
            </div>
            <div className="brand-item">
              <img src="assets/img/brand-5.png" alt="" />
            </div>
            <div className="brand-item">
              <img src="assets/img/brand-6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Brand End --> */}
      <Footer></Footer>
      {/* <!-- Back to Top --> */}
      <a href="#" className="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>
    </>
  );
}

export default ProductDetails;
