import { Layout } from 'antd';
import {SearchForm} from './SearchForm'
import {Navbar} from './Navbar'
const { Content, Sider } = Layout;

export function Dashboard() {
  return (
    <>
     <Navbar />
<Layout>
  <Sider theme="light" width={600} className="left-sider">
    <div className="Title">Search </div>
    <SearchForm />
  </Sider>
  <Content className="map-content">
    <div className="right-sider">
      Map Component Here
    </div>
  </Content>
</Layout>
    </>
  );
}
