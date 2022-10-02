import React, {useState, useEffect} from 'react';
import './style.css';

import { toast } from 'react-toastify';
import axios from 'axios';
import Resizer from "react-image-file-resizer";

const PlantId = () => {

    const [selectedImage, setSelectedImage] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [arr, setArr] = useState([])
    const [loader, setLoader] = useState(false);
    const [prob, setProb] = useState();

    const ref = React.useRef();

    useEffect(() => {
        console.log(arr.length)
      }, [arr]);
    
    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

    const onChange = async (event) => {
        try {
          const file = event.target.files[0];
          const image = await resizeFile(file);
          selectedImage.push(image)
          console.log(selectedImage.length);
          toast.success("Picture uploaded!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000
          });
        } catch (err) {
          toast.error("Something went wrong. Please, try again later!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000
          });
          console.log(err);
          
        }
      };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        ref.current.value = "";
        console.log('submitted')
        setLoader(!loader)

    const data = {
        api_key: process.env.REACT_APP_PLANTID_API,
        images: selectedImage,
        /* modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers */
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        /* plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details */
        plant_details: ["common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms",
            "probability"]
    };

    await axios.post('https://api.plant.id/v2/identify', data).then(res => {
        // const isPlant = res.data.is_plant;
        const isPlantProbability = res.data.is_plant_probability;
        setProb(isPlantProbability);
        const data = res.data?.suggestions;
        suggestions.push(data)
        setArr({suggestions : suggestions})
    }).catch(error => {
        console.error('Error: ', error)
    })
    }

    const handleReset = () => {
        setSelectedImage([]);
        setSuggestions([]);
        setArr([]);
        setLoader(false);
        }


    return (
        <section className="form--section">
        {`${arr.suggestions === undefined}` && 
            <div className='plantid-before'>
                <p className='plant-id--text'>Sometimes we remove labels of our newly adopted plants too soon. 
                    This may leave us wondering: what is even this thing I brought home? 
                    Here you can deal with such a misfortune.</p>
                <form onSubmit={onSubmit}>
                <div className="input-wrapper">
                    <label className='input-label' htmlFor="myImage">Upload a photo</label>
                    <input
                    type='file'
                    ref={ref}
                    className='input-image'
                    name='myImage'
                    onChange={onChange}
                    accept=".jpg, .jpeg, .png"
                    capture='environment'
                    required
                    />
                </div>
                    
                    <button className='submit-btn'>Submit</button>
                    </form>
            </div>}
                { arr.suggestions !== undefined
                ? 
                    <div>
                        <h3 className='suggestions--header'>There is a {prob} probability that it is indeed a plant in your picture.</h3>
                        <h3 className='suggestions--header'>Your plant may be one of the following:</h3>
                            <ul className='suggestions'> {arr.suggestions[0].map((item,i) => 
                            <li className='suggestions--item' key={i}>{`${item.plant_name} with ${item.probability} probability`}</li>)}
                            </ul>
                            <button onClick={handleReset} className='app--button' style={{color: "white"}}>
                                Reset
                            </button>
                            <small>This information is not saved further. Please, make a screenshot if needed.</small>
                    </div>
                : <span className={`material-symbols-outlined loading
                ${loader ? '' : 'invisible' }`}
                > rotate_right </span>}
        </section>

    )

}

export default PlantId;