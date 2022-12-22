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

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/loginForEmployees" element={<LoginPageEmployee />} />
      <Route path="/changeEmployeePass" element={<ChangePasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/adminpage/" element={<AdminPage />} />
      <Route path="/adminpage/employees" element={<ManageEmployeesPage />} />
      <Route path="/adminpage/customer" element={<ManageCostumerPage />} />
      <Route path="/customer/services" element={<ServicesPage />} />
      <Route path="/customer/services/:id/" element={<ServicesPage />} />
      <Route path="/customer/support" element={<CustomerPage />} />
      <Route path="/employee/" element={<EmployeePage />} />
          </Routes>
    </>
    
  );
}

export default App;
