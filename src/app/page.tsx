// src/app/page.tsx
// All these paths are correct relative to src/app/page.tsx
import ProfileHeader from './components/profile/ProfileHeader';
import ProfileSidebar from './components/profile/ProfileSidebar';
import MainContent from './components/profile/MainContent';
import Advertisements from './components/Advertisements';

export default function ProfilePage() {
  return (
    // Updated grid layout for 3 columns
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

      {/* Left Column - Profile Sidebar (e.g., takes 3 columns) */}
      <div className="md:col-span-3">
        <ProfileSidebar />
      </div>

      {/* Middle/Main Content Column (e.g., takes 6 columns) */}
      <div className="md:col-span-6">
        <ProfileHeader />
        <MainContent />
      </div>

      {/* Right Column - Advertisements (e.g., takes 3 columns) */}
      <div className="md:col-span-3">
        <Advertisements />
      </div>
    </div>
  );
}