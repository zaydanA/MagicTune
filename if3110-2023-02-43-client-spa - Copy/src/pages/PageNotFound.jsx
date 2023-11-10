import { Navbar } from "../components/navbar";


export default function PageNotFound() {
  return (
    <div className="w-full h-screen justify-center items-center">
      <Navbar></Navbar>
      <div className="h-full flex items-center justify-center">
        <h1 className="text-5xl font-['Garamond']">Page not found 😢</h1>
      </div>
    </div>
  );
}
