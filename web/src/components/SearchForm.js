import { Form, Input, Button,  Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';

export  function SearchForm() {
  const onFinish = (values) => {
    // handle form submission
  };

  return (
    <Content  style={{ padding: 40, height: "93vh" }}>
    <Form onFinish={onFinish}>
      <Form.Item name="source" label="Source">
        <Input placeholder="Enter source address" />
      </Form.Item>
      <Form.Item name="destination" label="Destination">
        <Input placeholder="Enter destination address" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Search</Button>
      </Form.Item>
    </Form>
    </Content>
  );
}
