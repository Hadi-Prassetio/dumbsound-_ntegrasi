import { useRouter } from "next/router";
import * as React from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import { UserContext } from "../context/userContext";
import { API } from "./api/api";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = React.useContext(UserContext);
  const [song, setSong] = React.useState();

  const [showLogin, setShowLogin] = React.useState(false);
  const loginFirst = () => setShowLogin(true);

  React.useEffect(() => {
    const getSong = async (e) => {
      try {
        const response = await API.get("/songs");
        setSong(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSong();
  }, []);

  return (
    <Layout pageTitle='Home' showLogin={showLogin} setShowLogin={setShowLogin}>
      <div className='background py-[15rem]'>
        <div className='h-100vh pt-20rem my-auto text-center text-white align-center'>
          <h1 className='text-4xl font-bold'>Connect on DumbSound</h1>
          <p>Discovery, Stream, and share a constanly expanding mix of music</p>
          <p>from emerging and major artist around the world</p>
        </div>
      </div>
      <div className='container max-w-6xl'>
        <h1 className='text-2xl font-bold mt-10 font-mainFont text-center text-main'>
          Dengarkan Dan Rasakan
        </h1>
        <div className='grid md:grid-cols-6 md:gap-3 grid-cols-2 gap-1 my-8 mx-10'>
          {song?.map((item) => (
            <div
              key={item.id}
              onClick={
                !auth.isLogin
                  ? loginFirst
                  : () => router.push(`/menu/${item.id}`)
              }>
              <Card>
                <div>
                  <img
                    className='rounded-lg w-full p-2 h-32'
                    src={item.image}
                    alt='thumbnail'
                  />
                </div>
                <div className='grid grid-cols-4 px-2 py-2'>
                  <div className='col-span-3 text-white'>
                    <h5 className='mb-2 md:text-sm font-bold tracking-tightfont-mainFont'>
                      {item.title}
                    </h5>

                    <p className='mb-3 md:font-xl text-xs '>
                      {item.artist.name}
                    </p>
                  </div>
                  <p className='grid justify-end text-white'>{item.year}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
