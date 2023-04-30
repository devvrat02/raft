import React, { useEffect, useState } from 'react';
import { DownOutlined, LogoutOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { unsetuser } from '../../../reducers/authSlice';
function Header() 
{  
    const {email,name}=useSelector((state:RootState)=>state.auth)
    const [profile,setProfile]=useState({
        email:'',
        name:''
    })
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const Logout=()=>{
        localStorage.removeItem('token');
        dispatch(unsetuser);       
        navigate(`/login`);

    }
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div className={`flex flex-row justify-between items-center`}>
                Profile
            </div>
          ),
        },
        
        {
          key: '2',
          danger: true,
          label: (
          <div className='cursor-pointer' onClick={()=>{Logout()}}>
              Logout
          </div>
          ),
          icon: <LogoutOutlined />,
        },
      ];
    useEffect(()=>{
        setProfile({
             email:email,
             name:name
        })
    },[email,name]);
    
    return (
        <div className={`header flex h-14 p-1 px-2 shadow-md `} style={{background:`#4f7e5d4d`}}>
            <div className={`w-full lg:w-4/6 m-auto flex flex-row justify-between items-center`}>
               <div className={`flex`}>APPLICATION</div>
                <div className={`flex flex-row w-auto justify-between items-center`}>
                        <div className={`mr-8 headsty nav-hide cursor-pointer `} >
                        <Dropdown menu={{ items }}>
                            <Space>
                                {profile.email}
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                        </div>
                    <div className="lg:hidden cursor-pointer"></div>
                </div>
            </div>
        </div> 
     );
}
export default Header;