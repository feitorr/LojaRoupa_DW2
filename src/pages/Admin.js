import Sidebar_admin from "../components/Sidebar_admin/Sidebar_admin";
import P_graficos from "../components/P_graficos/P_graficos";
const Admin = () => {
    return (<>
 <div style={{ display: "flex"}} >
    <Sidebar_admin />
    </div>
    <P_graficos/>
        </>
      );
  };
  
  export default Admin;