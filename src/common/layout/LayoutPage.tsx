import Layout from "antd/es/layout";
import dynamic from "next/dynamic";
import NavixFooter from "../components/footer";
const PageHeader = dynamic(() => import("../components/header"), {
  ssr: false,
  loading: () => null,
});
const WARNING_TIMEOUT = 5;

const { Content } = Layout;

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Layout
        className={"relative min-h-screen overflow-hidden bg-none dark:bg-none"}
      >
        <div className={"relative w-full z-30"}>
          <PageHeader />
        </div>
        <Content className={"relative z-20"}>
          <div className="relative z-10 h-full px-3">{children}</div>
        </Content>
        <div className={"relative w-full z-10 bg-black"}>
          <NavixFooter />
        </div>
      </Layout>
    </div>
  );
};

export default PageLayout;
