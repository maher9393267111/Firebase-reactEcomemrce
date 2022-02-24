import React, { useState } from 'react'
import { storage, db } from '../firebase/firebase'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
const [url,setUrl] =useState('')
    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            console.log(selectedFile.name)
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        console.log(productImg)
        //1- first set the image that selected in product-images file im fireStorage
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);

// 2- show file upload progress

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);

   // 3- show error if there any error in code
        }, err => setError(err.message)
            , () => {

 // 4- if image upload successfully get this uploaded image url
 // 5- send form fields data to firestore in products collection and send image url to products

                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {

       // 6- after sending data to firestore make form fields empty                 
                        console.log(url)
                        setUrl(url)
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            {/* <img src={url} alt=""/> */}
        </div>
    )
}

export default AddProducts