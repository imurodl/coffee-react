import React from "react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // A failed lazy-chunk load almost always means the user has a stale tab
    // open after a redeploy (hashed chunk filenames changed). Reload once to
    // pull the current build; the sessionStorage guard prevents reload loops.
    const isChunkError =
      /Loading chunk|dynamically imported module|Failed to fetch/i.test(
        error?.message || ""
      );
    if (isChunkError && !sessionStorage.getItem("chunk-reloaded")) {
      sessionStorage.setItem("chunk-reloaded", "1");
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            fontFamily: "Raleway, sans-serif",
            textAlign: "center",
            padding: 24,
          }}
        >
          <h2 style={{ margin: 0 }}>Something went wrong.</h2>
          <p style={{ color: "#666", margin: 0 }}>
            Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              border: "2px solid #DB9457",
              background: "transparent",
              cursor: "pointer",
              letterSpacing: 1,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
