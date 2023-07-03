import React, { useEffect, useState } from 'react';
import { MDBCardBody, MDBCard, MDBValidation, MDBBtn } from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {  updateTour } from '../Redux/Features/tourSlice';
import axios from 'axios';
import Header from '../Components/Header';
import '../App.css'
import { useParams } from 'react-router-dom';

const EditTour = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [file, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [tags, setTag] = useState([]);
    console.log(id, "uuuuuuuuuuu");
    const user = useSelector((state) => (state.auth.user))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Navigate to the home route
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            const updatedTour = { title, description, file, tags, videoUrl, name: user?.name, creator: user?.id };
            console.log(tags, "tags");
            console.log(updatedTour, "jjjjjjjjjj");

            axios.post(`http://localhost:5000/tour/editTour/${id}`, updatedTour, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response.data, "oooooooooo");
                    dispatch(updateTour(response.data));
                    toast.success("Tour updated Successfully!!");
                    navigate('/userDashboard');
                })
                .catch(()=> {
                    toast.error('Failed to update tour');
                });
            // handleClear()
        }
    };

    const handleAddTag = (tag) => {
        setTag([...tags, tag]);
    }

    const handleDeleteTag = (deleteTag) => {
        setTag(tags.filter((tag) => tag !== deleteTag));
    }

    const handleClear = () => {
        setTitle('');
        setDescription('');
        setTag([]);
        setVideoUrl('');
    };
    return (
        <>
            <Header />
            <div className='header-container'>
                <MDBCard alignment='center'>
                    <h5>Update Tour</h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                            <div className="col-md-12">
                                <input
                                    placeholder='Enter a title'
                                    type='text'
                                    value={title}
                                    name='title'
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='form-control'
                                    invalid
                                    validation='Please provide title'
                                />
                            </div>
                            <div className="col-md-12 description">
                                <textarea
                                    placeholder='Enter description'
                                    type='text'
                                    value={description}
                                    name='description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='form-control'
                                    invalid
                                    validation='Please provide some description'
                                />
                            </div>
                            <div className="col-md-12">
                                <ChipInput
                                    name='tags'
                                    variant='outlined'
                                    placeholder='Enter a tag'
                                    fullWidth
                                    value={tags}
                                    onAdd={(tag) => handleAddTag(tag)}
                                    onDelete={(tag) => handleDeleteTag(tag)}
                                />
                            </div>
                            <div className="col-md-12">
                                <input
                                    placeholder="Enter video URL"
                                    type="text"
                                    value={videoUrl}
                                    name="videoUrl"
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex justify-content-start">
                                <input type="file" name="file" onChange={(e) => setImage(e.target.files[0])} className='mt-4 mb-2' accept='image/*' />
                            </div>
                            <div className="col-12">
                                <MDBBtn className="add-button">Submit</MDBBtn>
                                <MDBBtn className='mt-2 add-button' color='danger' onClick={handleClear}>Clear</MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </>
    )
}

export default EditTour;
