import React from 'react'

import './default.layout.css'
import {  Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageMenu from '../pageMenu/PageMenu';

function DefaultLayout(props) {

    
   
    const navigate = useNavigate()

    const items = [
        {
            key: '7',
            label: (
                <li onClick={() => {
                    localStorage.getItem('Lab-Management-User')
                    navigate('/Dashboard')
                }}></li>
            ),
        }
    ];
    return (
       
    
        <div>

     <div>

     <div className='ma'>

</div>
           
<h2> Income AND Outcome</h2>
                    <Dropdown
                        menu={{
                            items,
                        }}
                     
                    >
                        <></>
                    </Dropdown>

                </div>
            
            <div className="content">


                {props.children}
            </div>

        </div>
    )
}

export default DefaultLayout
