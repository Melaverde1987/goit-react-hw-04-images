import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ListGallery } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <ListGallery className="gallery">
      {items.map(item => (
        <li key={item.id}>
          <ImageGalleryItem
            className="gallery-item"
            webformatURL={item.webformatURL}
            tags={item.tags}
          ></ImageGalleryItem>
        </li>
      ))}
    </ListGallery>
  );
};
