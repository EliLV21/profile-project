'use client';
import { Suspense, useState } from 'react';
import NavBar from './components/shared/nav/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './components/pages/home/page';
import BoardPage from './components/pages/board/page';
import { UserNameContext } from './components/shared/context';

export interface DefectValue {
  name: string;
  setName: (name: string) => string;
}

export default function Home() {
  const queryClient = new QueryClient();

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <QueryClientProvider client={queryClient}>
        <UserNameContext.Provider value={defectValue}>
          <Router future={{ v7_startTransition: true }}>
            <NavBar />

            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/board" element={<BoardPage />} />
                {/* <Route path="/carousel" element={<CarouselPage />} />
                    <Route path="/notes" element={<NotesPage />} /> */}
              </Routes>
            </Suspense>
          </Router>
        </UserNameContext.Provider>
      </QueryClientProvider>
    </div>
  );
}
