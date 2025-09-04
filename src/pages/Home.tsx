import Explore from "@/components/ExploreService/ExploreComponent";
import { About } from "@/components/About_Section/About";
import { Theme } from "@/components/Our_Theme/Theme";
import { Sponsors } from "@/components/Our_Sponsors/Sponsors";
import { FAQ } from "@/components/Frequently_Asked_Questions/FAQ";
import { Nexus } from "@/components/Technovate_2024/Technovate";
import { Footer } from "@/components/Footer/Footer";

function Home() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/space-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Welcome to Nexus
          </h1>
        </div>
      </div>
      <About/>
      <Theme/>
      <Explore />
      <Sponsors/>
      <FAQ/>
      <Nexus/>
      <Footer/>
    </>
  );
}

export default Home;
