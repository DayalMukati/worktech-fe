import Image from "next/image";

const ServerDownPage: React.FC = () => {
  return (
    <>
      <div className="place-content-center grid bg-white px-4 h-screen">
        <div className="text-center">
          <Image
            src="/server-down.jpg"
            alt="server down"
            width={500}
            height={500}
            className="mx-auto w-auto h-56 sm:h-64 text-black"
          />

          <h1 className="mt-6 font-bold text-2xl text-gray-900 sm:text-4xl tracking-tight">
            Site Under Maintenance
          </h1>

          <p className="mt-4 text-gray-500">
            We sincerely apologize for the inconvenience. We are currently
            undergoing maintenance and upgrades. We will be back online shortly.
            Thank you for your patience.
          </p>
        </div>
      </div>
      ;
    </>
  );
};

export default ServerDownPage;
