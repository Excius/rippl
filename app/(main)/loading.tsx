function loading() {
  return <FullPageLoader />;
}

export default loading;

// FullPageLoader Component: A minimalist loader with a pulsing horizontal bar.
// This version features a single white bar that grows and shrinks on a black background.
const FullPageLoader = () => {
  return (
    <>
      {/* We'll add a style tag to define the horizontal pulsing animation */}
      <style>
        {`
          @keyframes pulse-bar-horizontal {
            0%, 100% {
              transform: scaleX(0.5);
              opacity: 0.5;
            }
            50% {
              transform: scaleX(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
      {/* Full-screen black background */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        {/* The pulsing white horizontal bar */}
        <div
          className="h-5 w-28 rounded-full bg-white"
          style={{
            animation: "pulse-bar-horizontal 1.5s ease-in-out infinite",
          }}
        ></div>
      </div>
    </>
  );
};
