"use client";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    </div>
  )
}