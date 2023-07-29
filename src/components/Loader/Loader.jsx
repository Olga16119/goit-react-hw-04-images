import { RevolvingDot } from 'react-loader-spinner';

const Loader = () => {
  return (
    <RevolvingDot
      height="100"
      width="100"
      radius="6"
      color="#4fa94d"
      secondaryColor=""
      ariaLabel="revolving-dot-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
