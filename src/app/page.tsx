import Main from "@/components/main/index"
export default async function Page({ params }: any) {
  return (<>
    <div id="main" aria-busy="true">
      <Main />
    </div>
  </>)
}