import { useState } from 'react';
import Profile from '../components/SettingsComponents/Profile';
import Security from '../components/SettingsComponents/Security';
import Preferences from '../components/SettingsComponents/Preferences';
import Tabs from '../components/SettingsComponents/Tabs';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSubmit = (values) => {
    console.log('Profile saved:', values);
  };

  const handlePasswordSubmit = (values) => {
    console.log('Password updated:', values);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Account Settings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
          Manage your account settings and preferences
        </p>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'profile' && (
          <Profile
            initialValues={{ name: '', company: '', role: '' }}
            onSubmit={handleProfileSubmit}
          />
        )}
        {activeTab === 'security' && <Security onSubmit={handlePasswordSubmit} />}
        {activeTab === 'preferences' && <Preferences />}
      </div>
    </div>
  );
}