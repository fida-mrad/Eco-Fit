function ProductsList() {
  return (
    <>
      {/* <!-- Top bar Start --> */}
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <i className="fa fa-envelope"></i>
              support@email.com
            </div>
            <div className="col-sm-6">
              <i className="fa fa-phone-alt"></i>
              +012-345-6789
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Top bar End --> */}

      {/* <!-- Nav Bar Start --> */}
      <div className="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a href="#" className="navbar-brand">
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto">
                <a href="index.html" className="nav-item nav-link">
                  Home
                </a>
                <a href="product-list.html" className="nav-item nav-link active">
                  Products
                </a>
                <a href="product-detail.html" className="nav-item nav-link">
                  Product Detail
                </a>
                <a href="cart.html" className="nav-item nav-link">
                  Cart
                </a>
                <a href="checkout.html" className="nav-item nav-link">
                  Checkout
                </a>
                <a href="my-account.html" className="nav-item nav-link">
                  My Account
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    More Pages
                  </a>
                  <div className="dropdown-menu">
                    <a href="wishlist.html" className="dropdown-item">
                      Wishlist
                    </a>
                    <a href="login.html" className="dropdown-item">
                      Login & Register
                    </a>
                    <a href="contact.html" className="dropdown-item">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="navbar-nav ml-auto">
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    User Account
                  </a>
                  <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                      Login
                    </a>
                    <a href="#" className="dropdown-item">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* <!-- Nav Bar End -->       */}

      {/* <!-- Bottom Bar Start --> */}
      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="logo">
                <a href="index.html">
                  <img src="assets/img/logo.png" alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="search">
                <input type="text" placeholder="Search" />
                <button>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="user">
                <a href="wishlist.html" className="btn wishlist">
                  <i className="fa fa-heart"></i>
                  <span>(0)</span>
                </a>
                <a href="cart.html" className="btn cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span>(0)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bottom Bar End -->   */}

      {/* <!-- Breadcrumb Start --> */}
      <div className="breadcrumb-wrap">
        <div className="container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Products</a>
            </li>
            <li className="breadcrumb-item active">Product List</li>
          </ul>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}

      {/* <!-- Product List Start --> */}
      <div className="product-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="product-view-top">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="product-search">
                          <input type="email" value="Search" />
                          <button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="product-short">
                          <div className="dropdown">
                            <div className="dropdown-toggle" data-toggle="dropdown">
                              Product short by
                            </div>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                Newest
                              </a>
                              <a href="#" className="dropdown-item">
                                Popular
                              </a>
                              <a href="#" className="dropdown-item">
                                Most sale
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="product-price-range">
                          <div className="dropdown">
                            <div className="dropdown-toggle" data-toggle="dropdown">
                              Product price range
                            </div>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                $0 to $50
                              </a>
                              <a href="#" className="dropdown-item">
                                $51 to $100
                              </a>
                              <a href="#" className="dropdown-item">
                                $101 to $150
                              </a>
                              <a href="#" className="dropdown-item">
                                $151 to $200
                              </a>
                              <a href="#" className="dropdown-item">
                                $201 to $250
                              </a>
                              <a href="#" className="dropdown-item">
                                $251 to $300
                              </a>
                              <a href="#" className="dropdown-item">
                                $301 to $350
                              </a>
                              <a href="#" className="dropdown-item">
                                $351 to $400
                              </a>
                              <a href="#" className="dropdown-item">
                                $401 to $450
                              </a>
                              <a href="#" className="dropdown-item">
                                $451 to $500
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-1.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-2.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-3.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-4.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-5.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-6.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-7.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-8.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-9.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
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

              {/* <!-- Pagination Start --> */}
              <div className="col-md-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabindex="-1">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* <!-- Pagination Start --> */}
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
                        <i className="fa fa-mobile-alt"></i>Gadgets & Accessories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-microchip"></i>Electronics & Accessories
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="sidebar-widget widget-slider">
                <div className="sidebar-slider normal-slider">
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-10.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-9.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
                      <h3>
                        <span>$</span>99
                      </h3>
                      <a className="btn" href="">
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="product-item">
                    <div className="product-title">
                      <a href="#">Product Name</a>
                      <div className="ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="product-image">
                      <a href="product-detail.html">
                        <img src="assets/img/product-8.jpg" alt="Product Image" />
                      </a>
                      <div className="product-action">
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
                    <div className="product-price">
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
      {/* <!-- Product List End -->   */}

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

      {/* <!-- Footer Start --> */}
      <div className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Get in Touch</h2>
                <div className="contact-info">
                  <p>
                    <i className="fa fa-map-marker"></i>123 E Store, Los Angeles,
                    USA
                  </p>
                  <p>
                    <i className="fa fa-envelope"></i>email@example.com
                  </p>
                  <p>
                    <i className="fa fa-phone"></i>+123-456-7890
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Follow Us</h2>
                <div className="contact-info">
                  <div className="social">
                    <a href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Company Info</h2>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Condition</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Purchase Info</h2>
                <ul>
                  <li>
                    <a href="#">Pyament Policy</a>
                  </li>
                  <li>
                    <a href="#">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="#">Return Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row payment align-items-center">
            <div className="col-md-6">
              <div className="payment-method">
                <h2>We Accept:</h2>
                <img src="assets/img/payment-method.png" alt="Payment Method" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="payment-security">
                <h2>Secured By:</h2>
                <img src="assets/img/godaddy.svg" alt="Payment Security" />
                <img src="assets/img/norton.svg" alt="Payment Security" />
                <img src="assets/img/ssl.svg" alt="Payment Security" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}

      {/* <!-- Footer Bottom Start --> */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 copyright">
              <p>
                Copyright &copy; <a href="https://htmlcodex.com">HTML Codex</a>.
                All Rights Reserved
              </p>
            </div>

            <div className="col-md-6 template-by">
              <p>
                Template By <a href="https://htmlcodex.com">HTML Codex</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer Bottom End -->        */}

      {/* <!-- Back to Top --> */}
      <a href="#" className="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>
    </>
  );
}

export default ProductsList;
