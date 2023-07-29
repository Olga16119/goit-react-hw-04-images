async function searchImages(name, page) {
  const APIKEY = '37098068-44e27cfa1b1d9a8c1939cc69f';

  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching ', error);
  }
}

export default searchImages;
