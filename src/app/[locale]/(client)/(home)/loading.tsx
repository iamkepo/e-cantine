"use client";

import { useThemeStore } from "@/stores/themeStore";

export default function Loading() {
  const { theme } = useThemeStore();
  return (
    <div className="col h-100">
      <div className={`card text-bg-${theme} h-100`}>
        <div className="card-body d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
  )
}