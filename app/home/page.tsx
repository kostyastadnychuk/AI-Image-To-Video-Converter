import ImageUpload from "@/components/home/imageupload";
import Header from "@/components/home/header";
import SectionDivider from "@/components/home/section-divider";
import ExplorerTrendingCreations from "@/components/home/explorer-trending-creations";


export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <ImageUpload />
        <ExplorerTrendingCreations />
        <SectionDivider />
      </main>
    </>
  );
}
