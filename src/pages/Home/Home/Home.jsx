import FeaturedWorks from "../FeaturedWorks/FeaturedWorks";
import Hero from "../Hero/Hero";
import TopWorkers from "../TopWorkers/TopWorkers";

const Home = () => {
    return (
        <>
            <header className="bg-[#FFF4E6]">
                <Hero></Hero>
            </header>
            <main className="w-11/12 mx-auto">
                <section>
                    <TopWorkers></TopWorkers>
                </section>
                <section>
                    <FeaturedWorks></FeaturedWorks>
                </section>
            </main>
        </>
    );
};

export default Home;