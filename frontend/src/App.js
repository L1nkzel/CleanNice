import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPageEmployee from "./pages/LoginPageEmployee";
import AdminPage from "./pages/AdminPage";
import ManageEmployeesPage from "./pages/ManageEmployeesPage";
import ManageCostumerPage from "./pages/ManageCustomerPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import EmployeePage from "./pages/EmployeePage";
import IntegrityPage from "./pages/IntegrityPage";
import CustomerHistoryPage from "./pages/CustomerHistoryPage";
import EmployeeHistoryPage from "./pages/EmployeeHistoryPage";
import ProtectedCustomer from "./components/protected/ProtectedCustomer";
import ProtectedEmployee from "./components/protected/ProtectedEmployee";
import ProtectedAdmin from "./components/protected/ProtectedAdmin";
import Error401Page from "./pages/Error401Page";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginForEmployees" element={<LoginPageEmployee />} />
        <Route path="/changeEmployeePass" element={<ChangePasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/401" element={<Error401Page />} />
        <Route
          path="/customer"
          element={
            <ProtectedCustomer>
              <CustomerPage />
            </ProtectedCustomer>
          }
        />
        <Route
          path="/adminpage/"
          element={
            <ProtectedAdmin>
              <AdminPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/adminpage/employees"
          element={
            <ProtectedAdmin>
              <ManageEmployeesPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/adminpage/customer"
          element={
            <ProtectedAdmin>
              <ManageCostumerPage />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/customer/services"
          element={
            <ProtectedCustomer>
              <ServicesPage />
            </ProtectedCustomer>
          }
        />
        <Route
          path="/customer/services/:id/"
          element={
            <ProtectedCustomer>
              <ServicesPage />
            </ProtectedCustomer>
          }
        />

        <Route
          path="/employee/"
          element={
            <ProtectedEmployee>
              <EmployeePage />
            </ProtectedEmployee>
          }
        />
        <Route path="/integrity" element={<IntegrityPage />} />
        <Route
          path="/employee/history"
          element={
            <ProtectedEmployee>
              <EmployeeHistoryPage />
            </ProtectedEmployee>
          }
        />
        <Route
          path="/customer/history"
          element={
            <ProtectedCustomer>
              <CustomerHistoryPage />
            </ProtectedCustomer>
          }
        />
      </Routes>
    </>
  );
}

export default App;
