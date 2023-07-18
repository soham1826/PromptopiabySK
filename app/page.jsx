import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
        {/* styles with _ underscore are from our own globals.css  */}
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="text-center orange_gradient">Creative prompts</span>
        </h1>
        <p className="desc text-center" > 
            Promptopia is a open-source tool for modern world to discover,create and share creative and favourite prompts
        </p>
        <Feed/>
    </section>
  )
}

export default Home