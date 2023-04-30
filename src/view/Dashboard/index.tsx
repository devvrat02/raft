import Header from "./Header";
import Post from "./Post";
import PostList from "./PostList/index.js";
import { useState } from 'react';
import { MailOutlined,TagOutlined ,UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'All Posts',
    key: 'all',
    icon: <MailOutlined />,
  },
  {
    label: 'Follow UP',
    key: 'follow',
    icon: <TagOutlined />,
  },
  {
    label: 'Profile',
    key: 'self',
    icon: <UserOutlined />,
  },
];


const Container=({page=''}:any)=>{
  return(
      <div className={`flex w-full lg:w-4/6 m-auto p-2 flex-col justify-between items-center pl-4 pr-4`} style={{minHeight:'100vh'}}>
        <div className="w-full lg:w-4/6 flex flex-col justify-center content-center">
         {page!=='self'&&<Post/>}
         <PostList page={page}/>
        </div>
      </div>
  )
}

function Dashboard() {
  const [current, setCurrent] = useState('all');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
    return ( 
        <div className="pb-5" style={{background:'#f2f2f2'}}>
          <Header/>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" className="flex justify-items-center justify-center cursor-pointer" items={items} />
          <Container page={current}/>
        </div> 
     );
}

export default Dashboard;