import logo from "../../assets/vite.svg"


export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-mainBg/80 backdrop-blur-sm animate-pulse">
      <img alt="alpha logo" src={logo} className="h-10 object-contain" />
    </div>
  );
}
