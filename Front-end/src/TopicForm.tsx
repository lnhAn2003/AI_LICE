import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

interface FormValues {
    title: string;
    content: string;
}

const TopicForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = (values: FormValues) => {
        setLoading(true);
        axios.post('http://localhost:5000/api/topics/create', values)
            .then(Response => {
                message.success('Topic created successfully');
                setLoading(false);
            })
            .catch(error => {
                message.error('Failed to create topic');
                setLoading(false);
            });
    };

    return (
        <Form name="createTopic" onFinish={onFinish}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create Topic
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TopicForm;