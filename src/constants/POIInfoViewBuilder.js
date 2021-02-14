const hotelInfo = (infoObj) => {
  return (
    <>
      <div>Average Daily price: {infoObj.price}</div>
      <div>Rating: {infoObj.rating}</div>
    </>
  );
};

const getInfoBuilder = (poi_type) => {
  const types = {
    hotel: hotelInfo,
  };

  return types[poi_type];
};

export default getInfoBuilder;
