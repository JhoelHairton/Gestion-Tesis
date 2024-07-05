import React, { useState } from 'react'
import "./Auth.css"
import IniciarSesion from './iniciarSesion';
import Registrar from './Registrar';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const togglePanel = () => {
        setIsRegister(!isRegister);
    };
    return (
        <div className='flex justify-center h-screen items-center overflow-hidden'>
            <div className="bor lg:max-w-4xl">
                <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
                    <div className="front">
                        <img src="https://scontent.faqp2-3.fna.fbcdn.net/v/t39.30808-6/354552236_213799568241181_7338331538417564987_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFp3CwBv6Gs3yGj0nrdG1tl0IXeFjXwoTnQhd4WNfChOee2ojbmWGApC6HIUFOweie8rQFGhltVgDbTZLwgHHb4&_nc_ohc=ipHbpw_gf8kQ7kNvgH6d217&_nc_ht=scontent.faqp2-3.fna&oh=00_AYBzIxAML0JIuTiT0qJritshkpJMfe99CEy3hcX8QiMCAA&oe=668897A6" alt="" srcset="" />
                        <div className='text'>
                            <span className='text-1'>El éxito se basa en tareas bien organizadas</span>
                            <span className='text-2 text-xs'>Vamos a conectarnos</span>
                        </div>
                    </div>
                    <div className="back">
                        <img src="https://files.adventistas.org/noticias/es/2018/10/09114445/UPeU-Juliaca-2018.jpg" alt="" />
                    </div>
                </div>
                <div className='forms h-full'>
                    <div className='form-content h-full'>
                        <div className='login-form'>

                            <IniciarSesion togglePanel={togglePanel}/>
                        </div>
                        <div className='signup-form'>
                            <Registrar togglePanel={togglePanel}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Auth