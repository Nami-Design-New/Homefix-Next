"use client";

import { useRouter } from "@/i18n/routing";

export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <section className="error-page">
      <h1 className="error-header">Something went wrong!</h1>
      <p className="error-message">{error.message}</p>
      <div className="error-button-group">
        <button
          className="error-button"
          onClick={() => {
            reset();
          }}
        >
          Try again
        </button>
        <button
          className="home-button"
          onClick={() => {
            router.push("/");
          }}
        >
          <i className="fa-regular fa-home"></i>
          <span>Go To Home</span>
        </button>
      </div>
    </section>
  );
}
