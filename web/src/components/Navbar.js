import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserMenu } from './UserMenu'

const { Header } = Layout;

export function Navbar() {
    const userMenu = (
        <UserMenu />
    );
    return (
        <Header className="navbar">
            <div className="logo">
            
            </div>
            <Menu theme="dark" mode="horizontal"  style={{ display: 'block' }} defaultSelectedKeys={['1']} className="nav-menu">
                <Menu.Item   key="1" style={{ float: 'left' }}>Dashboard</Menu.Item>
                <Menu.Item key="2" style={{ float: 'left' }} >Login</Menu.Item>

                <Menu.Item key="4"  style={{ float: 'right' }} className="user-avatar">
                    <div>
                        <Dropdown overlay={userMenu}>
                            <Avatar icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                </Menu.Item>

            </Menu>

        </Header>
    );
}
