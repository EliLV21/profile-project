import Image from 'next/image';
import Marquee from '@/components/ui/marquee';
import { Label } from '@/components/ui/label';

const HomePage: React.FC = () => {
  const logos = [
    {
      name: 'BigCommerce',
      img: 'https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/projects/bigcommerce.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9wcm9qZWN0cy9iaWdjb21tZXJjZS5zdmciLCJpYXQiOjE3MzY4OTEwNTgsImV4cCI6MTc2ODQyNzA1OH0.IEd_GmcxssSDTBbPAZt_Xg-h6i6LGbHbMucdJwAEbKI&t=2025-01-14T21%3A44%3A18.710Z',
    },
    {
      name: 'Orion180',
      img: 'https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/projects/orion180.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9wcm9qZWN0cy9vcmlvbjE4MC5qcGciLCJpYXQiOjE3MzY4OTExNjIsImV4cCI6MTc2ODQyNzE2Mn0.PqJ_E9rlY0yCdhWHYclDtC79nAyRoNMNG8QlNP0BqvQ&t=2025-01-14T21%3A46%3A02.911Z',
    },
    {
      name: 'ESO',
      img: 'https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/projects/ESO.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9wcm9qZWN0cy9FU08ucG5nIiwiaWF0IjoxNzM2ODkxMTk1LCJleHAiOjE3Njg0MjcxOTV9.08jhLvrvvxpoHpfD4JHKp6ZWXhDc6n-Yi3HefSd3Arc&t=2025-01-14T21%3A46%3A36.089Z',
    },
    {
      name: 'Expedia group',
      img: 'https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/projects/expedia.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9wcm9qZWN0cy9leHBlZGlhLnBuZyIsImlhdCI6MTczNjg5MTI0MywiZXhwIjoxNzY4NDI3MjQzfQ.VV-jzbSbQ30Sg2qi0Fad-3DzmkoNUwKsdgwmHOU3_j4&t=2025-01-14T21%3A47%3A23.224Z',
    },
  ];

  return (
    <>
      <div className="container p-8 z-10 absolute items-center justify-center bg-opacity-60 gap-4 overflow-hidden rounded-lg border bg-background px-20 md:shadow-xl">
        <div className="grid grid-cols-6 p-[2rem]">
          <div>
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
          <div className="col-span-5 flex justify-end items-center">
            <div className="grid p-10">
              <p>
                Front end developer with 6 years of experience, working mainly with Javascript. Using Angularjs, Vuejs
                and React. With a strong experience in agile methodology, as well as the ability to translate business
                requirements into technical tasks.
              </p>
            </div>
            <div id="project-works">
              <ul className="flex flex-row">
                <li>
                  <Image
                    src="https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/logo/react.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9sb2dvL3JlYWN0LnN2ZyIsImlhdCI6MTczNjg5MjA3MywiZXhwIjoxNzY4NDI4MDczfQ.--CSKhwVqVV4_po-JBX97EM7-50idVeKujdnbTdyEGk&t=2025-01-14T22%3A01%3A13.678Z"
                    alt="React"
                    width={330}
                    height={200}
                  />
                </li>
                <li>
                  <Image
                    src="https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/logo/shadcn-ui.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9sb2dvL3NoYWRjbi11aS5zdmciLCJpYXQiOjE3MzY4OTcxOTIsImV4cCI6MTc2ODQzMzE5Mn0.t0hiwVxgvQjhnshJj_00oYqrp3QfkP3aVc0j2kl4eS0&t=2025-01-14T23%3A26%3A32.260Z"
                    alt="Shacdn/UI"
                    width={100}
                    height={100}
                  />
                  <Label>shacdn/ui</Label>
                </li>
                <li>
                  <Image
                    src="https://rfdslcnqutnamgrgitxv.supabase.co/storage/v1/object/sign/profile%20resume/logo/magic-ui.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlIHJlc3VtZS9sb2dvL21hZ2ljLXVpLnBuZyIsImlhdCI6MTczNjg5NzM3MCwiZXhwIjoxNzY4NDMzMzcwfQ.9vZmQbQNBN5fKjqwU5KEC-7AO0yj2rml5GuCylLmqlg&t=2025-01-14T23%3A29%3A30.480Z"
                    alt="Magic UI"
                    width={280}
                    height={200}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
