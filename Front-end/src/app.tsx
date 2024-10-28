import React from 'react';
import TopicForm from './TopicForm';
import TopicList from './TopicList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Forum</h1>
      <h2>Create a Topic</h2>
      <TopicForm />
      <h2>Topics List</h2>
      <TopicList />
    </div>
  );
};

export default App;
