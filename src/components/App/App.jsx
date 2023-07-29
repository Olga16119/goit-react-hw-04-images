import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import searchImages from 'api_pixabay/searchImages';
import Modal from '../Modal/Modal';
import css from './App.module.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    searchImagesData();
  }, [page, imageName]);

  async function searchImagesData() {
    if (!imageName) {
      return;
    }

    if (page === 1) {
      setLoadMore(false);
      setImages([]);
    }
    setIsLoading(true);

    const responce = await searchImages(imageName, page);
    const totalPage = Math.ceil(responce.totalHits / 12);

    if (!responce.hits.length) {
      setIsLoading(false);
      return alert(`Sorry, nothing was found for your request`);
    }
    if (page === 1 && responce.hits.length) {
      console.log(` ${responce.totalHits} image(s) have been found`);
    }
    if (page === totalPage) {
      console.log('All images for this request are already available');
      setLoadMore(false);
    }

    setImages([...images, ...responce.hits]);
    setIsLoading(false);
  }

  const onClickLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = modalValue => {
    setShowModal(!showModal);
    if (modalValue) {
      setModalValue(modalValue);
    } else {
      setModalValue({});
    }
  };

  const searchHandler = async imageName => {
    setImageName(imageName);
    setImages([]);
    setLoadMore(true);
    setPage(1);
  };

  return (
    <>
      <div className={css.App}>
        {showModal && (
          <Modal
            onClick={toggleModal}
            data={modalValue}
            onClose={toggleModal}
          />
        )}
        <Searchbar onSubmit={searchHandler} />

        {!images || images.length === 0 ? (
          <p>Start searching for images</p>
        ) : (
          <ImageGallery
            images={images}
            isloading={isLoading}
            onClick={toggleModal}
            loadMore={onClickLoadMore}
          />
        )}

        {isLoading && <Loader />}
        {loadMore && <Button onClick={onClickLoadMore} />}
      </div>
    </>
  );
};

export default App;
