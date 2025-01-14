import FeaturedWorks from "../FeaturedWorks/FeaturedWorks";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import PlatformStats from "../PlatformStats/PlatformStats";
import TopWorkers from "../TopWorkers/TopWorkers";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <>
            <header className="bg-[#FFF4E6] w-full">
                <Hero></Hero>
            </header>
            <main>
                <section className="w-11/12 mx-auto">
                    <TopWorkers></TopWorkers>
                </section>
                <section className="w-11/12 mx-auto">
                    <FeaturedWorks></FeaturedWorks>
                </section>
                <section className="w-11/12 mx-auto">
                    <HowItWorks></HowItWorks>
                </section>
                <section className="w-11/12 mx-auto">
                    <PlatformStats></PlatformStats>
                </section>
                <section className="bg-white">
                    <WhyChooseUs></WhyChooseUs>
                </section>
            </main>
        </>
    );
};

export default Home;