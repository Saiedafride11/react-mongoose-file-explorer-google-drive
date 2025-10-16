"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import MainPanel from "./components/MainPanel";
import Sidebar from "./components/Sidebar";
import { useGetItemsQuery } from "./store/api/fileApi";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { refetch } = useGetItemsQuery();

  // items data show
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />

      <div className="flex h-screen overflow-hidden">
        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity lg:hidden ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white z-30 transform transition-transform lg:translate-x-0 lg:static lg:flex ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Mobile menu button */}
          <header className="lg:hidden">
            <button
              className="fixed top-[9px] right-6 py-1 px-4 bg-primary/10 text-primary rounded z-40"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          </header>

          <main className="flex-1 overflow-auto p-4">
            <MainPanel />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
