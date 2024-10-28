import React, { useEffect, useState } from 'react';
import { List, Card, message } from 'antd';
import axios from 'axios';

// Define the type for topic data
interface Topic {
  _id: string;
  title: string;
  content: string;
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(response => {
        setTopics(response.data);
      })
      .catch(error => {
        message.error('Failed to load topics');
      });
  }, []);

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={topics}
      renderItem={(topic) => (
        <List.Item key={topic._id}>
          <Card title={topic.title}>
            {topic.content}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TopicList;
