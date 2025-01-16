'use client';
import { Suspense, useState } from 'react';
import NavBar from './components/shared/nav/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './components/pages/home/home';
import BoardPage from './components/pages/board/page';
import { UserNameContext, useUserContext } from './components/shared/context';
import NotesPage from './components/pages/notes/page';
import ParticlesView from './components/shared/particles/particles';

export interface DefectValue {
  name: string;
  setName: (name: string) => string;
}

export default function Home() {
  const queryClient = new QueryClient();
  const { name } = useUserContext();

  const isProd = process.env.NODE_ENV === 'production';
  console.log('isProd', isProd, process.env.NODE_ENV);

  const [defectValue, setDefectValue] = useState<DefectValue>({
    name: '',
    setName: (name: string) => {
      setDefectValue(prev => ({ ...prev, name }));
      return name;
    },
  });

  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ParticlesView />

      <QueryClientProvider client={queryClient}>
        <UserNameContext.Provider value={defectValue}>
          <Router future={{ v7_startTransition: true }}>
            <NavBar />
            <div className="w-full h-[100px]">
              {name ? (
                <div>
                  <h1 className="text-4xl text-center text-primary-500">Welcome</h1>
                  <p>Hello, {name}</p>
                </div>
              ) : (
                <p>Can you share your info so I can contact you?</p>
              )}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path={`${isProd ? '/profile-project' : '/'}`} element={<HomePage />} />
                <Route path="/board" element={<BoardPage />} />
                {/* <Route path="/carousel" element={<CarouselPage />} />*/}
                <Route path="/notes" element={<NotesPage />} />
              </Routes>
            </Suspense>
          </Router>
        </UserNameContext.Provider>
      </QueryClientProvider>
    </div>
  );
}
