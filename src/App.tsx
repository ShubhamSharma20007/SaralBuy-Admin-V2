import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router';
import { Suspense, useContext, useEffect, useState, lazy } from 'react';

import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';

import UserProfiles from './pages/UserProfiles';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';

import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';

import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
import Blank from './pages/Blank';

import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

import { UserContext } from './context/UserContext';
import { AuthServiceInstance } from './service/auth.service';
import { useFetch } from './hooks/useFetch';

import UserPersmission from './pages/UserPermission/UserPersmission';
import BidListingByProduct from './pages/BidListing/BidListingByProduct';
import Requirement from './pages/Requirement/Requirement';
import RequirementById from './pages/Requirement/RequirementById';
import SpinnerLoader from './common/SpinnerLoader';
import Bucket from './pages/Bucket';
import Category from './pages/Category';
const Home = lazy(() => import('./pages/Dashboard/Home'));
const BannerBucket = lazy(() => import('./pages/S3Bucket/BannerBucket'));
const BannerListing = lazy(() => import('./pages/S3Bucket/BannerListing'));
const AllProducts = lazy(() => import('./pages/AllProduct/AllProducts'));
const BidListing = lazy(() => import('./pages/BidListing/BidListing'));

function ProtectedRoute({ children }: any) {
  const { user, setUser } = useContext(UserContext)!;
  const { fn, data, loading, error } = useFetch(AuthServiceInstance.adminProfile);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      fn().finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  if (checking || loading) return <SpinnerLoader />; // 👈 reuse here too

  if ((!user && !data) || error) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

const AuthProductRoute = ({ children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthServiceInstance.adminProfile();

        if (response?._id) {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return children;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<SpinnerLoader />}>
        {' '}
        {/* 👈 wrap all routes */}
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/user-permission" element={<UserPersmission />} />
            <Route path="/banner-bucket" element={<BannerBucket />} />
            <Route path="/banner-table" element={<BannerListing />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/bucket" element={<Bucket />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/bid-listing" element={<BidListing />} />
            <Route path="/bid-listing-by-product/:id" element={<BidListingByProduct />} />
            <Route path="/requirement" element={<Requirement />} />
            <Route path="/product-requirement/:id" element={<RequirementById />} />
            <Route path="/categories" element={<Category />} />
          </Route>

          <Route
            path="/signin"
            element={
              <AuthProductRoute>
                <SignIn />
              </AuthProductRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthProductRoute>
                <SignUp />
              </AuthProductRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
