import { NextPage } from 'next';
import AIInput from '../../src/components/ai/AIinput';
import PastInteractions from '../../src/components/ai/pastinteraction';
import AISettings from '../../src/components/ai/AISettings';

const AIAssistantPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">AI Assistant</h1>
          <p className="text-lg font-light">How can I assist you today?</p>
        </header>

        {/* AI Input and Suggestions */}
        <section className="flex flex-col md:flex-row gap-8">
          <AIInput />
        </section>

        {/* Past Interactions */}
        <PastInteractions />

        {/* AI Assistant Settings */}
        <AISettings />
      </main>
    </div>
  );
};

export default AIAssistantPage;
