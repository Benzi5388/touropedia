import React, {useState, useEffect} from 'react';
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter,MDBValidation,MDBIcon, MDBSpinner, MDBBtn} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../Components/Header';

const initialState = {
    password : "",
    resetPassword : ""
}
function ResetPassword() {
    const [formValue, setFormValue] = useState(initialState)
    const {loading, error} = useSelector((state) =>({...state.auth}))
    const {password, confirmPassword} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
       error && toast.error(error)
    }, [error]);

    const handleSubmit = async (e) =>{
       e.preventDefault()
       if(password && confirmPassword){
        try {
            const response = await axios.post('http://localhost:5000/users/resetPassword', { password, confirmPassword } );
            if (response.status === 200) {
              navigate('/login');
              toast.success("Password reset successfully!!")
            }
          } catch (error) {
            toast.error("error")
          }
       }
    }
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
      };

  return (
    <>
    <Header/>
    <div style={{
        margin : "auto", 
        padding : '15px',
        maxWidth : '450px', 
        alignContent :"center",
        marginTop :'120px'  }}
        >
        <MDBCard alignment='center'>
            <MDBIcon fas icon = "user-circle" className='fa-2x'></MDBIcon>
            <h5>Reset Password</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                <div className="col-md-12">
                    <MDBInput label ='password'
                     type = 'password' 
                     value={password} 
                     name='password'
                     onChange={onInputChange} 
                     required 
                     invalid 
                     validation="choose a password"/>
                   </div>
                   <div className="col-md-12">
                    <MDBInput label ='confirm password'
                     type = 'password' 
                     value={confirmPassword} 
                     name='confirmPassword'
                     onChange={onInputChange} 
                     required 
                     invalid 
                     validation="Please reconfirm your password"/>
                   </div>
                   <div className="col-12">
                    <MDBBtn style={{
                        width : "100%"}} className='mt-2'>
                            {loading && (
                                <MDBSpinner
                                size= 'sm'
                                role = 'status'
                                tag = 'span'
                                className = 'me-2'
                                />
                            )}
                            Submit
                    </MDBBtn>
                   </div>
                </MDBValidation> 
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/login">
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
    </>
  )
}

export default ResetPassword;