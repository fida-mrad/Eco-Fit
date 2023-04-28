import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import { ProvideClient } from "./ClientContext";
import SignIn from "./components/Sign-In";
import ResetPasswordAdmin from "./components/ResetPasswordAdmin";


// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const Claim = lazy(() => import("./pages/other/Claim"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

//auth pages
const AgentLogin = lazy(() => import("./views/pages/login/AgentLogin"));
const AgentRegister = lazy(() =>
  import("./views/pages/register/AgentRegister")
);
const AdminLogin = lazy(() => import("./views/pages/login/AdminLogin"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"));
const Register = lazy(() => import("./pages/other/Register"));
const SignUp = lazy(() => import("./components/SignUp"));

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <ProvideClient>
            <Routes>
              <Route path="/agent/*" name="Home" element={<DefaultLayout />} />
              <Route
                exact
                path="/agentregister"
                name="Brand Agent Register Page"
                element={<AgentRegister />}
              />
              <Route
                exact
                path="/adminlogin"
                name="Admin SignIn Page"
                element={<AdminLogin />}
              />
              <Route
                exact
                path="/admin/*"
                name="Admin Layout"
                element={<AdminLayout />}
              />
              <Route
                exact
                path="/register"
                name="Client Register"
                element={<Register />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<HomeFashion />}
              />
              <Route
                exact
                path="/agentlogin"
                name="Agent SignIn Page"
                element={<AgentLogin />}
              />
              <Route path="reset">
                <Route path=":token" element={<ForgotPassword />} />
              </Route>
<<<<<<< Updated upstream
              <Route path="agent/reset">
                <Route path=":token" element={<ResetPassword />} />
              </Route>
              <Route path="admin/reset">
                <Route path=":token" element={<ResetPasswordAdmin />} />
              </Route>
=======
             
>>>>>>> Stashed changes

              {/* Homepages */}
              <Route
                path={process.env.PUBLIC_URL + "*"}
                element={<HomeFashion />}
              />

              {/* Shop pages */}
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                element={<ShopGridStandard />}
              />
              {/* Shop product pages */}
              <Route
                path={process.env.PUBLIC_URL + "/product/:id"}
                element={<Product />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                element={<ProductTabLeft />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                element={<ProductTabRight />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                element={<ProductSticky />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-slider/:id"}
                element={<ProductSlider />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                element={<ProductFixedImage />}
              />

              {/* Blog pages */}
              <Route
                path={process.env.PUBLIC_URL + "/blog-standard"}
                element={<BlogStandard />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                element={<BlogNoSidebar />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                element={<BlogRightSidebar />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-details-standard"}
                element={<BlogDetailsStandard />}
              />

              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                element={<Contact />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/claim"}
                element={<Claim />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={<MyAccount />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/login"}
                element={<LoginRegister />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                element={<Wishlist />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/compare"}
                element={<Compare />}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                element={<Checkout />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProvideClient>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};
function ClientRoutes() {
  return (
    <ProvideClient>
      <Routes>
        {/* <Route path="*" element={<HomePage />} /> */}
        {/* <Route path="/details" element={<ClientDetails />} /> */}
        {/* <Route path="/test" element={<TestComp />} /> */}
        <Route path="/my-account" element={<MyAccount />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </ProvideClient>
  );
}

export default App;
