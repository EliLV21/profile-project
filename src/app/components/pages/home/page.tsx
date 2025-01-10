import Image from 'next/image';
import { useUserContext } from '../../shared/context';
import Marquee from '@/components/ui/marquee';

export const HomePage = () => {
  const logos = [
    {
      name: 'Microsoft',
      img: 'https://picsum.photos/id/1/200/300',
    },
    {
      name: 'Apple',
      img: 'https://picsum.photos/id/2/200/300',
    },
    {
      name: 'Google',
      img: 'https://picsum.photos/id/3/200/300',
    },
    {
      name: 'Facebook',
      img: 'https://picsum.photos/id/4/200/300',
    },
    {
      name: 'LinkedIn',
      img: 'https://picsum.photos/id/5/200/300',
    },
    {
      name: 'Twitter',
      img: 'https://picsum.photos/id/6/200/300',
    },
  ];

  const user = useUserContext();

  return (
    <>
      <div className="container p-8 relative flex items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background px-20 md:shadow-xl">
        <div className="w-full h-[100px]">
          {user ? (
            <div>
              <h1 className="text-4xl text-center text-primary-500">Welcome</h1>
              <p>{user.name}</p>
            </div>
          ) : (
            <p>Please log in</p>
          )}
        </div>
        <div className="grid grid-cols-4 p-[2rem]">
          <div className="col-span-2 flex flex-row gap-4 [perspective:400px]">
            <Marquee
              className="h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  'translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)',
              }}
            >
              {logos.map((data, idx) => (
                <Image
                  key={idx}
                  src={data.img}
                  alt={data.name}
                  width={200}
                  height={300}
                  className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                />
              ))}
            </Marquee>
          </div>
          <div className="col-span-2 flex items-center text-center">
            <p>
              Front end developer with 6 years of experience, working mainly with Javascript. Using Angularjs, Vuejs and
              React. With a strong experience in agile methodology, as well as the ability to translate business
              requirements into technical tasks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
