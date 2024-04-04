import Layout from "@/components/Layout";
import MainView from "@/components/MainView";
import usePageTitle from "@/hooks/usePageTitle";

function Home(): JSX.Element {
  usePageTitle("Home");

  return (
    <Layout>
      <MainView />
    </Layout>
  );
}

export default Home;
