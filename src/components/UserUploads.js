import React, { useEffect, useState } from 'react';
import ImageDisplay from './ImageDisplay'; 
import { useParams } from 'react-router-dom';

export default function UserUploads() {
  const [images, setImages] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4500/users/${username}/uploads`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setImages(data.images);
      })
      .catch(error => console.error("Error fetching images", error));
  }, [username]);
  

  return (
    <div>
      <ImageDisplay images={images} />
    </div>
  );
}
