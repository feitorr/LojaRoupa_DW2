import './Edit_profile.css';
import Sidebar_admin from "../Sidebar_admin/Sidebar_admin";
import admin_logo from "../Sidebar_admin/img/admin_logo.png";

const Edit_profile = () => {
    return (
        <div className="edit-profile-container">
            <Sidebar_admin />
            <div className="edit">
                <div className='Titulo'>
                    <h1>EDITAR O PERFIL</h1>
                    <img src={admin_logo}/>
                    <div className='editar'>
                    <button>EDITAR FOTO</button>
                    </div>
                    <div className='inputs'>
                       <div className='input1'>
                        <p>Nome</p>
                        <input type="text" />
                       </div>
                       <div className='input2'>
                        <input type="text" />
                       </div>
                       <div className='input3'>
                        <input type="text" />
                       </div>
                       <div className='input4'>
                        <input type="text" />
                       </div>
                       <div className='input5'>
                        <input type="text" />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit_profile;
